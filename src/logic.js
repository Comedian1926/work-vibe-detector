import { DIMENSIONS, LEVELS, QUESTIONS } from "./data.js";
import { SHARE_URL } from "./constants.js";

const DIMENSION_KEYS = Object.keys(DIMENSIONS);
const MAX_POSSIBLE_SCORE = getMaxPossibleScore();

export function getDefaultAnswers() {
  return QUESTIONS.map((question) => question.options[2]);
}

export function calculateResult(answers = getDefaultAnswers()) {
  const fallbackAnswers = getDefaultAnswers();
  const normalizedAnswers = QUESTIONS.map((_, index) => answers[index] ?? fallbackAnswers[index]);
  const total = normalizedAnswers.reduce((sum, item) => sum + item.score, 0);
  const maxScore = MAX_POSSIBLE_SCORE;
  const percent = maxScore === 0 ? 0 : Math.max(0, Math.min(100, Math.round((total / maxScore) * 100)));
  const dims = Object.fromEntries(DIMENSION_KEYS.map((key) => [key, 0]));

  normalizedAnswers.forEach((item) => {
    Object.entries(item.dims).forEach(([key, value]) => {
      dims[key] += value;
    });
  });

  let topDimensionKey = DIMENSION_KEYS[0];
  for (const key of DIMENSION_KEYS) {
    if (dims[key] > dims[topDimensionKey]) {
      topDimensionKey = key;
    }
  }
  const identity = DIMENSIONS[topDimensionKey];
  const level = LEVELS.find((item) => percent >= item.min && percent <= item.max) || LEVELS[0];
  const tags = normalizedAnswers.map((item) => item.tag);
  const date = new Date();
  const datePart = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(
    date.getDate(),
  ).padStart(2, "0")}`;
  const cert = `BW-${datePart}-${String((total * 37 + topDimensionKey.length * 19) % 997).padStart(3, "0")}`;
  const symptoms = buildSymptoms(level, identity, tags);
  const prescription =
    percent >= 81 ? "今晚强制断网 30 分钟，任何“简单看下”都明天再审。" : identity.prescription;
  const dateText = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;
  const shareText = `我被鉴定为 ${percent}% ${level.name}，身份是“${identity.identity}”。你也来看看自己熟到几分：${SHARE_URL}`;

  return { percent, total, maxScore, dims, level, identity, symptoms, prescription, cert, dateText, shareText };
}

function buildSymptoms(level, identity, tags) {
  const uniqueTags = [...new Set(tags)].slice(-3).reverse();
  return [level.summary, identity.symptom, `本轮高频信号包括：${uniqueTags.join("、")}。`];
}

function getMaxPossibleScore() {
  return QUESTIONS.reduce((sum, question) => {
    const questionMaxScore = Math.max(...question.options.map((item) => item.score));
    return sum + questionMaxScore;
  }, 0);
}
