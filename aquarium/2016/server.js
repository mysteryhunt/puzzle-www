const answered = new Set();

// number of non-meta puzzles:
const N_FEEDERS = 10;
// meta gated behind these many puzzles:
const N_GATE = 10;

const ANSWERS = {
  1: "LIVING",
  2: "FACTORY",
  3: "COMPOUND",
  4: "SAFETY",
  5: "ITEM",
  6: "TRUCK",
  7: "COOP",
  8: "PRESSURE",
  9: "WATER",
  10: "DRINK",
  META: "FIREHOSE",
};

const STORYLINE = {
  1: "The EECS major is teaching her pet Beaver how to code. The answer is NO.",
  2:
    "Rosalind is a Biology major - she's already made some groundbreaking discoveries. The answer is YES.",
  3: "Did you know that Marie owns a pet Turtle? The answer is YES.",
  4:
    "The McCormick resident spends a lot of time crunching code in Stata. The answer is YES.",
  5:
    "The Chemistry major enjoys the quietude of Barker Library. The answer is NO.",
  6: "The MacGregor resident owns a Manatee. The answer is YES.",
  7:
    "Albert was found admiring the view atop the Green Building. The answer is NO.",
  8:
    "Ask the New House resident 8.01 pset help - he studies Physics. The answer is YES.",
  9:
    "Ivan lives in Next House - he really enjoys all those long walks. The answer is YES.",
  10: "The answer is MAYBE ;D",
};

const SPECIAL_MESSAGES = {
  1: {
    WRONGANSWER:
      "WRONGANSWER is close, but not the final answer. Look at the puzzle again.",
    SHERLOCK: "Nice try, but SHERLOCK is not the correct answer.",
  },
  8: {
    PHYSICISTS:
      "You've got the right letter.. but PHYSICISTS is not the correct answer.",
    P:
      "Good progress.. but P is not the final answer. Remember, all solutions are English words.",
  },
  9: {
    PQRST:
      "Good progress.. but PQRST is not the correct answer. Hint: we're looking for a chemical compound.",
    HIJKLMNO:
      "Good progress.. but HIJKLMNO is not the final answer. As the title indicates, we're looking for a chemical compound name.",
    H2O: ".. and what is the common name for H2O??",
  },
};

const STOCK_MESSAGES = {
  correct:
    "With your solution {answer} you've solved Mystery Case No. {puzzle_number}: {storyline}",
  incorrect:
    "Sorry, your answer {answer} for Mystery Case No. {puzzle_number} was incorrect.\nPlease try again (you can also ask the teachers for hints)",
  already_answered:
    "You've already solved Mystery Case No. {puzzle_number}: {storyline}",
  final_puzzle:
    "With your solution {answer}, you've solved Mystery Case No. {puzzle_number}: {storyline} Congrats on solving all the mystery cases! You should be ready to take on the META mystery now!",
  meta_correct:
    "Well done! With your answer {answer} you've solved the final META mystery! This concludes the puzzlehunt, congrats!",
  meta_incorrect: "Sorry, {answer} is incorrect. Please try again.",
  parse_error:
    "Sorry, we didn't understand '{text}'. Please text answers in the format [MYSTERY CASE NO] [SOLUTION], like '1 sherlock'. You can also ask the teachers for hints!",
  problem_not_exists: "There is no Mystery Case No. {puzzle_number}...",
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
