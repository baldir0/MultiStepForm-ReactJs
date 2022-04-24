import React from 'react';

import './styles/field.css';

export default function Field({ attributes, register, events }) {
  const name = attributes.name;
  const type = attributes.type;
  const isButton = type === 'button' || type === 'submit' ? true : false;
  
  return isButton ? (
    <input className="button" {...attributes} {...events} />
  ) : (
    <input className="input" {...attributes} {...register(name)} {...events} />
  );
}
