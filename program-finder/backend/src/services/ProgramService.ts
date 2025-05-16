import { getDb } from '../db';
import { Program } from '../models/Program';

export class ProgramService {
  static async findByLocationAndKeyword(zip: string, keyword: string): Promise<Program[]> {
    const db = await getDb();
    if (!zip && !keyword) {
      // No filters: return all programs
      return db.all(`SELECT * FROM programs`);
    }
    if (!zip) {
      return db.all(`SELECT * FROM programs WHERE organization LIKE ?`, [`%${keyword}%`]);
    }
    if (!keyword) {
      return db.all(`SELECT * FROM programs WHERE zip_code = ?`, [zip]);
    }
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
