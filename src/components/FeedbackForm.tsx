import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const FeedbackForm = () => {
  const [open, setOpen] = useState(false);
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nickname.trim() || !message.trim()) {
      toast({
        title: "Missing fields",
        description: "Please fill in both nickname and feedback.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase
      .from('feedback')
      .insert({ 
        nickname: nickname.trim(), 
        message: message.trim() 
      });

    setIsSubmitting(false);

    if (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Thank you!",
      description: "Your feedback has been submitted successfully.",
    });
    
    setNickname("");
    setMessage("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="flex items-center gap-2 bg-card hover:bg-accent"
        >
          <MessageSquare className="w-4 h-4" />
          Leave Feedback
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            Share Your Feedback
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label htmlFor="nickname" className="text-sm font-medium text-foreground">
              Nickname
            </label>
            <Input
              id="nickname"
              placeholder="Enter your nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              maxLength={50}
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="feedback" className="text-sm font-medium text-foreground">
              Your Feedback
            </label>
            <Textarea
              id="feedback"
              placeholder="Tell us what you think about the app..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={500}
              rows={4}
              className="mt-1 resize-none"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-addition hover:bg-addition/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackForm;
