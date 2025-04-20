import {ProgramSeed} from './ProgramSeed';
import {Program} from './Program';

// This function returns all programs
describe('getAllPrograms', () => {
    it('should return all programs', () => {
        const programs = ProgramSeed;
        expect(programs.length).toBe(3);
        expect(programs[0].name).toBe('Dance Class');
        expect(programs[1].name).toBe('Cooking Class');
        expect(programs[2].name).toBe('Rollerskating Class');
    });
}
);