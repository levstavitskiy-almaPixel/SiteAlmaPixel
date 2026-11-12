import DiscordButton from "./DiscordButton";
import TelegramButton from "./TelegramButton";

type CommunityButtonsProps = {
  compact?: boolean;
  className?: string;
};

export default function CommunityButtons({
  compact = false,
  className = "",
}: CommunityButtonsProps) {
  return (
    <div
      className={`flex items-center ${compact ? "flex-nowrap gap-2" : "flex-wrap justify-center gap-3"} ${className}`.trim()}
    >
      <TelegramButton compact={compact} />
      <DiscordButton compact={compact} />
    </div>
  );
}
