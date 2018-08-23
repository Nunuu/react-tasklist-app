import React from 'react';

// updating an object immutably
export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  }
}

// Reorder task within a list
export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

// Move task from one list to another
export const move = (source, destination, droppableSource, droppableDestination, projectId = null) => {
  // extract task from source
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination.tasks);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  // set new property
  if (projectId) {
    removed.project = projectId;
  } else {
    const dueDate = destination.date;
    if (dueDate) {
      removed.dueDate = [dueDate.clone().endOf('day').format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")];
    } else {
      delete removed.dueDate;
    }
  }

  // move to destination
  destClone.splice(droppableDestination.index, 0, removed);

  return destClone;
};

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
  let inputField;
  if (type === "textarea") {
    inputField = <textarea 
      {...input} 
      placeholder={label}
      autoFocus={autoFocus} />
  } else {
    inputField = <input 
      {...input} 
      placeholder={label} 
      type={type}
      id={id}
      autoFocus={autoFocus} />;
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