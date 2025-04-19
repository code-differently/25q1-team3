


export interface Program {
    isFull: any;
    name: any;
    isExpired: any;

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

import { ProgramSeed } from './ProgramSeed';

// The functions below are used to get programs by different criteria
export function getProgramById(id: number): Program | undefined {
    return ProgramSeed.find(program => program.id === id);
}

// This function returns all programs
export function getAllPrograms(): Program[] {
    return ProgramSeed;
}

// The functions below are used to get programs by different criteria
export function getProgramByCategory(category: string): Program[] {
    return ProgramSeed.filter(program => program.category.toLowerCase() === category.toLowerCase());
}

// The functions below are used to get programs by different criteria
export function getProgramsByDateRange(startDate: Date, endDate: Date): Program[] {
    return ProgramSeed.filter(program => {
        const programStartDate = new Date(program.startDate);
        const programEndDate = new Date(program.endDate);
        return (programStartDate >= startDate && programStartDate <= endDate) || (programEndDate >= startDate && programEndDate <= endDate);
    });
}
// The functions below are used to get programs by different criteria
export function getProgramsByLocation(location: string): Program[] {
    return ProgramSeed.filter(program => program.location.toLowerCase() === location.toLowerCase());
}

// The functions below are used to get programs by different criteria
export function getProgramsByOrganizer(organizer: string): Program[] {
    return ProgramSeed.filter(program => program.organizer.toLowerCase() === organizer.toLowerCase());
}