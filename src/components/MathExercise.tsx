import { useState } from "react";
import { Check, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const MathExercise = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  
  const correctAnswer = 7;
  const answers = [5, 6, 7, 8];

  const handleAnswer = (answer: number) => {
    setSelectedAnswer(answer);
    setShowResult(true);
  };

  const resetExercise = () => {
    setSelectedAnswer(null);
    setShowResult(false);
  };

  return (
    <div className="gradient-card rounded-3xl p-8 shadow-float max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-bold mb-4">
          <Sparkles className="w-4 h-4" />
          Math Practice
        </div>
        <h3 className="font-fredoka text-2xl text-foreground mb-2">Count and Add!</h3>
      </div>

      {/* Visual Math Problem */}
      <div className="bg-muted/50 rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {/* First group of dots */}
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={`dot1-${i}`}
                className="w-8 h-8 rounded-full gradient-accent animate-pop shadow-soft"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
          
          <span className="text-4xl font-fredoka text-primary">+</span>
          
          {/* Second group of dots */}
          <div className="flex gap-1">
            {[...Array(2)].map((_, i) => (
              <div
                key={`dot2-${i}`}
                className="w-8 h-8 rounded-full gradient-pink animate-pop shadow-soft"
                style={{ animationDelay: `${(5 + i) * 0.1}s` }}
              />
            ))}
          </div>
          
          <span className="text-4xl font-fredoka text-primary">=</span>
          
          <span className="text-5xl font-fredoka text-foreground">?</span>
        </div>
      </div>

      {/* Answer Options */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {answers.map((answer) => (
          <button
            key={answer}
            onClick={() => handleAnswer(answer)}
            disabled={showResult}
            className={`
              h-16 rounded-2xl font-fredoka text-2xl transition-all duration-300
              ${showResult && answer === correctAnswer
                ? "gradient-green text-success-foreground scale-110 shadow-lg"
                : showResult && answer === selectedAnswer && answer !== correctAnswer
                ? "bg-destructive text-destructive-foreground scale-95"
                : "bg-card border-4 border-muted hover:border-primary hover:scale-105 text-foreground shadow-card"
              }
              ${!showResult && "hover:-translate-y-1 active:scale-95"}
            `}
          >
            {answer}
          </button>
        ))}
      </div>

      {/* Result Message */}
      {showResult && (
        <div className={`
          flex items-center justify-center gap-3 p-4 rounded-2xl animate-pop
          ${selectedAnswer === correctAnswer 
            ? "bg-success/20 text-success" 
            : "bg-destructive/20 text-destructive"
          }
        `}>
          {selectedAnswer === correctAnswer ? (
            <>
              <Check className="w-6 h-6" />
              <span className="font-fredoka text-xl">Amazing! You got it!</span>
            </>
          ) : (
            <>
              <X className="w-6 h-6" />
              <span className="font-fredoka text-xl">Try again!</span>
            </>
          )}
        </div>
      )}

      {showResult && (
        <Button 
          onClick={resetExercise} 
          variant="outline" 
          className="w-full mt-4"
        >
          Try Another
        </Button>
      )}
    </div>
  );
};

export default MathExercise;
