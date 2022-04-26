import React from 'react';

import './Field.module.css';

export default function Field({ attributes, register, events }) {
  const name = attributes.name;
  const type = attributes.type;
  const isButton = type === 'button' || type === 'submit';
  return isButton ? (
    <input className={"button"} {...attributes} {...events} />
  ) : (
    <input className={"button"} {...attributes} {...register(name)} {...events} />
  );
}
