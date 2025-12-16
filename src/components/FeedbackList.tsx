import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MessageCircle, User } from "lucide-react";

interface Feedback {
  id: string;
  nickname: string;
  message: string;
  created_at: string;
}

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    fetchFeedbacks();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('feedback-changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'feedback' },
        (payload) => {
          setFeedbacks((prev) => [payload.new as Feedback, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchFeedbacks = async () => {
    const { data, error } = await supabase
      .from('feedback')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Error fetching feedback:', error);
      return;
    }

    if (data) {
      setFeedbacks(data);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (feedbacks.length === 0) {
    return (
      <div className="bg-card rounded-2xl p-6 text-center">
        <MessageCircle className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
        <p className="text-muted-foreground">No feedback yet. Be the first to share!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-multiplication" />
        Recent Feedback
      </h3>
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {feedbacks.map((feedback) => (
          <div 
            key={feedback.id} 
            className="bg-card rounded-xl p-4 shadow-sm animate-fade-in"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-addition/10 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-addition" />
              </div>
              <div>
                <span className="font-semibold text-foreground text-sm">{feedback.nickname}</span>
                <span className="text-xs text-muted-foreground ml-2">
                  {formatDate(feedback.created_at)}
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground pl-10">{feedback.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackList;
