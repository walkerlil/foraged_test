"use client";
import React, { useState, useEffect, useRef, ChangeEvent } from "react";

interface ApiResponse {
  highlight: [number, number];
  text: string;
  count: number;
}

interface AppState {
  inputText: string;
  streakIndices: number[];
  textCount: number;
}

export default function Home(): JSX.Element {
  const [state, setState] = useState<AppState>({
    inputText: "",
    streakIndices: [],
    textCount: 0,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  //placing this throughout the code to make sure the input is always focused.
  const focusInput = (): void => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    focusInput();
  }, []);

  // This function is called when the input changes, meaning the api get's called on every keystroke
  const getFormattedText = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const input = event.target.value;
    const res = await fetch("/api/greeting", {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify({ input }),
      headers: { "Content-Type": "application/json" },
    });
    const data: ApiResponse = await res.json();

    setState({
      inputText: input,
      streakIndices: data.highlight,
      textCount: data.count,
    });
  };

  const clearText = (): void => {
    setState({
      inputText: "",
      streakIndices: [],
      textCount: 0,
    });
    focusInput();
  };

  // Destructure the state for cleanliness
  const { inputText, streakIndices, textCount } = state;

  return (
    <main
      onClick={focusInput}
      className="flex min-h-screen items-center justify-center bg-gray-100 py-4"
    >
      <div
        onClick={focusInput}
        className="w-full max-w-2xl p-4 rounded-lg shadow-lg bg-white text-start relative"
      >
        <input
          ref={inputRef}
          type="text"
          value={inputText}
          onChange={getFormattedText}
          className="max-h-0"
        />
        <div className="mt-4 text-2xl break-words">
          {/* Render the formatted text with the longest streak's characters highlighted */}
          {inputText.split("").map((char, index) => {
            const isHighlighted =
              index >= streakIndices[0] && index <= streakIndices[1]; // Check if the index is within the streak range
            return (
              <span key={index} className={isHighlighted ? "highlight" : ""}>
                {char}
              </span>
            );
          })}
          <span
            className={`blinking-cursor font-light text-gray-400 ${
              inputText && "hidden "
            }`}
          >
            | Start Typing
          </span>
        </div>
        {inputText && (
          <button
            onClick={clearText}
            className={`absolute right-4 top-4 p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold hover:ease-in-out hover:scale-105 transition`}
            disabled={!inputText}
          >
            Clear
          </button>
        )}
        <div className="text-end m-2 pt-14">
          <p className="text-sm">
            Longest streak of consecutive even/odd letters: {textCount}
          </p>
          <p className="text-sm">Total character count: {inputText.length}</p>
        </div>
      </div>
    </main>
  );
}
