import { Button } from "@/components/ui/button";
import { ClipboardIcon, DownloadIcon, RotateCcwIcon } from "lucide-react";
import resultTemplate from "../../assets/result-template-empty.webp";
import RadarChart from "./RadarChart";
import ReportCard from "./ReportCard";

export default function ResultScreen({ onCopy, onRestart, onSave, result }) {
  return (
    <section className="screen result-screen">
      <div className="result-poster">
        <figure className="result-template" aria-hidden="true">
          <img alt="" decoding="async" fetchPriority="high" height="1677" src={resultTemplate} width="938" />
        </figure>

        <div className="result-radar-slot">
          <RadarChart result={result} />
        </div>

        <ReportCard result={result} />
      </div>

      <div className="result-actions">
        <Button className="result-action result-action-primary" onClick={onSave} variant="ghost">
          <DownloadIcon data-icon="inline-start" />
          保存报告图
        </Button>
        <Button className="result-action result-action-secondary" onClick={onCopy} variant="ghost">
          <ClipboardIcon data-icon="inline-start" />
          复制分享语
        </Button>
        <Button className="result-action result-action-secondary" onClick={onRestart} variant="ghost">
          <RotateCcwIcon data-icon="inline-start" />
          重新检测
        </Button>
      </div>
    </section>
  );
}
