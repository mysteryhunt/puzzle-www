const answered = new Set();

// number of non-meta puzzles:
const N_FEEDERS = 4;
// meta gated behind these many puzzles:
const N_GATE = 4;

const ANSWERS = {
  1: "ISOLEUCINE",
  2: "ISOLEMNLYSWEARTHATIAMUPTONOGOOD",
  3: "SOLENOID",
  4: "CONSOLE",
  META: "APIECEOFCAKE",
};

const STORYLINE = {};

const SPECIAL_MESSAGES = {
  
};

const STOCK_MESSAGES = {
  correct:
    "Your answer of {answer} for puzzle {puzzle_number} is Correct!{storyline}",
  incorrect:
    "Sorry, your answer {answer} for puzzle {puzzle_number} was incorrect. Please try again.",
  already_answered:
    "You've already completed puzzle {puzzle_number}, go find another one!",
  final_puzzle:
    "<div>Your answer of {answer} is Correct!{storyline} \
You have solved {num_solved}/{num_puzzles} puzzles! \
Click <a href='https://puzzles.mit.edu/cpw/sole/sole_puzzle_META.pdf'>here</a> \
for the final metapuzzle! \
You can also enter METAPUZZLE to get this link at any time.</div>",
  meta_correct:
    "Congratulations, {answer} was correct and you have finished the hunt!",
  meta_incorrect: "Sorry, {answer} was wrong. Please try again.",
  meta_link_unlocked: "<div>Click <a href='https://puzzles.mit.edu/cpw/sole/sole_puzzle_META.pdf'>here</a> \
for the final metapuzzle!</div>",
  meta_link_locked: "Sorry, you haven't unlocked the meta yet!",
  parse_error:
    "I'm sorry, we didn't understand '{text}'. Please text answers in the format [PUZZLE NO.] [SOLUTION], like '1 balloon'",
  problem_not_exists: "We don't have a puzzle {puzzle_number}...",
};

const normalize = (s) =>
  s
    .trim()
    .toUpperCase()
    .replaceAll(/[^A-Z0-9]/g, "");

const template = (template, dict) => {
  let result = template;
  for (const [key, value] of Object.entries(dict)) {
    result = result.replace(`{${key}}`, value);
  }
  return result;
};

window.getReply = (message) => {
  const [puzzle, ...tail] = message.trim().split(" ").map(normalize);
  if (puzzle === "METAPUZZLE") {
    if (answered.size >= N_GATE) {
      return template(STOCK_MESSAGES.meta_link_unlocked, {});
    } else {
      return template(STOCK_MESSAGES.meta_link_locked, {});
    }
  }
  const answer = tail.join("");
  if (!puzzle || !answer) {
    return template(STOCK_MESSAGES.parse_error, { text: message });
  }
  if (ANSWERS[puzzle] === undefined) {
    return template(STOCK_MESSAGES.problem_not_exists, {
      puzzle_number: puzzle,
    });
  }
  if (puzzle === "META") {
    if (answer === normalize(ANSWERS.META)) {
      return template(STOCK_MESSAGES.meta_correct, { answer });
    } else {
      return template(STOCK_MESSAGES.meta_incorrect, { answer });
    }
  }
  if (answered.has(puzzle)) {
    return template(STOCK_MESSAGES.already_answered, { puzzle_number: puzzle });
  }
  const storyline = STORYLINE[puzzle] ?? "";
  if (answer === normalize(ANSWERS[puzzle])) {
    answered.add(puzzle);
    const num_solved = answered.size;
    if (num_solved >= N_GATE) {
      return template(STOCK_MESSAGES.final_puzzle, {
        answer,
        num_puzzles: N_FEEDERS,
        num_solved,
        storyline,
      });
    } else {
      return template(STOCK_MESSAGES.correct, {
        answer,
        puzzle_number: puzzle,
        storyline,
      });
    }
  }
  if (SPECIAL_MESSAGES[puzzle]?.[answer] !== undefined) {
    return SPECIAL_MESSAGES[puzzle][answer];
  }
  return template(STOCK_MESSAGES.incorrect, { answer, puzzle_number: puzzle });
};
