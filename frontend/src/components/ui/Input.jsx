import React from 'react';

const Input = ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  className = '',
  error = false,
  disabled = false,
  required = false,
  ...props
}) => {
  const baseClasses = 'block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 sm:text-sm transition-colors duration-200';

  const normalClasses = 'border-gray-300 focus:ring-blue-500 focus:border-blue-500';
  const errorClasses = 'border-red-300 focus:ring-red-500 focus:border-red-500';
  const disabledClasses = 'bg-gray-50 cursor-not-allowed';

  const classes = `${baseClasses} ${error ? errorClasses : normalClasses} ${disabled ? disabledClasses : ''} ${className}`;

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={classes}
      disabled={disabled}
      required={required}
      {...props}
    />
  );
};

export default Input;