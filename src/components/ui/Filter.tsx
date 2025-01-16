// components/ui/Filter.tsx
import { useState } from "react";
import { Input } from "./Input";
import { Button } from "./Button";

interface FilterProps {
  onFilterChange: (searchTerm: string, showOwnedOnly: boolean) => void;
}

export function Filter({ onFilterChange }: FilterProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showOwnedOnly, setShowOwnedOnly] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    onFilterChange(term, showOwnedOnly);
  };

  const handleOwnedOnlyChange = () => {
    const ownedOnly = !showOwnedOnly;
    setShowOwnedOnly(ownedOnly);
    onFilterChange(searchTerm, ownedOnly);
  };

  return (
    <div className="flex space-x-4">
      <Input
        type="text"
        placeholder="Search cards..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="pl-10"
      />
      <Button variant="outline" onClick={handleOwnedOnlyChange}>
        {showOwnedOnly ? "Show All" : "Show Owned"}
      </Button>
    </div>
  );
}