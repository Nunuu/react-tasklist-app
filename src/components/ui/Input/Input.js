import React from 'react';

import styles from './Input.scss';

const input = (props) => {
  
  let inputElement = null;
  let validationError = null;
  const inputClasses = [styles.inputElement];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(styles.invalid);
    validationError = <p className={styles.validationError}>Please enter a valid {props.valueType}.</p>;
  }

  switch (props.elementType) {
    case('input'):
      inputElement = <input 
        className={inputClasses.join(' ')} 
        {...props.elementConfig} 
        value={props.value}
        onChange={props.changed} />;
      break;
    case('textarea'):
      inputElement = <textarea 
        className={inputClasses.join(' ')} 
        {...props.elementConfig} 
        value={props.value}
        onChange={props.changed} />;
      break;
    case('select'):
      inputElement = <select
        className={inputClasses.join(' ')}
        value={props.value}
        onChange={props.changed}>
        {props.elementConfig.options.map(option => {
          return <option value={option.value} key={option.value}>{option.label}</option>
        })}
      </select>;
      break;
    default: 
      inputElement = <input 
        className={inputClasses.join(' ')} 
        {...props.elementConfig} 
        value={props.value}
        onChange={props.changed} />;
  }

  return (
    <div className={styles.input}>
      <label className={styles.label}>{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  );
};

export default input;