import { NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";

export async function POST(req) {
  const body = await req.json();
  const { wordLength, correctLetters, validLettersRows, absentLettersRows, notInPositionLetters } = body;

  // Build SQL query
  let whereClauses = [];
  let params = [];

  // Correct letters (green)
  if (correctLetters && correctLetters.length) {
    let pattern = correctLetters.map(l => l ? l.toLowerCase() : '_').join('');
    whereClauses.push(`word LIKE ?`);
    params.push(pattern);
  }

  // Valid letters (yellow)
  if (validLettersRows && validLettersRows.length) {
    validLettersRows.forEach((row, rowIdx) => {
      row.forEach((l, i) => {
        if (l) {
          whereClauses.push(`word LIKE ?`);
          params.push(`%${l.toLowerCase()}%`);
        }
      });
    });
  }

  // Not in position letters (orange)
  if (notInPositionLetters && notInPositionLetters.length) {
    notInPositionLetters.forEach((row, rowIdx) => {
      row.forEach((l, i) => {
        if (l) {
          let pos = i + 1;
          whereClauses.push(`SUBSTR(word, ?, 1) != ?`);
          params.push(pos, l.toLowerCase());
          // Also ensure the letter exists somewhere in the word
          whereClauses.push(`word LIKE ?`);
          params.push(`%${l.toLowerCase()}%`);
        }
      });
    });
  }

  // Absent letters (gray)
  if (absentLettersRows && absentLettersRows.length) {
    absentLettersRows.forEach(row => {
      row.forEach(l => {
        if (l) {
          whereClauses.push(`word NOT LIKE ?`);
          params.push(`%${l.toLowerCase()}%`);
        }
      });
    });
  }

  // Word length
  whereClauses.push(`LENGTH(word) = ?`);
  params.push(wordLength);

  const dbPath = path.join(process.cwd(), "data", "wordle.db");
  const db = await open({ filename: dbPath, driver: sqlite3.Database });

  const sql = `SELECT word FROM words WHERE ${whereClauses.join(' AND ')} LIMIT 100`;
  const rows = await db.all(sql, params);
  await db.close();

  return NextResponse.json({ words: rows.map(r => r.word) });
} 