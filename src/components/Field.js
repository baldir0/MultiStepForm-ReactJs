import React from 'react';

import './styles/field.css';

export default function Field({ attributes, register, events }) {
  const name = attributes.name;
  const type = attributes.type;
  // if (type === 'button' || type === 'submit') {
  //   return <input {...attributes} {...events} className="button"/>
  // }
  // return <input {...attributes} {...register(name)} {...events} className="input"/>;

  return (
    (type === 'button' || type === 'submit') && 
    (<input {...attributes} {...events} className="button" />)) ||
    <input {...attributes} {...register(name)} {...events} className="input"/>;
}
