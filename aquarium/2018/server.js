const answered = new Set();

// number of non-meta puzzles:
const N_FEEDERS = 8;
// meta gated behind these many puzzles:
const N_GATE = 8;

const ANSWERS = {
  1: "DIAGNOSE",
  2: "RETINA",
  3: "FRIENDSHIP",
  4: "STARBOARD",
  5: "GAMEFREAK",
  6: "KNIGHTOFTHEPERIODICTABLE",
  7: "SMASHING",
  8: "SERUM",
  META: "UNDERTHESTATACENTER",
};

const STORYLINE = {
  1: "Remove the last 5 letters",
  2: "Morph all x to h",
  3: "Switch the first and last letters",
  4: "Replace all double letters with er",
  5: "Switch the first and third letters",
  6: "Add n to the beginning and the end",
  7: "Replace all h (except the first one) with ta",
  8: "Remove all o",
};

const SPECIAL_MESSAGES = {
  6: {
    LANCELOT: "You're overthinking a bit. The answer could be long!",
  },
};

const STOCK_MESSAGES = {
  correct:
    "Thanks! With your answer {answer} we gained a superpower: {storyline}",
  incorrect:
    "Sorry, your answer {answer} for mission {puzzle_number} was incorrect. Please try again.",
  already_answered:
    "You've already completed mission {puzzle_number}.",
  final_puzzle:
    "Thanks! With your answer {answer} we gained a superpower: {storyline}. You have solved all 8 missions! Come to the front desk to receive the last mission to defeat the META!",
  meta_correct:
    "Congratulations, {answer} was correct! The Most Evil Tenured Academic has been defeated! The META is wearing a sombrero and is running around the aquarium... go find him!",
  meta_incorrect: "Sorry, {answer} was wrong. Please try again.",
  parse_error:
    "I'm sorry, we didn't understand '{text}'. Please text answers in the format [MISSION NO.] [SOLUTION], like '1 balloon'",
  problem_not_exists: "We don't have a mission {puzzle_number}...",
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
