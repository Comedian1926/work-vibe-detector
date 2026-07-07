import { BadgeCheckIcon, BrainCircuitIcon, ClipboardPlusIcon, RadioTowerIcon } from "lucide-react";

const REPORT_SECTIONS = [
  {
    key: "identity",
    title: "身份",
    Icon: BadgeCheckIcon,
    getBody: (result) => result.identity.identity,
  },
  {
    key: "symptom",
    title: "症状描述",
    Icon: BrainCircuitIcon,
    getBody: (result) => result.symptoms[0],
  },
  {
    key: "signal",
    title: "高频信号",
    Icon: RadioTowerIcon,
    getBody: (result) => result.symptoms[2]?.replace("本轮高频信号包括：", "") ?? "",
  },
  {
    key: "prescription",
    title: "今日处方",
    Icon: ClipboardPlusIcon,
    getBody: (result) => result.prescription,
  },
];

export default function ReportCard({ result }) {
  return (
    <article className="report-panel" aria-labelledby="report-title">
      <header className="report-panel-header">
        <div>
          <p className="report-kicker">WORK VIBE INSPECTION</p>
          <h1 id="report-title">班味鉴定报告</h1>
        </div>
        <span className="report-stamp">{result.level.stamp}</span>
      </header>

      <section className="report-score-row" aria-label="检测结果">
        <strong>{result.percent}%</strong>
        <div className="report-level-badge">
          <span>评级</span>
          <b>{result.level.name}</b>
        </div>
      </section>

      <ol className="report-items">
        {REPORT_SECTIONS.map((section) => (
          <li className="report-item" key={section.key}>
            <span className="report-icon" aria-hidden="true">
              <section.Icon />
            </span>
            <div className="report-copy">
              <h2>{section.title}</h2>
              <p>{section.getBody(result)}</p>
            </div>
          </li>
        ))}
      </ol>

      <footer className="report-meta">
        <span>证书编号：{result.cert}</span>
        <span>检测时间：{result.dateText}</span>
      </footer>
    </article>
  );
}
