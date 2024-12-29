
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Gift, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface User {
  id: number;
  name: string;
  isAuthenticated: boolean;
}

interface WishlistItem {
  id: number;
  description: string;
  details: string;
  claimedBy?: {
    name: string;
    id: number;
  } | null;
}

// Mock data
const mockUsers: User[] = [
  { id: 1, name: "Hannah Chow", isAuthenticated: true },
  { id: 2, name: "Bennet Chow", isAuthenticated: false },
  { id: 3, name: "Beth Chow", isAuthenticated: false },
  { id: 4, name: "Kaitlin Diversey", isAuthenticated: false },
  { id: 5, name: "Lon Chow", isAuthenticated: false },
  { id: 6, name: "Nolan Chow", isAuthenticated: false },
];

const initialWishlists: Record<number, WishlistItem[]> = {
  1: [
    {
      id: 1,
      description: "Plant watering can",
      details: "Looking for a small, decorative watering can for indoor plants",
      claimedBy: null
    },
    {
      id: 2,
      description: "Kindle Paperwhite",
      details: "The latest model with the warm light feature would be great",
      claimedBy: null
    }
  ],
  2: [
    { 
      id: 1, 
      description: "Gaming mouse - Logitech G502 HERO High Performance",
      details: "Preferably in black. Need one with programmable buttons for work.",
      claimedBy: { id: 3, name: "Kaitlin Diversey" } 
    },
    { 
      id: 2, 
      description: "Coffee maker",
      details: "Looking for a drip coffee maker with timer functionality. 12-cup capacity preferred.",
      claimedBy: { id: 1, name: "Hannah Chow" } 
    },
    { 
      id: 3, 
      description: "Hiking boots",
      details: "Size 10, waterproof. Something suitable for rough terrain.",
      claimedBy: null 
    },
    {
      id: 4,
      description: "Mechanical keyboard",
      details: "Cherry MX Brown switches. TKL layout if possible.",
      claimedBy: { id: 3, name: "Kaitlin Diversey" }
    },
    {
      id: 5,
      description: "Board game - Catan",
      details: "Base game only, don't have any expansions yet.",
      claimedBy: null
    },
    {
      id: 6,
      description: "Wireless earbuds",
      details: "Need something with good battery life and noise cancellation.",
      claimedBy: null
    }
  ]
};

