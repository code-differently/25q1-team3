import { getDb } from '../db';
import { Program } from '../models/Program';

export class ProgramService {
  static async findByLocationAndKeyword(zip: string, keyword: string): Promise<Program[]> {
    const db = await getDb();
    let query = 'SELECT * FROM programs WHERE 1=1';
    const params: any[] = [];

    if (zip) {
      query += ' AND zip_code = ?';
      params.push(zip);
    }

    if (keyword) {
      query += ' AND (organization LIKE ? OR services LIKE ? OR type LIKE ?)';
      params.push(`%${keyword}%`, `%${keyword}%`, `%${keyword}%`);
    }

    query += ' LIMIT 20'; // Limit to 20 programs maximum

    return db.all(query, params);
  }

  static async getById(id: string): Promise<Program | null> {
    const db = await getDb();
    const result = await db.get(`SELECT * FROM programs WHERE id = ?`, [id]);
    return result ?? null;
  }
}
