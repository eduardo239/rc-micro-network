import React from 'react';

const InputSearch = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  icon,
}) => {
  return (
    <div className='App-form-icon'>
      <img src={icon} alt={name} />
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputSearch;
