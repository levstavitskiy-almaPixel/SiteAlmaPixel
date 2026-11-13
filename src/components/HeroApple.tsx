import { useEffect, useRef, useState } from "react";
import LookingApple, { appleBoxHeight } from "./LookingApple";

/** Full stage — hard clip so the apple never paints past about/games. */
const CLIP_ZONE = "#home-stage";
/** Sky hero only — pause Pixi once about has slid over the apple. */
const ACTIVE_ZONE = ".hero";

/**
 * Sticks to the viewport bottom while the hero is on screen;
 * clipped to home-stage so it never flashes at the page bottom.
 */
export default function HeroApple() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [appleSize, setAppleSize] = useState(380);
  const [active, setActive] = useState(true);
  const activeGate = useRef(true);

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

  useEffect(() => {
    const host = wrapRef.current;
    if (!host) return;

    let raf = 0;
    const sync = () => {
      raf = 0;
      const stage = document.querySelector(CLIP_ZONE);
      const hero = document.querySelector(ACTIVE_ZONE);
      if (!stage) return;

      const vh = window.innerHeight;
      const stageRect = stage.getBoundingClientRect();
      const onStage = stageRect.bottom > 8 && stageRect.top < vh - 8;

      if (!onStage) {
        host.style.visibility = "hidden";
        host.style.clipPath = "inset(100%)";
        if (activeGate.current) {
          activeGate.current = false;
          setActive(false);
        }
        return;
      }

      const clipTop = Math.max(0, stageRect.top);
      const clipBottom = Math.max(0, vh - stageRect.bottom);
      host.style.visibility = "visible";
      host.style.clipPath = `inset(${clipTop}px 0 ${clipBottom}px 0)`;

      // Keep the apple running only while the sky hero still covers the bottom.
      const heroBottom = hero?.getBoundingClientRect().bottom ?? stageRect.bottom;
      const shouldRun = heroBottom > vh * 0.28;
      if (activeGate.current !== shouldRun) {
        activeGate.current = shouldRun;
        setActive(shouldRun);
      }
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(sync);
    };

    sync();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const sink = Math.round(appleBoxHeight(appleSize) * 0.22);

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[2] flex justify-center"
      style={{ transform: `translateY(${sink}px)` }}
      aria-hidden
    >
      <LookingApple size={appleSize} active={active} />
    </div>
  );
}
