const answered = new Set();

// number of non-meta puzzles:
const N_FEEDERS = 8;
// meta gated behind these many puzzles:
const N_GATE = 8;

const ANSWERS = {
  1: "DCCOMICS",
  2: "MUSTERED",
  3: "PRETTIER",
  4: "HEADACHE",
  5: "DECANTER",
  6: "RANCHERO",
  7: "CANISTER",
  8: "CAVALIER",
  META: "FLATLAND",
};

const LINEAR_STORYLINE = {
  1: "Apparently someone in customer support taped DIABOLIC to their back.",
  2: "What were MENORAHS doing there? Remind me to ask Peter about them...",
  3: "Looks like someone pretty knowledgeable messed with the DEFAULTS on the piffy.",
  4: "Turns out this customer has the same favorite brand of HYDRANTS as you!.",
  5: "The customer must have been from the company, they mentioned the UPDRAFTS in the support offices.",
  6: "GRAVITON. Remember that one time you became obsessed over them for a week and ...",
  7: "The customer was a TELEPATH or something, mentioned and thanked you by name!"
};

const SPECIAL_MESSAGES = {
  1: {
    DC: "Close! The answer has two words.",
  },
  2: {
    MUSTARD: "Close! Take a closer look.",
  },
  4: {
    NINTENDO: "Close! Take a closer look.",
  },
};

const STOCK_MESSAGES = {
  correct:
    "Your answer of {answer} for puzzle {puzzle_number} is correct! {storyline}.",
  incorrect:
    "Sorry, your answer {answer} for puzzle {puzzle_number} was incorrect. Please try again.",
  already_answered:
    "You've already completed puzzle {puzzle_number}, go find another one!",
  final_puzzle:
    "Your answer of {answer} is correct! {storyline}. Come to the front desk to receive the meta puzzle! To submit the meta, text 'meta' and then the answer",
  meta_correct:
    "Congratulations, {answer} was correct! Go see the front desk!",
  meta_incorrect: "Sorry, {answer} was wrong. Please try again.",
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
  if (answer === normalize(ANSWERS[puzzle])) {
    answered.add(puzzle);
    const storyline = LINEAR_STORYLINE[answered.size] ?? "";
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
