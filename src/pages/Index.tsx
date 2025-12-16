import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Trophy, Sparkles, Shield, Zap } from "lucide-react";
import OperationCard from "@/components/OperationCard";
import PracticeScreen from "@/components/PracticeScreen";
import DifficultySelect from "@/components/DifficultySelect";
import { Operation, generateQuestions, Question } from "@/lib/mathUtils";

const Index = () => {
  const [selectedOperation, setSelectedOperation] = useState<Operation | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<number | null>(null);
  const [decimalsEnabled, setDecimalsEnabled] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [cumulativeScore, setCumulativeScore] = useState({ correct: 0, incorrect: 0 });

  const handleOperationSelect = (operation: Operation) => {
    setSelectedOperation(operation);
  };

  const handleDifficultySelect = (maxNumber: number) => {
    if (selectedOperation) {
      const newQuestions = generateQuestions(selectedOperation, 10, !decimalsEnabled, maxNumber);
      setQuestions(newQuestions);
      setSelectedDifficulty(maxNumber);
    }
  };

  const handleBackFromDifficulty = () => {
    setSelectedOperation(null);
  };

  const handleBack = () => {
    setSelectedDifficulty(null);
    // Generate new questions but keep the score
    setQuestions([]);
  };

  const handleReset = () => {
    if (selectedOperation && selectedDifficulty) {
      const newQuestions = generateQuestions(selectedOperation, 10, !decimalsEnabled, selectedDifficulty);
      setQuestions(newQuestions);
      // Only reset score when reset button is pressed
      setCumulativeScore({ correct: 0, incorrect: 0 });
    }
  };

  const handleAnswer = (questionId: number, answer: string) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === questionId && !q.isAnswered) {
          const userNum = parseFloat(answer);
          const isCorrect = !isNaN(userNum) && Math.abs(userNum - q.correctAnswer) < 0.01;
          // Update cumulative score
          setCumulativeScore(score => ({
            correct: score.correct + (isCorrect ? 1 : 0),
            incorrect: score.incorrect + (isCorrect ? 0 : 1),
          }));
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

  // Show practice screen if both operation and difficulty are selected
  if (selectedOperation && selectedDifficulty) {
    return (
      <PracticeScreen
        operation={selectedOperation}
        questions={questions}
        wholeNumbersOnly={!decimalsEnabled}
        cumulativeScore={cumulativeScore}
        onBack={handleBack}
        onReset={handleReset}
        onAnswer={handleAnswer}
      />
    );
  }

  // Show difficulty selection if operation is selected
  if (selectedOperation) {
    return (
      <DifficultySelect
        operation={selectedOperation}
        onSelect={handleDifficultySelect}
        onBack={handleBackFromDifficulty}
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
            <span className="text-sm font-bold">Math Practice</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary font-nunito mb-3">
            Math Learning App
          </h1>
          <p className="text-lg text-muted-foreground font-nunito mb-6">
            Choose an operation to practice
          </p>
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

        </div>
      </div>
    </div>
  );
};

export default Index;
