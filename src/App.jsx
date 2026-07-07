import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { QUESTIONS } from "./data";
import { calculateResult, getDefaultAnswers } from "./logic";
import HomeScreen from "./components/HomeScreen";
import QuizScreen from "./components/QuizScreen";

const ResultScreen = lazy(() => import("./components/ResultScreen"));
const ScanScreen = lazy(() => import("./components/ScanScreen"));

const IDLE_FEEDBACK = "检测仪待命：请选择最像你的反应。";

function getInitialScreen() {
  return new URLSearchParams(window.location.search).get("demo") === "1" ? "result" : "home";
}

function getInitialAnswers(screen) {
  return screen === "result" ? getDefaultAnswers() : [];
}

async function writeShareText(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall through to the selection-based copy path for browsers that block Clipboard API.
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  textarea.style.top = "0";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);

  try {
    return document.execCommand("copy");
  } finally {
    document.body.removeChild(textarea);
  }
}

export default function App() {
  const initialScreen = getInitialScreen();
  const [screen, setScreen] = useState(initialScreen);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(() => getInitialAnswers(initialScreen));
  const [locked, setLocked] = useState(false);
  const [feedback, setFeedback] = useState(IDLE_FEEDBACK);
  const answerTimer = useRef(null);

  const result = useMemo(() => calculateResult(answers), [answers]);

  const clearAnswerTimer = useCallback(() => {
    if (answerTimer.current) {
      window.clearTimeout(answerTimer.current);
      answerTimer.current = null;
    }
  }, []);

  useEffect(() => clearAnswerTimer, [clearAnswerTimer]);

  const resetQuizState = useCallback(() => {
    clearAnswerTimer();
    setCurrent(0);
    setAnswers([]);
    setLocked(false);
    setFeedback(IDLE_FEEDBACK);
  }, [clearAnswerTimer]);

  const startQuiz = useCallback(() => {
    resetQuizState();
    setScreen("quiz");
  }, [resetQuizState]);

  const restart = useCallback(() => {
    resetQuizState();
    setScreen("home");
  }, [resetQuizState]);

  const demoResult = useCallback(() => {
    clearAnswerTimer();
    setAnswers(getDefaultAnswers());
    setCurrent(0);
    setLocked(false);
    setFeedback(IDLE_FEEDBACK);
    setScreen("result");
  }, [clearAnswerTimer]);

  const preloadResultScreen = useCallback(() => {
    void import("./components/ResultScreen");
  }, []);

  const showResult = useCallback(() => {
    setScreen("result");
  }, []);

  const chooseAnswer = useCallback(
    (key) => {
      if (locked) return;
      const selected = QUESTIONS[current].options.find((item) => item.key === key);
      if (!selected) return;

      clearAnswerTimer();
      setLocked(true);
      setAnswers((prev) => {
        const next = [...prev];
        next[current] = selected;
        return next;
      });
      setFeedback(`检测到：${selected.tag}`);

      answerTimer.current = window.setTimeout(() => {
        setLocked(false);
        setFeedback(IDLE_FEEDBACK);
        if (current + 1 >= QUESTIONS.length) {
          setScreen("scan");
        } else {
          setCurrent((value) => value + 1);
        }
      }, 680);
    },
    [clearAnswerTimer, current, locked],
  );

  const copyShareText = useCallback(async () => {
    if (await writeShareText(result.shareText)) {
      toast.success("分享语已复制");
    } else {
      toast(result.shareText);
    }
  }, [result.shareText]);

  const handleSaveReport = useCallback(async (target) => {
    try {
      const { saveReportImage } = await import("./reportImage");
      await saveReportImage(target, `work-vibe-report-${result.percent}.png`);
      toast.success("报告图片已生成");
    } catch {
      toast.error("保存失败，请稍后再试");
    }
  }, [result]);

  const appClassName = [
    "app-shell",
    screen === "home" ? "image-home-active" : "",
    screen === "quiz" ? "quiz-active" : "",
    screen === "result" ? "result-active" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <main id="app" className={appClassName} aria-live="polite">
        <Suspense fallback={<div className="screen-loading">加载中...</div>}>
          {screen === "home" && (
            <HomeScreen onDemo={demoResult} onDemoIntent={preloadResultScreen} onStart={startQuiz} />
          )}
          {screen === "quiz" && (
            <QuizScreen
              answers={answers}
              current={current}
              feedback={feedback}
              locked={locked}
              onAnswer={chooseAnswer}
              onRestart={restart}
            />
          )}
          {screen === "scan" && <ScanScreen answers={answers} onComplete={showResult} />}
          {screen === "result" && (
            <ResultScreen result={result} onCopy={copyShareText} onRestart={restart} onSave={handleSaveReport} />
          )}
        </Suspense>
      </main>
      <Toaster position="bottom-center" />
    </>
  );
}
