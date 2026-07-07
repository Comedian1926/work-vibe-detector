import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { LogOutIcon } from "lucide-react";
import { QUESTIONS } from "../data";

export default function QuizScreen({ answers, current, feedback, locked, onAnswer, onRestart }) {
  const question = QUESTIONS[current];
  const progress = (current / QUESTIONS.length) * 100;
  const selectedKey = answers[current]?.key;

  return (
    <section className="screen quiz-screen">
      <div className="quiz-layout">
        <Card className="quiz-header">
          <div className="quiz-header-main">
            <span className="brand-mark">
              <span className="brand-dot" />
              班味质检中心
            </span>
            <Button aria-label="退出检测" className="quiz-exit-button" onClick={onRestart} size="sm" variant="outline">
              <LogOutIcon data-icon="inline-start" />
              退出
            </Button>
          </div>
          <CardContent className="detector-hud-body">
            <div className="hud-top">
              <span>QUESTION {current + 1}/{QUESTIONS.length}</span>
              <b>{Math.round(progress)}%</b>
              <div className="status-lights" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
            </div>
            <Progress className="quiz-progress" value={progress} />
          </CardContent>
        </Card>

        <Card className="question-card">
          <CardHeader className="question-card-header">
            <Badge className="question-meta" variant="outline">
              {question.type}
            </Badge>
            <CardTitle className="question-title">{question.title}</CardTitle>
          </CardHeader>
          <CardContent className="question-card-body">
            <figure className="question-scene">
              <img
                alt={`${question.type}场景图`}
                decoding="async"
                fetchPriority="high"
                height="941"
                loading="eager"
                src={question.sceneImage}
                width="1672"
              />
            </figure>
            <RadioGroup className="options" key={current} onValueChange={onAnswer} value={selectedKey ?? ""}>
              {question.options.map((item) => {
                const id = `question-${current}-${item.key}`;
                return (
                  <Label className="option-row" data-selected={selectedKey === item.key} htmlFor={id} key={item.key}>
                    <span className="option-key">{item.key}</span>
                    <RadioGroupItem disabled={locked} id={id} value={item.key} />
                    <span className="option-text">{item.text}</span>
                  </Label>
                );
              })}
            </RadioGroup>
          </CardContent>
        </Card>

        <Badge className="feedback-tag" variant="outline">
          {feedback}
        </Badge>
      </div>
    </section>
  );
}
