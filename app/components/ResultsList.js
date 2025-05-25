import React from "react";

export default function ResultsList({ results }) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2 text-center text-gray-800 dark:text-gray-100">Results</h3>
      <div className="max-h-72 overflow-y-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-3 mt-2">
        {results.length === 0 ? (
          <div className="text-gray-600 dark:text-gray-400 text-center">No results</div>
        ) : (
          <div className="flex flex-wrap gap-3 justify-center">
            {results.map((word, i) => (
              <div
                key={i}
                className="bg-gray-100 dark:bg-black border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 text-lg text-gray-800 dark:text-gray-200 shadow-sm mb-1 font-mono hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-150"
              >
                {word}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 