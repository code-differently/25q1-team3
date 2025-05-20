import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import fs from 'fs';
import path from 'path';

export const getDb = async () => {
  return open({
    filename: path.join(__dirname, '../../dev.sqlite3'),
    driver: sqlite3.Database
  });
};

export const initializeDb = async () => {
  const db = await getDb();
  try {
    // Read and execute schema.sql first
    const schemaPath = path.join(__dirname, '../../database/schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    const schemaCommands = schemaSql.split(';').filter(cmd => cmd.trim());
    for (const command of schemaCommands) {
      if (command.trim()) {
        await db.exec(command + ';');
      }
    }

    // Then read and execute program.sql
    const programPath = path.join(__dirname, '../../database/program.sql');
    const programSql = fs.readFileSync(programPath, 'utf8');
    const programCommands = programSql.split(';').filter(cmd => cmd.trim());
    for (const command of programCommands) {
      if (command.trim()) {
        await db.exec(command + ';');
      }
    }
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}; 