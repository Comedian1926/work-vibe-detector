import assert from "node:assert/strict";
import test from "node:test";
import { QUESTIONS } from "../src/data.js";
import { calculateResult, getDefaultAnswers } from "../src/logic.js";

test("getDefaultAnswers returns one fallback answer per question", () => {
  const defaults = getDefaultAnswers();

  assert.equal(defaults.length, QUESTIONS.length);
  assert.deepEqual(
    defaults.map((answer) => answer.key),
    QUESTIONS.map((question) => question.options[2].key),
  );
});

test("calculateResult fills missing answers with defaults", () => {
  const fromEmpty = calculateResult([]);
  const fromDefaults = calculateResult(getDefaultAnswers());

  assert.equal(fromEmpty.percent, fromDefaults.percent);
  assert.equal(fromEmpty.total, fromDefaults.total);
  assert.deepEqual(fromEmpty.dims, fromDefaults.dims);
});

test("calculateResult returns the expected default score band", () => {
  const result = calculateResult(getDefaultAnswers());

  assert.equal(result.total, 108);
  assert.equal(result.maxScore, 145);
  assert.equal(result.percent, 74);
  assert.equal(result.level.name, "飞书包浆体");
  assert.match(result.cert, /^BW-\d{8}-\d{3}$/);
});

test("calculateResult caps the maximum answer path at 100 percent", () => {
  const maxAnswers = QUESTIONS.map((question) =>
    question.options.reduce((best, answer) => (answer.score > best.score ? answer : best), question.options[0]),
  );
  const result = calculateResult(maxAnswers);

  assert.equal(result.total, result.maxScore);
  assert.equal(result.percent, 100);
  assert.equal(result.level.name, "绩效季黑化体");
});
