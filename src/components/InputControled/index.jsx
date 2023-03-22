import { motion } from 'framer-motion';
import { Controller } from 'react-hook-form';
import Input from '../Input';

const InputControled = ({ name, control, error, placeholder, password }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ref, onBlur } }) => (
        <Input
          password={password}
          placeholder={placeholder}
          value={value}
          error={error}
          onChange={onChange}
        />
      )}
    />
  );
};

export default InputControled;
