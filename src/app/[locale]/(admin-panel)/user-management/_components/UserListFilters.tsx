"use client";

type Props = {
  search: string;
  city: string;
  onSearchChange: (value: string) => void;
  onCityChange: (value: string) => void;
};

export default function UserListFilters() {
  return (
    <div className="border-border-default flex w-full gap-4 border-b border-dashed pb-4">
      <input
        type="text"
        placeholder="Search"
        className="bg-page-background w-1/2 rounded-md p-2"
        // value={search}
        // onChange={(e) => onSearchChange(e.target.value)}
      />
      <select
        title="Select City"
        className="bg-page-background rounded-md p-2"
        // value={city}
        // onChange={(e) => onCityChange(e.target.value)}
      >
        <option value="">Sort by city</option>
        <option value="london">London</option>
        <option value="paris">Paris</option>
        <option value="tokyo">Tokyo</option>
        <option value="new york">New York</option>
      </select>
    </div>
  );
}
