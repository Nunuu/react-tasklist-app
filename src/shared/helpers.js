import React from 'react';

// updating an object immutability
export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  }
}

// form validation
export const required = value => (
  value || typeof value === 'number' ? undefined : 'The field is required.'
);

export const minLength = min => value => (
  value && value.length < min ? `Must be ${min} characters or more.` : undefined
);
export const minLength5 = minLength(5);

export const validateEmail = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address.'
    : undefined

// form field
export const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
  id,
  autoFocus
}) => {
  let inputField = <input 
    {...input} 
    placeholder={label} 
    type={type}
    id={id} />;
  if (type === "textarea") {
    inputField = <textarea 
      {...input} 
      placeholder={label}
      autoFocus={autoFocus} />
  }
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      {inputField}
      {touched &&
        ((error && <p>{error}</p>) ||
          (warning && <p>{warning}</p>))}
    </div>
  )
};