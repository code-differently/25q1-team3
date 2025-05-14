import { getDb } from '../db';
import { Program } from '../models/Program';

export class ProgramService {
  static async findByLocationAndKeyword(zip: string, keyword: string): Promise<Program[]> {
    const db = await getDb();
    return db.all(
      `SELECT * FROM programs WHERE zip_code = ? AND organization LIKE ?`,
      [zip, `%${keyword}%`]
    );
  }

  static async getById(id: string): Promise<Program | null> {
    const db = await getDb();
    const result = await db.get(`SELECT * FROM programs WHERE id = ?`, [id]);
    return result ?? null;
  }
}
