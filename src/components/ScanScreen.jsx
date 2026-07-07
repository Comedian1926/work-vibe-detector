import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress";
import { Spinner } from "@/components/ui/spinner";
import { SCAN_MESSAGES } from "../data";
import { calculateResult } from "../logic";

export default function ScanScreen({ answers, onComplete }) {
  const [scan, setScan] = useState({ percent: 0, status: SCAN_MESSAGES[0] });

  useEffect(() => {
    let tick = 0;
    const target = calculateResult(answers).percent;
    const timer = window.setInterval(() => {
      tick += 1;
      const eased = Math.min(1, tick / 34);
      const shown = Math.round(target * (1 - Math.pow(1 - eased, 3)));
      const status = SCAN_MESSAGES[Math.min(SCAN_MESSAGES.length - 1, Math.floor(tick / 9))];
      setScan({ percent: shown, status });
      if (tick >= 38) {
        window.clearInterval(timer);
        onComplete();
      }
    }, 55);

    return () => window.clearInterval(timer);
  }, [answers, onComplete]);

  return (
    <section className="scan-screen">
      <Card className="scan-card">
        <CardHeader className="scan-card-header">
          <Badge className="scan-loading-line" variant="secondary">
            <Spinner data-icon="inline-start" />
            Loading
          </Badge>
          <CardTitle className="scan-title">正在扫描班味残留</CardTitle>
          <CardDescription>{scan.status}</CardDescription>
        </CardHeader>
        <CardContent className="scan-card-body">
          <div className="scan-orbit" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <div className="scan-percent">{scan.percent}%</div>
          <Progress className="scan-progress" value={scan.percent}>
            <div className="scan-progress-meta">
              <ProgressLabel>SCAN</ProgressLabel>
              <ProgressValue>{scan.percent}%</ProgressValue>
            </div>
          </Progress>
        </CardContent>
      </Card>
    </section>
  );
}
