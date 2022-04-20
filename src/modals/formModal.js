import React from 'react';
import ReactDOM from 'react-dom';

import './styles/formModal.css';

function formModal({ isOpen, children, onClose }) {
	if (!isOpen) {
		document.getElementById('portal-root').style.display = 'none';
		return null;
	}
	document.getElementById('portal-root').style.display = 'flex';
	// cspell:disable
	return ReactDOM.createPortal(
		<>
			<div className="modalbg" onClick={onClose}></div>
			<div className="modal">{children}</div>
		</>,
		document.getElementById('portal-root')
	);
	// cspell:enable
}

export default formModal;
