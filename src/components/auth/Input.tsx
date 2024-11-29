import { type DetailedHTMLProps, type InputHTMLAttributes } from "react";
import {
  type FieldErrors,
  type FieldValues,
  type Path,
  type UseFormRegister,
} from "react-hook-form";

interface InputProps<FormData extends FieldValues>
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  name: Path<FormData>;
  register?: UseFormRegister<FormData>;
  errors?: FieldErrors<FormData>;
}

const Input = <FormData extends FieldValues>({
  label,
  name,
  register,
  errors,
  ...rest
}: InputProps<FormData>) => {
  const error = errors?.[name]?.message as string | undefined;

  return (
    <div>
      <label htmlFor={name} className="sr-only">
        {label}
      </label>
      <input
        className="relative block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
        placeholder={label}
        {...rest}
        {...register?.(name)}
      />
      {error && (
        <span className="mt-1.5 inline-block text-[0.75rem] text-red-500">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
