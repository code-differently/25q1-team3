import { Program } from "./Program";

// This file contains the seed data for the Program model.
export const ProgramSeed: Program[] = [
  {
    id: 1234,
    title: "Dance Class",
    description: "Learn how to dance in a live studio session.",
    category: "Dance",
    startDate: new Date("2025-05-01"),
    endDate: new Date("2025-05-20"),
    location: "Wilimington, DE",
    organizer: "Ezra Nyabuti",
    contact: "ezra@dance.org",
  },
  {
    id: 1235,
    title: "Golfing Class",
    description: "Learn how to golf with a hands-on golfing session.",
    category: "Golf",
    startDate: new Date("2025-06-01"),
    endDate: new Date("2025-06-20"),
    location: "Newark Golf course, DE",
    organizer: "Davis Dr.",
    contact: "davisgolfer@golf.com",
  },
  {
    id: 1236,
    title: "Rollerskating Class",
    description:
      "Learn how to rollerskate with a hands-on session and be a pro at the skating ring.",
    category: "Rollerskating",
    startDate: new Date("2025-07-01"),
    endDate: new Date("2025-07-20"),
    location: "Newark Skating Ring, DE",
    organizer: "Code Differently",
    contact: "cd@gmail.com",
  },
];
