import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Gift } from "lucide-react";

interface Occasion {
  id: number;
  title: string;
  description: string;
  date: string;
}

// Mock data - this would come from your backend in a real app
const occasions: Occasion[] = [
  {
    id: 1,
    title: "Chow Family Christmas 2025",
    description: "Annual family Christmas gift exchange",
    date: "December 25, 2025"
  },
  {
    id: 2,
    title: "Hannah's Birthday",
    description: "Birthday celebration",
    date: "July 15, 2025"
  },
  {
    id: 3,
    title: "Bennet's Birthday",
    description: "Birthday celebration",
    date: "August 30, 2025"
  }
];

export const OccasionsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleOccasionClick = (occasionId: number) => {
    navigate(`/occasions/${occasionId}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Gift Occasions</h1>
        <p className="text-gray-500">Select an occasion to view or manage gifts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {occasions.map((occasion) => (
          <Card 
            key={occasion.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleOccasionClick(occasion.id)}
          >
            <CardHeader>
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-indigo-600" />
                <CardTitle>{occasion.title}</CardTitle>
              </div>
              <CardDescription>{occasion.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">{occasion.date}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
