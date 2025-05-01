import { useState } from 'react';
import Field, { FieldProps } from './Field';
import { Eye, EyeOff } from 'react-feather';

const PasswordField = (props: FieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Field
      type={showPassword ? 'text' : 'password'} 
      afterInput={
        <button
          type="button"
          className="absolute right-3 top-11 text-gray-500 hover:text-gray-700"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      }
      {...props}
    />
  );
};

export default PasswordField;
