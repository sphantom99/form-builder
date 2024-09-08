import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control, Controller, UseFormRegister } from "react-hook-form";
export const renderField = (
  field: FormField,
  index: number,
  register: UseFormRegister,
  control: Control
) => {
  switch (field.type) {
    case "text":
      return (
        <div key={field.id} className="space-y-2">
          <Label htmlFor={field.id}>{field.label}</Label>
          <Input
            id={field.id}
            {...register(`fields.${index}.value` as const)}
            placeholder={field.label}
          />
        </div>
      );
    case "radio":
      return (
        <div key={field.id} className="space-y-2">
          <Label>{field.label}</Label>
          <Controller
            name={`fields.${index}.value` as const}
            control={control}
            render={({ field: { onChange, value } }) => (
              <RadioGroup onValueChange={onChange} value={value}>
                {field.options?.map((option: any, optionIndex: number) => (
                  <div
                    key={optionIndex}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem
                      value={option}
                      id={`${field.id}-${optionIndex}`}
                    />
                    <Label htmlFor={`${field.id}-${optionIndex}`}>
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          />
        </div>
      );
    case "select":
      return (
        <div key={field.id} className="space-y-2">
          <Label htmlFor={field.id}>{field.label}</Label>
          <Controller
            name={`fields.${index}.value` as const}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select onValueChange={onChange} value={value}>
                <SelectTrigger id={field.id}>
                  <SelectValue placeholder={`Select ${field.label}`} />
                </SelectTrigger>
                <SelectContent>
                  {field.options?.map((option: string, optionIndex: number) => (
                    <SelectItem key={optionIndex} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      );
    default:
      return null;
  }
};
