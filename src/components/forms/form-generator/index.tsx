import { Input } from "@/components/ui/input";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { ErrorMessage } from "@hookform/error-message";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  type: "text" | "email" | "password";
  inputType: "select" | "input" | "textarea";
  options?: { value: string; label: string; id: string }[];
  label?: string;
  placeholder: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<FieldValues>;
  name: string;
  form?: string;
  defaultValue?: string;
  lines?: number;
};
const FormGenerator = ({
  errors,
  inputType,
  name,
  placeholder,
  defaultValue,
  register,
  type,
  form,
  label,
  lines,
  options,
}: Props) => {
  switch (inputType) {
    case "input":
    default:
      return (
        <Label className="flex flex-col" htmlFor={`input-${label}`}>
          {label && label}
          <Input
            id={`input-${label}`}
            type={type}
            placeholder={placeholder}
            {...register(name)}
            form={form}
            defaultValue={defaultValue}
          />
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-400 mt-2">
                {message === "Required" ? " " : message}
              </p>
            )}
          />
        </Label>
      );
    case "select":
      return (
        <Label>
          <select form={form} {...register(name)} id={`label-${Label}`}>
            {options?.length && options.map((option) => (
              <option value={option.value} key={option.id}>
                {option.label}
              </option>
            ))}
          </select>
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-400 mt-2">
                {message === "Required" ? " " : message}
              </p>
            )}
          />
        </Label>
      );
      case "textarea":
        return (
          <Label
          className="flex flex-col gap-2"
          htmlFor={`input-${label}`}
        >
          {label && label}
          <Textarea
            form={form}
            id={`input-${label}`}
            placeholder={placeholder}
            {...register(name)}
            rows={lines}
            defaultValue={defaultValue}
          />
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-400 mt-2">
                {message === 'Required' ? '' : message}
              </p>
            )}
          />
        </Label>  
        )
  }
};

export default FormGenerator;
