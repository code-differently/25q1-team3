import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import fs from 'fs';
import path from 'path';

export const getDb = async () => {
  return open({
    filename: './dev.sqlite3',
    driver: sqlite3.Database
  });
};

export const initializeDb = async () => {
  const db = await getDb();
  try {
    // Read the SQL file
    const sqlPath = path.join(__dirname, '../../database/program.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    // Execute the SQL commands
    const commands = sql.split(';').filter(cmd => cmd.trim());
    for (const command of commands) {
      if (command.trim()) {
        await db.exec(command + ';');
      }
    }
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}; 