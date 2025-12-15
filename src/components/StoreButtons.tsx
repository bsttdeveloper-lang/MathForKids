import { Apple, Play } from "lucide-react";

const StoreButtons = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
      {/* App Store Button */}
      <button
        onClick={() => window.open('https://apps.apple.com/at/app/worktimehours/id6756219701?l=en-GB')}
        className="w-full sm:w-auto bg-foreground text-background rounded-xl px-5 py-3 flex items-center justify-center gap-3 hover:opacity-90 transition-opacity"
      >
        <Apple className="w-7 h-7" />
        <div className="text-left">
          <div className="text-xs opacity-80">Download on the</div>
          <div className="text-base font-bold -mt-0.5">App Store</div>
        </div>
      </button>

      {/* Google Play Button */}
      <button
        onClick={() => window.open('https://play.google.com', '_blank')}
        className="w-full sm:w-auto bg-foreground text-background rounded-xl px-5 py-3 flex items-center justify-center gap-3 hover:opacity-90 transition-opacity"
      >
        <Play className="w-7 h-7 fill-current" />
        <div className="text-left">
          <div className="text-xs opacity-80">GET IT ON</div>
          <div className="text-base font-bold -mt-0.5">Google Play</div>
        </div>
      </button>
    </div>
  );
};

export default StoreButtons;
