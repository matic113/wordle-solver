import React from "react";

function LetterInput({ value, onChange, color }) {
  const colorMap = {
    green: "bg-green-600 text-white border-green-700 dark:bg-green-700 dark:border-green-800",
    gold: "bg-yellow-400 text-black border-yellow-500 dark:bg-yellow-500 dark:text-black dark:border-yellow-600",
    gray: "bg-gray-700 text-white border-gray-800 dark:bg-gray-800 dark:border-gray-900",
    orange: "bg-orange-400 text-black border-orange-500 dark:bg-orange-500 dark:text-black dark:border-orange-600",
  };
  return (
    <input
      type="text"
      maxLength={1}
      value={value}
      onChange={e => onChange(e.target.value.replace(/[^a-zA-Z]/, "").toUpperCase())}
      className={`w-12 h-12 text-center text-2xl m-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${colorMap[color]}`}
    />
  );
}

export default function LetterRow({ label, color, letters, setLetters, rows, setRows, canAddRows }) {
  // Single row (correct letters or not in position)
  if (letters && setLetters) {
    return (
      <div className="mb-5">
        <div className={`font-bold mb-2 capitalize text-sm text-center ${color ? `text-${color}-700 dark:text-${color}-300` : ''}`}>{label}</div>
        <div className="flex justify-center">
          {letters.map((ch, i) => (
            <LetterInput
              key={i}
              value={ch}
              onChange={val => {
                const next = [...letters];
                next[i] = val;
                setLetters(next);
              }}
              color={color}
            />
          ))}
        </div>
      </div>
    );
  }

  // Multiple rows (valid/absent letters)
  return (
    <div className="mb-5">
      <div className="flex items-center justify-center mb-2">
        <span className={`font-bold capitalize text-sm ${color ? `text-${color}-700 dark:text-${color}-300` : ''}`}>{label}</span>
        {canAddRows && (
          <button
            className="ml-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs font-semibold transition-colors duration-150"
            onClick={() => setRows([...rows, Array(rows[0].length).fill("")])}
          >
            + Add Row
          </button>
        )}
        <button
          className="ml-2 px-2 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 text-xs font-semibold transition-colors duration-150 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          onClick={() => setRows([Array(rows[0].length).fill("")])}
        >
          CLEAR
        </button>
      </div>
      {rows.map((row, rowIdx) => (
        <div key={rowIdx} className="flex justify-center mb-1">
          {row.map((ch, i) => (
            <LetterInput
              key={i}
              value={ch}
              onChange={val => {
                const nextRows = rows.map(r => [...r]);
                nextRows[rowIdx][i] = val;
                setRows(nextRows);
              }}
              color={color}
            />
          ))}
        </div>
      ))}
    </div>
  );
} 