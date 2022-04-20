import React from 'react';

import './styles/field.css'

export default function Field({ type, name, register, value = '', placeholder = '', onChange = (() => {})}) {
	const key = '_uid=' + type + '_' + name;
	switch (type) {
		case 'text' || 'password':
			return (
				<input type={type} name={name} placeholder={placeholder} key={key} {...register(name)} onChange={onChange}/>
			);
    case 'submit':
      return (
        <input type={type} key={key}/>
      );
		default:
			return <p key={'Unknown type: ' + type}>Unknown Type</p>;
	}
}
