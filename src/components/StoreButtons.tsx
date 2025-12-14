import { Apple, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const StoreButtons = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      {/* App Store Button */}
      <Button 
        variant="store" 
        size="lg"
        className="min-w-[200px] justify-start gap-3"
        onClick={() => window.open('https://apps.apple.com', '_blank')}
      >
        <Apple className="w-8 h-8" />
        <div className="text-left">
          <div className="text-xs opacity-80 font-normal">Download on the</div>
          <div className="text-lg font-bold -mt-1">App Store</div>
        </div>
      </Button>

      {/* Google Play Button */}
      <Button 
        variant="store" 
        size="lg"
        className="min-w-[200px] justify-start gap-3"
        onClick={() => window.open('https://play.google.com', '_blank')}
      >
        <Play className="w-8 h-8 fill-current" />
        <div className="text-left">
          <div className="text-xs opacity-80 font-normal">GET IT ON</div>
          <div className="text-lg font-bold -mt-1">Google Play</div>
        </div>
      </Button>
    </div>
  );
};

export default StoreButtons;
