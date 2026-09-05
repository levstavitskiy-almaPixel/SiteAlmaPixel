import { useEffect, useState } from "react";
import LookingApple, { appleBoxHeight } from "./LookingApple";

/**
 * Stays at the viewport bottom; the about panel (higher z-index) slides over it.
 */
export default function HeroApple() {
  const [appleSize, setAppleSize] = useState(380);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (w < 480 || h < 640) setAppleSize(300);
      else if (w < 768 || h < 800) setAppleSize(380);
      else setAppleSize(h < 900 ? 460 : 520);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const sink = Math.round(appleBoxHeight(appleSize) * 0.22);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[2] flex justify-center"
      style={{ transform: `translateY(${sink}px)` }}
      aria-hidden
    >
      <LookingApple size={appleSize} />
    </div>
  );
}
