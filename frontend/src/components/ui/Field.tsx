import { FieldError } from 'react-hook-form';
import { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react';

export interface FieldProps {
  error?: FieldError;
  id: string;
  inputProps: InputHTMLAttributes<HTMLInputElement> | TextareaHTMLAttributes<HTMLTextAreaElement> | SelectHTMLAttributes<HTMLSelectElement>;
  label: string;
  max?: number;
  min?: number;
  options?: { value: string; label: string }[];
  placeholder?: string;
  rows?: number;
  type?: string;
  afterInput?: React.ReactNode;
}

interface FieldWrapperProps extends FieldProps {
  children?: React.ReactNode,
}

const FieldWrapper = (props: FieldWrapperProps) => {
  const {
    error,
    id,
    label,
    afterInput,
    children,
  } = props;

  return (
    <div className="mb-6 relative">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <div>
        {children}
        {afterInput}
        {error && (
          <div className="mt-2 text-red-600">
            {error.message}
          </div>
        )}
      </div>
    </div>
  );
};

const Field = (props: FieldProps) => {
  const {
    id,
    inputProps,
    label,
    max,
    min,
    options,
    placeholder,
    rows,
    type,
  } = props;

  if (type === 'textarea') {
    return (
      <FieldWrapper {...props}>
        <textarea
          id={id}
          {...(inputProps as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm min-h-[150px]"
          rows={rows}
          placeholder={placeholder || label}
        />
      </FieldWrapper>
    );
  }

  if (type === 'select') {
    return (
      <FieldWrapper {...props}>
        <select
          id={id}
          {...(inputProps as SelectHTMLAttributes<HTMLSelectElement>)}
          className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm min-h-[150px]"
        >
          {placeholder && (<option value="">{placeholder}</option>)}
          {options?.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </FieldWrapper>
    );
  }

  return (
    <FieldWrapper {...props}>
      <input
        id={id}
        {...(inputProps as InputHTMLAttributes<HTMLInputElement>)}
        className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        type={type}
        placeholder={placeholder || label}
        min={min}
        max={max}
      />
    </FieldWrapper>
  );
};

export default Field;
