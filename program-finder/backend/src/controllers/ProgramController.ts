import { Request, Response, NextFunction } from 'express';
import { ProgramService } from '../services/ProgramService';

export class ProgramController {
  static async searchPrograms(req: Request, res: Response, next: NextFunction) {
    const { zip = '', keyword = '' } = req.query;
    try {
      const programs = await ProgramService.findByLocationAndKeyword(zip as string, keyword as string);
      res.json(programs);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const program = await ProgramService.getById(req.params.id);
      if (!program) return res.status(404).json({ error: 'Program not found' });
      res.json(program);
    } catch (err) {
      next(err);
    }
  }
}
