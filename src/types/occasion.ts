export interface Occasion {
  id: number;
  title: string;
  description: string;
  date: string;
}

// Mock data - in a real app this would come from your backend
export const mockOccasions: Occasion[] = [
  {
    id: 1,
    title: "Chow Family Christmas 2025",
    description: "Annual family Christmas gift exchange",
    date: "December 25, 2025",
  },
  {
    id: 2,
    title: "Hannah's Birthday",
    description: "Birthday celebration",
    date: "July 15, 2025",
  },
  {
    id: 3,
    title: "Bennet's Birthday",
    description: "Birthday celebration",
    date: "August 30, 2025",
  },
];
