import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface StarRatingProps {
  onRatingChange?: (newAverage: number) => void;
}

const StarRating = ({ onRatingChange }: StarRatingProps) => {
  const [averageRating, setAverageRating] = useState(4.9);
  const [hoverRating, setHoverRating] = useState(0);
  const [isRatingMode, setIsRatingMode] = useState(false);
  const [hasRated, setHasRated] = useState(false);

  useEffect(() => {
    fetchAverageRating();
    
    // Subscribe to realtime updates
    const channel = supabase
      .channel('ratings-changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'ratings' },
        () => fetchAverageRating()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchAverageRating = async () => {
    const { data, error } = await supabase
      .from('ratings')
      .select('stars');
    
    if (error) {
      console.error('Error fetching ratings:', error);
      return;
    }

    if (data && data.length > 0) {
      const avg = data.reduce((sum, r) => sum + r.stars, 0) / data.length;
      const rounded = Math.round(avg * 10) / 10;
      setAverageRating(rounded);
      onRatingChange?.(rounded);
    }
  };

  const handleStarClick = async (stars: number) => {
    if (hasRated) {
      toast({
        title: "Already rated",
        description: "You have already submitted a rating. Thank you!",
      });
      return;
    }

    const { error } = await supabase
      .from('ratings')
      .insert({ stars });

    if (error) {
      console.error('Error submitting rating:', error);
      toast({
        title: "Error",
        description: "Failed to submit rating. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setHasRated(true);
    setIsRatingMode(false);
    toast({
      title: "Thank you!",
      description: `You rated us ${stars} star${stars > 1 ? 's' : ''}!`,
    });
  };

  const displayRating = isRatingMode && hoverRating > 0 ? hoverRating : averageRating;
  const fullStars = Math.floor(displayRating);
  const hasPartialStar = displayRating % 1 >= 0.5;

  return (
    <div 
      className="flex items-center gap-1.5 bg-card px-3 py-1.5 rounded-full shadow-sm cursor-pointer transition-all hover:shadow-md"
      onClick={() => !hasRated && setIsRatingMode(!isRatingMode)}
    >
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 transition-all ${
              isRatingMode ? 'cursor-pointer hover:scale-110' : ''
            } ${
              (isRatingMode && hoverRating >= star) || (!isRatingMode && (star <= fullStars || (star === fullStars + 1 && hasPartialStar)))
                ? 'text-subtraction fill-subtraction'
                : 'text-subtraction/30'
            }`}
            onMouseEnter={() => isRatingMode && setHoverRating(star)}
            onMouseLeave={() => isRatingMode && setHoverRating(0)}
            onClick={(e) => {
              e.stopPropagation();
              if (isRatingMode) handleStarClick(star);
            }}
          />
        ))}
      </div>
      <span className="text-sm font-bold text-foreground">{averageRating.toFixed(1)}</span>
      {isRatingMode && !hasRated && (
        <span className="text-xs text-muted-foreground ml-1">Click to rate</span>
      )}
    </div>
  );
};

export default StarRating;