const GiftExchangeMain: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<number>(2);
  const [wishlists, setWishlists] = useState(initialWishlists);
  const [newItemDescription, setNewItemDescription] = useState("");
  const [newItemDetails, setNewItemDetails] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const authenticatedUserId = 1;

  const handleAddItem = () => {
    if (!newItemDescription.trim()) return;

    const newItem: WishlistItem = {
      id: Math.max(0, ...wishlists[authenticatedUserId].map(item => item.id)) + 1,
      description: newItemDescription.trim(),
      details: newItemDetails.trim(),
      claimedBy: null
    };

    setWishlists(prev => ({
      ...prev,
      [authenticatedUserId]: [...prev[authenticatedUserId], newItem]
    }));

    setNewItemDescription("");
    setNewItemDetails("");
    setIsDialogOpen(false);
  };

  const handleAddClick = () => {
    if (newItemDescription.trim()) {
      setIsDialogOpen(true);
    }
  };

  const handleClaimItem = (itemId: number) => {
    setWishlists(prev => ({
      ...prev,
      [selectedUser]: prev[selectedUser].map(item => 
        item.id === itemId 
          ? { 
              ...item, 
              claimedBy: { 
                id: authenticatedUserId, 
                name: mockUsers.find(u => u.id === authenticatedUserId)?.name || ''
              } 
            }
          : item
      )
    }));
  };

  const handleUnclaimItem = (itemId: number) => {
    setWishlists(prev => ({
      ...prev,
      [selectedUser]: prev[selectedUser].map(item =>
        item.id === itemId 
          ? { ...item, claimedBy: null }
          : item
      )
    }));
  };

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      {/* Header */}
      <div className="flex items-center gap-2 mb-8 px-2">
        <div className="w-8 h-8 bg-gray-100 rounded-full shadow-sm" />
        <div>
          <span className="text-gray-500">Logged in as</span>{" "}
          <span className="text-indigo-600 font-medium">
            {mockUsers.find(u => u.id === authenticatedUserId)?.name}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Profiles */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 px-2">Profiles</h2>
          <div className="space-y-3">
            {mockUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => setSelectedUser(user.id)}
                className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all shadow-sm hover:shadow ${
                  selectedUser === user.id 
                    ? 'bg-indigo-50 ring-1 ring-indigo-200' 
                    : 'bg-white hover:bg-gray-50'
                }`}
              >
                <div className="w-12 h-12 bg-gray-100 rounded-full shadow-sm" />
                <div>
                  <div className="font-medium text-gray-800">{user.name}</div>
                  {user.isAuthenticated && (
                    <div className="text-indigo-600 text-sm">This is you</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Wishlist */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 px-2">
            {mockUsers.find(u => u.id === selectedUser)?.name}'s Wishlist
          </h2>
          <Card className="shadow-sm rounded-xl overflow-hidden">
            <CardContent className="p-4 space-y-3">
              {selectedUser === authenticatedUserId ? (
                <>
                  <div className="flex justify-between items-center gap-2">
                    <div className="flex-1">
                      <Input
                        placeholder="Add something to your wishlist..."
                        value={newItemDescription}
                        onChange={(e) => setNewItemDescription(e.target.value)}
                        className="rounded-xl placeholder:text-gray-400 border-indigo-600"
                      />
                    </div>
                    <Button
                      onClick={handleAddClick}
                      variant="ghost"
                      className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg border-0"
                      disabled={!newItemDescription.trim()}
                    >
                      Add
                    </Button>
                  </div>

                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Add Item Details</DialogTitle>
                        <DialogDescription>
                          Add any additional information about "{newItemDescription}" that would be helpful for others.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <Textarea
                          placeholder="Add size, color preferences, or any other helpful details..."
                          value={newItemDetails}
                          onChange={(e) => setNewItemDetails(e.target.value)}
                          className="min-h-[100px]"
                        />
                      </div>
                      <DialogFooter>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            setIsDialogOpen(false);
                            setNewItemDetails("");
                          }}
                        >
                          Cancel
                        </Button>
                        <Button onClick={handleAddItem}>
                          Add to wishlist
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <div className="space-y-3 mt-4">
                    {wishlists[authenticatedUserId]?.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-4 p-3 rounded-xl bg-white transition-all hover:shadow-sm"
                      >
                        <div>
                          <span className="text-gray-700">
                            {item.description}
                          </span>
                          <p className="text-sm text-gray-500 mt-1">{item.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                wishlists[selectedUser]?.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 p-3 rounded-xl bg-white transition-all hover:shadow-sm"
                  >
                    <div className="flex-1">
                      <div>
                        <span className={item.claimedBy ? 'line-through text-gray-600' : 'text-gray-700'}>
                          {item.description}
                        </span>
                        <p className="text-sm text-gray-500 mt-1">{item.details}</p>
                      </div>
                    </div>
                    {selectedUser !== authenticatedUserId && !item.claimedBy && (
                      <Button 
                        variant="ghost"
                        className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg border-0"
                        onClick={() => handleClaimItem(item.id)}
                      >
                        <Gift className="w-4 h-4 mr-1" />
                        Claim Gift
                      </Button>
                    )}
                    {item.claimedBy && item.claimedBy.id !== authenticatedUserId && (
                      <span className="text-sm text-gray-500 min-w-[80px] text-right flex items-center justify-end gap-1">
                        <Gift className="w-3 h-3" />
                        Claimed by {item.claimedBy.name}
                      </span>
                    )}
                    {item.claimedBy?.id === authenticatedUserId && (
                      <Button
                        variant="ghost"
                        className="text-green-600 hover:text-red-600 text-sm p-0 hover:bg-transparent min-w-[80px] transition-none group"
                        onClick={() => handleUnclaimItem(item.id)}
                      >
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 group-hover:hidden" />
                          <span className="group-hover:hidden">Claimed</span>
                          <span className="hidden group-hover:inline">Un-claim?</span>
                        </div>
                      </Button>
                    )}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GiftExchangeMain;