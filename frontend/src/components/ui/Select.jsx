import React from 'react';

const Select = ({
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  className = '',
  error = false,
  disabled = false,
  ...props
}) => {
  const baseClasses = 'block w-full px-3 py-2 border rounded-md shadow-sm bg-white focus:outline-none focus:ring-1 sm:text-sm transition-colors duration-200';

  const normalClasses = 'border-gray-300 focus:ring-blue-500 focus:border-blue-500';
  const errorClasses = 'border-red-300 focus:ring-red-500 focus:border-red-500';
  const disabledClasses = 'bg-gray-50 cursor-not-allowed';

  const classes = `${baseClasses} ${error ? errorClasses : normalClasses} ${disabled ? disabledClasses : ''} ${className}`;

  return (
    <select
      value={value}
      onChange={onChange}
      className={classes}
      disabled={disabled}
      {...props}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;