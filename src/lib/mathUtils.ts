export type Operation = "addition" | "subtraction" | "multiplication" | "division";

export interface Question {
  id: number;
  num1: number;
  num2: number;
  operation: Operation;
  correctAnswer: number;
  userAnswer: string;
  isAnswered: boolean;
  isCorrect: boolean | null;
}

export const getOperationSymbol = (operation: Operation): string => {
  switch (operation) {
    case "addition":
      return "+";
    case "subtraction":
      return "−";
    case "multiplication":
      return "×";
    case "division":
      return "÷";
  }
};

export const calculateAnswer = (num1: number, num2: number, operation: Operation): number => {
  switch (operation) {
    case "addition":
      return Math.round((num1 + num2) * 10) / 10;
    case "subtraction":
      return Math.round((num1 - num2) * 10) / 10;
    case "multiplication":
      return Math.round((num1 * num2) * 10) / 10;
    case "division":
      return Math.round((num1 / num2) * 10) / 10;
  }
};

export const formatNumber = (num: number, wholeNumbersOnly: boolean): string => {
  if (wholeNumbersOnly) {
    return Math.round(num).toString();
  }
  // Always show 1 decimal place for decimal mode
  return num.toFixed(1);
};

export const generateQuestions = (
  operation: Operation,
  count: number,
  wholeNumbersOnly: boolean
): Question[] => {
  const questions: Question[] = [];

  for (let i = 0; i < count; i++) {
    let num1: number;
    let num2: number;

    if (wholeNumbersOnly) {
      // Whole numbers mode
      if (operation === "division") {
        num2 = Math.floor(Math.random() * 9) + 1;
        num1 = num2 * (Math.floor(Math.random() * 10) + 1);
      } else if (operation === "subtraction") {
        num1 = Math.floor(Math.random() * 20) + 1;
        num2 = Math.floor(Math.random() * num1) + 1;
      } else {
        num1 = Math.floor(Math.random() * 12) + 1;
        num2 = Math.floor(Math.random() * 12) + 1;
      }
    } else {
      // Decimal mode - generate numbers with 1 decimal place like 8.9, 10.1, etc.
      if (operation === "addition") {
        num1 = Math.round((Math.random() * 19 + 0.1) * 10) / 10;
        num2 = Math.round((Math.random() * 19 + 0.1) * 10) / 10;
      } else if (operation === "subtraction") {
        num1 = Math.round((Math.random() * 19 + 5) * 10) / 10;
        num2 = Math.round((Math.random() * (num1 - 0.1) + 0.1) * 10) / 10;
      } else if (operation === "multiplication") {
        num1 = Math.floor(Math.random() * 9) + 2;
        num2 = Math.floor(Math.random() * 9) + 2;
      } else {
        // Division - ensure clean results
        num2 = Math.floor(Math.random() * 9) + 2;
        const result = Math.floor(Math.random() * 9) + 2;
        num1 = num2 * result;
      }
    }

    questions.push({
      id: i + 1,
      num1,
      num2,
      operation,
      correctAnswer: calculateAnswer(num1, num2, operation),
      userAnswer: "",
      isAnswered: false,
      isCorrect: null,
    });
  }

  return questions;
};
