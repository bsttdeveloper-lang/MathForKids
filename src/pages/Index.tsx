import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Users, Trophy, Sparkles, Shield, Zap } from "lucide-react";
import OperationCard from "@/components/OperationCard";
import PracticeScreen from "@/components/PracticeScreen";
import StoreButtons from "@/components/StoreButtons";
import StarRating from "@/components/StarRating";
import FeedbackForm from "@/components/FeedbackForm";
import FeedbackList from "@/components/FeedbackList";
import { Operation, generateQuestions, Question } from "@/lib/mathUtils";

const Index = () => {
  const [selectedOperation, setSelectedOperation] = useState<Operation | null>(null);
  const [decimalsEnabled, setDecimalsEnabled] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);

  const handleOperationSelect = (operation: Operation) => {
    const newQuestions = generateQuestions(operation, 10, !decimalsEnabled);
    setQuestions(newQuestions);
    setSelectedOperation(operation);
  };

  const handleBack = () => {
    setSelectedOperation(null);
    setQuestions([]);
  };

  const handleReset = () => {
    if (selectedOperation) {
      const newQuestions = generateQuestions(selectedOperation, 10, !decimalsEnabled);
      setQuestions(newQuestions);
    }
  };

  const handleAnswer = (questionId: number, answer: string) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === questionId && !q.isAnswered) {
          const userNum = parseFloat(answer);
          const isCorrect = !isNaN(userNum) && Math.abs(userNum - q.correctAnswer) < 0.01;
          return {
            ...q,
            userAnswer: answer,
            isAnswered: true,
            isCorrect,
          };
        }
        return q;
      })
    );
  };

  if (selectedOperation) {
    return (
      <PracticeScreen
        operation={selectedOperation}
        questions={questions}
        wholeNumbersOnly={!decimalsEnabled}
        onBack={handleBack}
        onReset={handleReset}
        onAnswer={handleAnswer}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="px-4 pt-8 pb-6">
        <div className="container max-w-md mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-addition/10 text-addition px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-bold">#1 Math App for Kids</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary font-nunito mb-3">
            Math Learning App
          </h1>
          <p className="text-lg text-muted-foreground font-nunito mb-6">
            Choose an operation to practice
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <StarRating />
            <div className="flex items-center gap-1.5 bg-card px-3 py-1.5 rounded-full shadow-sm">
              <Users className="w-4 h-4 text-multiplication" />
              <span className="text-sm font-bold text-foreground">2M+ Kids</span>
            </div>
            <div className="flex items-center gap-1.5 bg-card px-3 py-1.5 rounded-full shadow-sm">
              <Trophy className="w-4 h-4 text-addition" />
              <span className="text-sm font-bold text-foreground">Top Rated</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 pb-8">
        <div className="container max-w-md mx-auto">
          {/* Decimals Toggle */}
          <div className="bg-secondary/80 rounded-2xl px-5 py-4 mb-6 flex items-center justify-between">
            <span className="text-lg font-semibold text-foreground">
              {decimalsEnabled ? "Decimals enabled (0.1)" : "Decimals enable (0.1)"}
            </span>
            <Switch
              checked={decimalsEnabled}
              onCheckedChange={setDecimalsEnabled}
            />
          </div>

          {/* Operation Cards */}
          <div className="space-y-4 mb-8">
            <OperationCard operation="addition" onClick={() => handleOperationSelect("addition")} />
            <OperationCard operation="subtraction" onClick={() => handleOperationSelect("subtraction")} />
            <OperationCard operation="multiplication" onClick={() => handleOperationSelect("multiplication")} />
            <OperationCard operation="division" onClick={() => handleOperationSelect("division")} />
          </div>

          {/* Features Section */}
          <div className="bg-card rounded-3xl p-6 shadow-lg mb-6">
            <h2 className="text-xl font-bold text-foreground mb-4 text-center">Why Kids Love Us</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center text-center p-3">
                <div className="w-12 h-12 bg-addition/10 rounded-full flex items-center justify-center mb-2">
                  <Zap className="w-6 h-6 text-addition" />
                </div>
                <span className="text-sm font-semibold text-foreground">Instant Feedback</span>
              </div>
              <div className="flex flex-col items-center text-center p-3">
                <div className="w-12 h-12 bg-subtraction/10 rounded-full flex items-center justify-center mb-2">
                  <Trophy className="w-6 h-6 text-subtraction" />
                </div>
                <span className="text-sm font-semibold text-foreground">Track Progress</span>
              </div>
              <div className="flex flex-col items-center text-center p-3">
                <div className="w-12 h-12 bg-multiplication/10 rounded-full flex items-center justify-center mb-2">
                  <Shield className="w-6 h-6 text-multiplication" />
                </div>
                <span className="text-sm font-semibold text-foreground">Safe for Kids</span>
              </div>
              <div className="flex flex-col items-center text-center p-3">
                <div className="w-12 h-12 bg-division/10 rounded-full flex items-center justify-center mb-2">
                  <Sparkles className="w-6 h-6 text-division" />
                </div>
                <span className="text-sm font-semibold text-foreground">Fun to Learn</span>
              </div>
            </div>
          </div>

          {/* Feedback Section */}
          <div className="mb-6">
            <div className="flex justify-center mb-4">
              <FeedbackForm />
            </div>
            <FeedbackList />
          </div>

          {/* Store Buttons */}
          <div className="pt-4 border-t border-border">
            <p className="text-center text-muted-foreground mb-4 font-nunito font-semibold">
              Download the full app
            </p>
            <StoreButtons />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
