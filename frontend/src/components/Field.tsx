import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type AppProps = {
  error?: FieldError,
  inputProps: UseFormRegisterReturn,
  label: string,
  type?: string,
}

const Field = (props: AppProps) => {
  const {
    error,
    inputProps,
    label,
    type,
  } = props;

  return (
    <div className="mb-6">
      <label className="block text-gray-700 mb-2">
        {label}
      </label>
      <input
        className="w-full p-2 border rounded focus:ring-2 focus:ring-primary"
        type={type}
        placeholder={label}
        {...inputProps}
      />
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {error.message}
        </div>
      )}
    </div>
  );
};

export default Field;
