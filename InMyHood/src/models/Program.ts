

import { ProgramSeed } from './ProgramSeed';

export interface Program {
    isFull: boolean;
    name: string;
    isExpired: boolean;

    id: number;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    location: string;
    category: string;
    organizer: string;
    contact: string;


}





// This function returns all programs
export function getAllPrograms(): Program[] {
    return ProgramSeed;
}


export function getFilteredPrograms(filter: Partial<Program>): Program[] {
    return ProgramSeed.filter(program => {
        return Object.entries(filter).every(([key, value]) => {
            if (key === 'startDate' || key === 'endDate') {
                return new Date(program[key as keyof Program] as string) >= new Date(value as string);
            }
            if (key === 'isExpired' || key === 'isFull') {
                return program[key as keyof Program] === value;
            }
            if (key === 'id') {
                return program[key as keyof Program] === Number(value);
            }
            if (key === 'name' || key === 'title' || key === 'description' || key === 'location' || key === 'category' || key === 'organizer' || key === 'contact') {
                return (program[key as keyof Program] as string).toLowerCase().includes((value as string).toLowerCase());
            }
            return program[key as keyof Program] === value;
        });
    });
}

