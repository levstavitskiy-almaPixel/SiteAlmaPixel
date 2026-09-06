import type { GameAnimation } from "../data/games";
import DragonBonesAnimation from "./DragonBonesAnimation";
import MovieClipAnimation from "./MovieClipAnimation";

export default function GameCharacterAnimation({
  clip,
  className = "",
  animation: animationOverride,
  anchorBone,
  onAnchor,
}: {
  clip: GameAnimation;
  className?: string;
  animation?: string;
  anchorBone?: string;
  onAnchor?: (point: { x: number; y: number } | null) => void;
}) {
  const width = clip.width ?? 280;
  const height = clip.height ?? 320;
  const scale = clip.scale ?? 1;
  const offsetY = clip.offsetY ?? 0;
  const animation = animationOverride ?? clip.animation ?? "idle";

  if (clip.skePath && clip.texPath) {
    return (
      <DragonBonesAnimation
        skePath={clip.skePath}
        texPath={clip.texPath}
        texturePath={clip.texturePath}
        armature={clip.armature}
        animation={animation}
        width={width}
        height={height}
        scale={scale}
        offsetX={clip.offsetX ?? 0}
        offsetY={offsetY}
        className={className}
        anchorBone={anchorBone}
        onAnchor={onAnchor}
      />
    );
  }

  if (clip.mcPath) {
    return (
      <MovieClipAnimation
        mcPath={clip.mcPath}
        texturePath={clip.texturePath}
        animation={animation}
        width={width}
        height={height}
        scale={scale}
        offsetY={offsetY}
        loop
        className={className}
      />
    );
  }

  return null;
}
