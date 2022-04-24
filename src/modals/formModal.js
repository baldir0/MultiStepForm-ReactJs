import React from 'react';
import ReactDOM from 'react-dom';

import './styles/formModal.css';

function FormModal({ isOpen, children, close }) {
  const element = document.querySelector('.portal-container');
  if (!isOpen) {
    if (element) element.classList.add('hidden');
    return null;
  }
  if (element) element.classList.remove('hidden');
  // cspell:disable
  return ReactDOM.createPortal(
    <div className="modal">
      <div className="background" onClick={close}></div>
      <div className="content center">{children}</div>
    </div>,
    document.getElementById('portal-root')
  );
  // cspell:enable
}

export default FormModal;
