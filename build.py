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
                output.append('  <script type="module" src="main.js"></script>\n')
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
        front_matter = 0
        for line in file:
            stripped = line.strip()
            if front_matter == 2:
                contents.append(line)
            elif front_matter < 2 and stripped.startswith("title:"):
                title = stripped.split(":")[1].strip()
            elif stripped == "---":
                front_matter += 1
            else:
                print(f"line ignored: {line}")
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
            elif stripped == "<!--CONTENT-->":
                output.append(content["hunt"])
                output.append(content["club"])
            elif stripped == "<!--SCRIPTS-->":
                output.append('  <script type="module" src="FrontPage.js"></script>\n')
            else:
                output.append(line)
    with open("index.html", "w", encoding="utf-8") as file:
        file.write("".join(output))


def build_files(watch):
    """
    Builds all files, building only updated files if watch = True.
    """
    for source in glob.iglob("src/*.md}"):
        base = os.path.basename(source).split(".")[0]
        # special handling, deal with later:
        if base in ("index_hunt", "index_club"):
            continue
        dest = f"{base}.html"
        if (
            watch
            and os.path.exists(dest)
            and os.path.getmtime(source) < os.path.getmtime(dest)
        ):
            continue
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
