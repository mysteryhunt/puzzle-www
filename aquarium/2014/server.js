const answered = new Set();

// number of non-meta puzzles:
const N_FEEDERS = 9;
// meta gated behind these many puzzles:
const N_GATE = 9;

const ANSWERS = {
  1: "SEAM",
  2: "1984",
  3: "AMBIANCE",
  4: "CLINIC",
  5: "SUMMERDAY",
  6: "ELEVATORS",
  7: "VASES",
  8: "PAYDAY",
  9: "BEAVER",
  META: "HARMONIZING",
};

const STORYLINE = {
  1: "By the way, R1=13",
  2: "By the way, R2=19",
  3: "By the way, R3=25",
  4: "By the way, W1=38",
  5: "By the way, W2=8",
  6: "By the way, W3=18",
  7: "By the way, B1=26",
  8: "By the way, B2=0",
  9: "",
};

const SPECIAL_MESSAGES = {
  4: {
    HEALTHKIOSK:
      "Sorry, HEALTH KIOSK is on the right track but not the final answer. Look at the puzzle again.",
  },
  1: {
    DIAGONAL:
      "DIAGONAL is right, but not the final answer. Look at the puzzle again.",
  },
  9: {
    MITMASCOT: "MITMASCOT is not the final answer. Keep thinking.",
    "MIT MASCOT": "MIT MASCOT is not the final answer. Keep thinking.",
    TIM: "TIM is the MIT mascot, but what kind of animal is he?",
  },
  7: {
    ALKALI: "ALKALI is not the final answer. Look at the puzzle again.",
    NOBLEGASES: "NOBLEGASES is a clue. Look at the puzzle again.",
  },
};

const STOCK_MESSAGES = {
  correct:
    "Thanks! With your answer {answer} you have bottled the essence of island no. {puzzle_number}! {storyline}",
  incorrect:
    "Sorry, your answer {answer} for island no. {puzzle_number} was incorrect. Please try again.",
  already_answered:
    "You've already bottled the essence of island no. {puzzle_number}",
  final_puzzle:
    "Hi, it's the IHTFP radio tower contacting island no. {puzzle_number}. {answer} was correct. The last hint is B3=26, and congratulations on completing all of the islands!",
  meta_correct:
    "Congratulations, {answer} was correct! Quickly, chase down the lead sherpa with the hat to tell them of your success.",
  meta_incorrect: "Sorry, {answer} was wrong. Please try again.",
  parse_error:
    "I'm sorry, we didn't understand '{text}'. Please text answers in the format [ISLAND NO.] [SOLUTION], like '1 wombat'",
  problem_not_exists: "There is no island no. {puzzle_number}...",
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
