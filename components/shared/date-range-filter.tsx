"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface DateRangeFilterProps {
  fromDate: string;
  toDate: string;
  onFromDateChange: (date: string) => void;
  onToDateChange: (date: string) => void;
  onClear: () => void;
}

export function DateRangeFilter({
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
  onClear,
}: DateRangeFilterProps) {
  return (
    <div className="flex items-end gap-4">
      <div className="flex-1">
        <Label htmlFor="fromDate">From Date</Label>
        <Input
          id="fromDate"
          type="date"
          value={fromDate}
          onChange={(e) => onFromDateChange(e.target.value)}
        />
      </div>
      <div className="flex-1">
        <Label htmlFor="toDate">To Date</Label>
        <Input
          id="toDate"
          type="date"
          value={toDate}
          onChange={(e) => onToDateChange(e.target.value)}
        />
      </div>
      {(fromDate || toDate) && (
        <Button
          type="button"
          variant="outline"
          onClick={onClear}
        >
          <X className="h-4 w-4 mr-2" />
          Clear
        </Button>
      )}
    </div>
  );
}
