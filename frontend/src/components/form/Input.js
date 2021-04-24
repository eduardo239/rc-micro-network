import React from 'react';

import styles from '../css/Input.module.css';

const Input = ({ label, type, name, value, onChange, placeholder }) => {
  return (
    <div className={styles.Input}>
      <label htmlFor={name}>{label}</label>
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

export default Input;
