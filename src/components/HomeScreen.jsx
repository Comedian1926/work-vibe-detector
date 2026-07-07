import { Button } from "@/components/ui/button";
import homeStartImage from "../../assets/home-start-imagegen.webp";

export default function HomeScreen({ onDemo, onDemoIntent, onStart }) {
  return (
    <section className="screen image-home-screen">
      <div className="image-home-frame">
        <img
          alt="班味浓度检测仪启动页"
          className="image-home-art"
          decoding="async"
          fetchPriority="high"
          height="1844"
          src={homeStartImage}
          width="853"
        />
        <Button
          aria-label="开始检测"
          className="image-home-hotspot image-home-start"
          onClick={onStart}
          variant="ghost"
        />
        <Button
          aria-label="查看报告样式"
          className="image-home-hotspot image-home-demo"
          onFocus={onDemoIntent}
          onMouseEnter={onDemoIntent}
          onClick={onDemo}
          variant="ghost"
        />
      </div>
    </section>
  );
}
