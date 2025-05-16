import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function getDb() {
  return open({
    filename: './dev.sqlite3',
    driver: sqlite3.Database
  });
} 