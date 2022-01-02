"""
Script for building the MIT Mystery Hunt / Puzzle Club website.

Usage: In the directory of the script, run `python3 build.py` to build all
files. Run `python3 build.py watch` to continuously build only the files that
are changed.
"""

import glob
import os
import subprocess
import sys
import time

import markdown


def format_content(title, content):
    """
    Format the page with given title and markdown content.
    """
    main = markdown.markdown(content)
    output = []
    with open("src/template.html", "r", encoding="utf-8") as file:
        for line in file:
            stripped = line.strip()
            if stripped == "<!--TITLE-->":
                output.append(
                    f"    <title>{title} · MIT Mystery Hunt / Puzzle Club</title>\n"
                )
            elif stripped == "<!--CONTENT-->":
                output.append(main)
            elif stripped == "<!--SCRIPTS-->":
                output.append('  <script type="module" src="/main.js"></script>\n')
            else:
                output.append(line)
    return "".join(output)


def build_file(source, dest):
    """
    Builds the file with given source and dest path.
    """
    title = ""
    contents = []
    with open(source, "r", encoding="utf-8") as file:
        for line in file:
            stripped = line.strip()
            if stripped.startswith("# "):
                if title:
                    print(f"file has two titles: {source}")
                title = stripped.split("#")[1].strip()
            contents.append(line)
    if not title:
        print(f"file has no title: {source}")
        return
    with open(dest, "w", encoding="utf-8") as file:
        file.write(format_content(title, "".join(contents)))


def build_index(watch):
    """
    Build the index page, building only if updated if watch = True.
    """
    if (
        watch
        and os.path.exists("index.html")
        and os.path.getmtime("src/index_hunt.md") < os.path.getmtime("index.html")
        and os.path.getmtime("src/index_club.md") < os.path.getmtime("index.html")
    ):
        return
    content = {}
    for suffix in ("hunt", "club"):
        with open(f"src/index_{suffix}.md", "r", encoding="utf-8") as file:
            content[suffix] = "\n".join(
                [f'<div id="{suffix}">', markdown.markdown(file.read()), "</div>\n"]
            )
    output = []
    with open("src/template.html", "r", encoding="utf-8") as file:
        for line in file:
            stripped = line.strip()
            if stripped == "<!--TITLE-->":
                output.append("    <title>MIT Mystery Hunt / Puzzle Club</title>\n")
            elif stripped == "</head>":
                # inject styles
                output.append("  <style>\n")
                output.append("  #header { min-height: 28rem; }\n")
                output.append("  </style>\n")
                output.append(line)
            elif stripped == "<!--CONTENT-->":
                output.append(content["hunt"])
                output.append(content["club"])
            elif stripped == "<!--SCRIPTS-->":
                output.append('  <script type="module" src="/FrontPage.js"></script>\n')
            else:
                output.append(line)
    with open("index.html", "w", encoding="utf-8") as file:
        file.write("".join(output))


def build_files(watch):
    """
    Builds all files, building only updated files if watch = True.
    """
    for source in glob.iglob("src/**/*.md", recursive=True):
        dirname, basename = os.path.split(source)
        base, _ = os.path.splitext(basename)
        # special handling, deal with later:
        if base in ("index_hunt", "index_club"):
            continue
        srcdir = os.path.join(os.curdir, "src")
        destdir = os.path.relpath(dirname, start=srcdir)
        dest = os.path.join(destdir, f"{base}.html")
        if (
            watch
            and os.path.exists(dest)
            and os.path.getmtime(source) < os.path.getmtime(dest)
        ):
            continue
        if not os.path.exists(os.path.dirname(dest)):
            os.makedirs(os.path.dirname(dest), exist_ok=True)
        build_file(source, dest)
    build_index(watch)


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "watch":
        # runs the server
        subprocess.Popen("python3 -m http.server", shell=True)
        # continuously build every second
        while True:
            build_files(True)
            time.sleep(1)
    else:
        build_files(False)
