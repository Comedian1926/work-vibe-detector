import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ClipboardIcon, DownloadIcon, RotateCcwIcon } from "lucide-react";
import QRCode from "qrcode";
import resultTemplate from "../../assets/result-template-empty.webp";
import { SHARE_URL } from "../constants";
import RadarChart from "./RadarChart";
import ReportCard from "./ReportCard";

export default function ResultScreen({ onCopy, onRestart, onSave, result }) {
  const posterRef = useRef(null);
  const [qrSrc, setQrSrc] = useState("");

  useEffect(() => {
    let active = true;

    QRCode.toDataURL(SHARE_URL, {
      color: {
        dark: "#07130d",
        light: "#ffffff",
      },
      errorCorrectionLevel: "M",
      margin: 1,
      width: 192,
    }).then((url) => {
      if (active) setQrSrc(url);
    });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="screen result-screen">
      <div className="result-poster" ref={posterRef}>
        <figure className="result-template" aria-hidden="true">
          <img alt="" decoding="async" fetchPriority="high" height="1677" src={resultTemplate} width="938" />
        </figure>

        <div className="result-radar-slot">
          <RadarChart result={result} />
        </div>

        <div className="result-qr-badge">
          {qrSrc ? <img alt="扫码打开班味浓度检测仪" className="result-qr-image" src={qrSrc} /> : <span />}
          <span>扫码重测</span>
        </div>

        <ReportCard result={result} />
      </div>

      <div className="result-actions">
        <Button
          className="result-action result-action-primary"
          disabled={!qrSrc}
          onClick={() => onSave(posterRef.current)}
          variant="ghost"
        >
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
