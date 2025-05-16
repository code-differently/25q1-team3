import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function getDb() {
  return open({
    filename: './dev.sqlite3', // Make sure this path is correct and accessible
    driver: sqlite3.Database
  });
} 