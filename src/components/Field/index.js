import React from 'react';

import styles from './../../App.css';

export default function Field({ attributes, register, events }) {
  const name = attributes.name;
  const type = attributes.type;
  const isButton = type === 'button' || type === 'submit';
  return isButton ? (
    <input className={styles.button} {...attributes} {...events} />
  ) : (
    <input className={styles.input} {...attributes} {...register(name)} {...events} />
  );
}
