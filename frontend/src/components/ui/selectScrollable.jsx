import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";

export function SelectScrollable({
  id,
  label,
  placeholder,
  groups,
  value,
  onChange,
  error,
  className = "",
}) {
  return (
    <div className="space-y-1">
      {label && (
        <Label htmlFor={id} className="text-sm text-gray-300">
          {label}
        </Label>
      )}

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          id={id}
          className={`w-full bg-gray-800 border border-gray-600 text-white placeholder:text-gray-400
            rounded-md px-3 py-2 shadow-sm transition duration-300 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
            hover:border-emerald-500 ${className}`}
        >
          <SelectValue placeholder={placeholder || "Select an option"} />
        </SelectTrigger>

        <SelectContent className="bg-gray-800 text-white border border-gray-600">
          {groups.map((group) => (
            <SelectGroup key={group.label}>
              <SelectLabel className="text-gray-400 px-2 py-1">{group.label}</SelectLabel>
              {group.options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="hover:bg-emerald-500 hover:text-white text-white px-3 py-2 cursor-pointer"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>

      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
}
