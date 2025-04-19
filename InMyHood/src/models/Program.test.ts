import {getProgramById, getAllPrograms, getProgramByCategory, getProgramsByDateRange, getProgramsByLocation, getProgramsByOrganizer} from './Program';
import {ProgramSeed} from './ProgramSeed';
import {Program} from './Program';

describe('Program Model', () => {
    it('should get a program by ID', () => {
        const program = getProgramById(1234);
        expect(program).toEqual(ProgramSeed[0]);
    });

    it('should return undefined for a non-existent ID', () => {
        const program = getProgramById(9999);
        expect(program).toBeUndefined();
    });

    it('should get all programs', () => {
        const programs = getAllPrograms();
        expect(programs).toEqual(ProgramSeed);
    });

    it('should get programs by category', () => {
        const programs = getProgramByCategory('Dance');
        expect(programs).toEqual([ProgramSeed[0]]);
    });

    it('should return an empty array for a non-existent category', () => {
        const programs = getProgramByCategory('NonExistentCategory');
        expect(programs).toEqual([]);
    });

    it('should get programs by date range', () => {
        const startDate = new Date('2025-05-01');
        const endDate = new Date('2025-06-30');
        const programs = getProgramsByDateRange(startDate, endDate);
        expect(programs).toEqual([ProgramSeed[0], ProgramSeed[1]]);
    });

    it('should return an empty array for a date range with no programs', () => {
        const startDate = new Date('2026-01-01');
        const endDate = new Date('2026-12-31');
        const programs = getProgramsByDateRange(startDate, endDate);
        expect(programs).toEqual([]);
    });

    it('should get programs by location', () => {
        const programs = getProgramsByLocation('Newark Golf course, DE');
        expect(programs).toEqual([ProgramSeed[1]]);
    });

    it('should return an empty array for a non-existent location', () => {
        const programs = getProgramsByLocation('NonExistentLocation');
        expect(programs).toEqual([]);
    });

    it('should get programs by organizer', () => {
        const programs = getProgramsByOrganizer('Code Differently');
        expect(programs).toEqual([ProgramSeed[2]]);
    });
});