import React from "react";

export default function WordLengthSelector({ value, onChange }) {
  return (
    <div className="mb-4">
      <select 
        value={value} 
        onChange={e => onChange(Number(e.target.value))}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      >
        {[5].map(len => (
          <option key={len} value={len}>{len} Letter Word</option>
        ))}
      </select>
    </div>
  );
} 