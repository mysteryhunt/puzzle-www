const answered = new Set();

// number of non-meta puzzles:
const N_FEEDERS = 6;
// meta gated behind these many puzzles:
const N_GATE = 6;

// This year, the puzzles weren't canonically ordered. 

const ANSWERS = {
  BASKER: "ALLSIZES",
  TEDD: "UPCLOSE",
  TROUTLEY: "BACKYARD",
  BLANDING: "SUCCESS",
  DARTINGS: "ADAPTATIONS",
  BOTTOM: "AFRICAN",
  META: "ASCHOOLOFYOURPIERS",
};

const STORYLINE = {};

const SPECIAL_MESSAGES = {
  
};

const STOCK_MESSAGES = {
  correct:
    "Your answer of {answer} for Dr.{puzzle_number} is Correct!{storyline}",
  incorrect:
    "Sorry, your answer {answer} for Dr.{puzzle_number} was incorrect. Please try again.",
  already_answered:
    "You've already helped Dr.{puzzle_number}, go find another one!",
  final_puzzle:
    "Your answer of {answer} is Correct!{storyline} You have solved {num_solved}/{num_puzzles} puzzles! Come to the front desk to receive the meta puzzle! To submit the meta, text 'meta' and then the answer",
  meta_correct:
    "Congratulations, {answer} was correct! Go see the Diving Supervisors at the front desk!",
  meta_incorrect: "Sorry, {answer} was wrong. Please try again.",
  parse_error:
    "I'm sorry, we didn't understand '{text}'. Please text answers in the format [PUZZLE NO.] [SOLUTION], like '1 balloon'",
  problem_not_exists: "We don't know a Dr.{puzzle_number}...",
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
