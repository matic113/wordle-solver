"use client";
import React, { useState, useEffect, useRef } from "react";
import WordLengthSelector from "./WordLengthSelector";
import LetterRow from "./LetterRow";
import ResultsList from "./ResultsList";

export default function WordleSolver() {
  const [wordLength, setWordLength] = useState(5);
  const [correctLetters, setCorrectLetters] = useState(Array(wordLength).fill(""));
  const [validLettersRows, setValidLettersRows] = useState([Array(wordLength).fill("")]);
  const [absentLettersRows, setAbsentLettersRows] = useState([Array(wordLength).fill("")]);
  const [notInPositionLetters, setNotInPositionLetters] = useState([Array(wordLength).fill("")]);
  const [results, setResults] = useState([]);
  const debounceRef = useRef();

  const clearAllFields = () => {
    setCorrectLetters(Array(wordLength).fill(""));
    setValidLettersRows([Array(wordLength).fill("")]);
    setAbsentLettersRows([Array(wordLength).fill("")]);
    setNotInPositionLetters([Array(wordLength).fill("")]);
    setResults([]);
  };

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetch("/api/solve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wordLength,
          correctLetters,
          validLettersRows,
          absentLettersRows,
          notInPositionLetters,
        }),
      })
        .then(res => res.json())
        .then(data => setResults(data.words || []));
    }, 200);
    return () => clearTimeout(debounceRef.current);
  }, [wordLength, correctLetters, validLettersRows, absentLettersRows, notInPositionLetters]);

  return (
    <div className="max-w-2xl mx-auto min-h-screen pt-16 p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Wordle Solver</h1>
        <button
          onClick={clearAllFields}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg text-sm"
        >
          Clear All Fields
        </button>
      </div>
      <div className="space-y-6">
        <WordLengthSelector value={wordLength} onChange={setWordLength} />
        <LetterRow
          label="Correct Letters"
          color="green"
          letters={correctLetters}
          setLetters={setCorrectLetters}
        />
        <LetterRow
          label="Valid Letters"
          color="gold"
          rows={validLettersRows}
          setRows={setValidLettersRows}
        />
        <LetterRow
          label="Not in Position"
          color="orange"
          rows={notInPositionLetters}
          setRows={setNotInPositionLetters}
          canAddRows
        />
        <LetterRow
          label="Absent Letters"
          color="gray"
          rows={absentLettersRows}
          setRows={setAbsentLettersRows}
          canAddRows
        />
        <ResultsList results={results} />
      </div>
    </div>
  );
} 