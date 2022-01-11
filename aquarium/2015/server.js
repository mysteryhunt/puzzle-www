const answered = new Set();

// number of non-meta puzzles:
const N_FEEDERS = 9;
// meta gated behind these many puzzles:
const N_GATE = 9;

const ANSWERS = {
  1: "BELIEF",
  2: "TOTEMS",
  3: "AIRBORNE",
  4: "ORACLE",
  5: "CONSCIOUS",
  6: "SIMPLEIDEA",
  7: "TAU",
  8: "SOLITARY",
  9: "REALITY",
  META: "COLLAPSINGDREAMS",
};

const STORYLINE = {
  1: "Belief deserves to be rewarded, your team needs a dreamy THINKER",
  2: "Let your dreams MEANDER toward a sea of memories",
  3: "Alas, your totem got SMASHED - how will you tell dream from reality?",
  4: "Who knew tea BREWERS could be such cryptic oracles?",
  5: "Your subconscious ADMIRES emotion over reason",
  6: "A simple idea sticks, like a resilient parasite EGESTED into the brain",
  7: "Don't think about UNICORN's. What are you thinking about?",
  8: "Your dreams are the solitary children of an UNSOUND mind",
  9: "IMPLANT an idea deep enough, and this dream will become your reality",
};

const SPECIAL_MESSAGES = {
  1: {
    WRONGANSWER:
      "WRONGANSWER is close, but not the final answer. Look at the puzzle again.",
    INCEPTION: "Nice try, but that's not the correct answer.",
  },
  7: {
    628: "Doh! And what is the symbol for 6.28?",
  },
};

const STOCK_MESSAGES = {
  correct:
    "With your answer {answer} you have discovered the secret clue hidden in Dream Level {puzzle_number}: \"{storyline}\"",
  incorrect:
    "Sorry, your answer {answer} for Dream Level {puzzle_number} was incorrect.\nPlease try again (you can also ask us for hints).",
  already_answered:
    "You've already discovered the secrets of Dream Level {puzzle_number}: \"{storyline}\"",
  final_puzzle:
    "With your answer {answer}, you've discovered the final clue hidden in Dream Level {puzzle_number}: \"{storyline}\"\nCongrats on completing all the dream levels, {team_name}!\nPlease send ONE brave team member to unlock a final secret!",
  meta_correct:
    "Congratulations {team_name}, you've discovered the secret idea: {answer}. This concludes the puzzle hunt!",
  meta_incorrect: "Sorry, {answer} was wrong. Please try again.",
  parse_error:
    "I'm sorry, we didn't understand '{text}'. Please text answers in the format [DREAM LEVEL] [SOLUTION], like '1 inception'. If you need more help, venture down to Front Desk or find a Dream Architect wearing a top hat.",
  problem_not_exists: "There is no Dream Level {puzzle_number}...",
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
