"use client";

import { useEffect, useCallback, useState } from "react";
import sdk, {
  AddFrame,
  SignIn as SignInCore,
  type Context,
} from "@farcaster/frame-sdk";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { config } from "~/components/providers/WagmiProvider";
import { truncateAddress } from "~/lib/truncateAddress";
import { base, optimism } from "wagmi/chains";
import { useSession } from "next-auth/react";
import { createStore } from "mipd";
import { Label } from "~/components/ui/label";
import { PROJECT_TITLE, QUIZ_QUESTIONS } from "~/lib/constants";

function QuizCard() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    
    if (answerIndex === QUIZ_QUESTIONS[currentQuestionIndex].correct) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        setIsCompleted(true);
      }
    }, 1000);
  };

  if (isCompleted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Quiz Complete! 🎉</CardTitle>
          <CardDescription>
            Your score: {score}/{QUIZ_QUESTIONS.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Label className="block mb-2">Key Limitations:</Label>
          <ul className="list-disc pl-4 text-sm">
            <li>❌ No complex databases</li>
            <li>❌ No new smart contracts</li>
            <li>✅ Date-based tracking works</li>
            <li>✅ Simple state management</li>
          </ul>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Question {currentQuestionIndex + 1}/{QUIZ_QUESTIONS.length}</CardTitle>
        <CardDescription>{currentQuestion.question}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {currentQuestion.answers.map((answer, index) => (
          <Button
            key={index}
            variant={selectedAnswer === index ? "default" : "outline"}
            onClick={() => handleAnswer(index)}
            disabled={selectedAnswer !== null}
          >
            {answer}
            {selectedAnswer === index && (
              <span className="ml-2">
                {index === currentQuestion.correct ? "✅" : "❌"}
              </span>
            )}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}

export default function Frame() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<Context.FrameContext>();

  useEffect(() => {
    const load = async () => {
      const context = await sdk.context;
      setContext(context);
      sdk.actions.ready({});
    };
    
    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
      return () => {
        sdk.removeAllListeners();
      };
    }
  }, [isSDKLoaded]);

  if (!isSDKLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{
      paddingTop: context?.client.safeAreaInsets?.top ?? 0,
      paddingBottom: context?.client.safeAreaInsets?.bottom ?? 0,
      paddingLeft: context?.client.safeAreaInsets?.left ?? 0,
      paddingRight: context?.client.safeAreaInsets?.right ?? 0,
    }}>
      <div className="w-[300px] mx-auto py-2 px-2">
        <h1 className="text-2xl font-bold text-center mb-4 text-neutral-900">
          {PROJECT_TITLE}
        </h1>
        <QuizCard />
      </div>
    </div>
  );
}
