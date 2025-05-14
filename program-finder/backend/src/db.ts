import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const getDb = async () => {
  return open({
    filename: './dev.sqlite3',
    driver: sqlite3.Database
  });
}; 