const answered = new Set();

// number of non-meta puzzles:
const N_FEEDERS = 9;
// meta gated behind these many puzzles:
const N_GATE = 9;

const ANSWERS = {
  1: "THEORIZE",
  2: "RUNOFF",
  3: "ENVIES",
  4: "NEITHER",
  5: "THUNDERED",
  6: "CONSERVER",
  7: "EITHER",
  8: "NODE",
  9: "FORTIFY",
  META: "THEINFINITECORRIDOR",
};

const STORYLINE = {
  1: "You earned 0 points!",
  2: "You earned 4 points!",
  3: "You earned 7 points!",
  4: "You earned 3 points!",
  5: "You earned 100 points!",
  6: "You earned 7 points!",
  7: "You earned 3 points!",
  8: "You earned 1 point!",
  9: "You earned 50 points!",
};

const SPECIAL_MESSAGES = {
  1: {
    FISH:
      "Nice try, but FISH is not the correct answer. Try solving the puzzle.",
  },
};

const STOCK_MESSAGES = {
  correct:
    "With your solution {answer} you've solved Question {puzzle_number}: {storyline}",
  incorrect:
    "Sorry, your answer {answer} for Question {puzzle_number} was incorrect.\nPlease try again (you can also ask the staff for hints)",
  already_answered:
    "You've already solved Question {puzzle_number}: {storyline}",
  final_puzzle:
    "With your solution {answer}, you've solved Question {puzzle_number}: {storyline} Congrats on solving all the categories! Head to front desk to receive the Final Jeopardy question now!",
  meta_correct:
    "Well done! With your answer {answer} you've answered the Final Jeopardy question: Which hallway at MIT have students in Civil Engineering studied as a model of highway traffic? This concludes the puzzlehunt, congrats!",
  meta_incorrect: "Sorry, {answer} was wrong. Please try again.",
  parse_error:
    "I'm sorry, we didn't understand '{text}'. Please text answers in the format [QUESTION NO.] [SOLUTION], like '1 fish'. You can also ask the teachers for hints!",
  problem_not_exists: "There is no Question No. {puzzle_number}...",
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
