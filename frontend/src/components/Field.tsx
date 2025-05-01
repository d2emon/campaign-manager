import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

export type FieldProps = {
  error?: FieldError,
  inputProps: UseFormRegisterReturn,
  label: string,
  type?: string,
  afterInput?: React.ReactNode,
}

const Field = (props: FieldProps) => {
  const {
    error,
    inputProps,
    label,
    type,
    afterInput,
  } = props;

  return (
    <div className="mb-6 relative">
      <label className="block text-gray-700 mb-2">
        {label}
      </label>
      <input
        className="w-full p-2 border rounded focus:ring-2 focus:ring-primary"
        type={type}
        placeholder={label}
        {...inputProps}
      />
      {afterInput}
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {error.message}
        </div>
      )}
    </div>
  );
};

export default Field;
