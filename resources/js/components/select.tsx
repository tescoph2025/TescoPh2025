import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectInputProps {
  placeholder: string;
  items: { text: string; value: any }[];
  className: string;
  value: any; // Controlled value prop
  onChange: (value: any) => void; // Callback to handle value changes
  disabled: boolean | undefined
}

export function SelectInput({
  placeholder,
  items,
  className,
  value,
  onChange,
  disabled
}: SelectInputProps) {
  return (
    <Select disabled={disabled} value={value} onValueChange={onChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.text}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
