import { FieldError } from 'react-hook-form';
import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

export type FieldProps = {
  error?: FieldError,
  id: string,
  inputProps: InputHTMLAttributes<HTMLInputElement> | TextareaHTMLAttributes<HTMLTextAreaElement>,
  label: string,
  max?: number,
  min?: number,
  placeholder?: string,
  type?: string,
  afterInput?: React.ReactNode,
}

const Field = (props: FieldProps) => {
  const {
    error,
    id,
    inputProps,
    label,
    max,
    min,
    placeholder,
    type,
    afterInput,
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
        {type === 'textarea' ? (
          <textarea
            id={id}
            {...(inputProps as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm min-h-[150px]"
            rows={4}
            placeholder={placeholder || label}
          />
        ) : (
            <input
              className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              type={type}
              id={id}
              placeholder={placeholder || label}
              {...(inputProps as InputHTMLAttributes<HTMLInputElement>)}
              min={min}
              max={max}
            />
        )}
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

export default Field;
