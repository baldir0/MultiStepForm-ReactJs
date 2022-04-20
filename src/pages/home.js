import React, { useState } from 'react';
import FormModal from './../modals/formModal';
import MultiPageForm from './../components/formComponent';
import './styles/home.css';


import Pages from '../resources/formProp/formProperties.json';
import ValidationSchema from '../schemas/formSchema';

function Home() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<div className="home">
				<button onClick={() => setIsOpen(true)}>Otwórz Formularz</button>
				<FormModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
					<MultiPageForm
						title="User Declaration Form"
						pages={Pages}
						resolver={ValidationSchema}
					/>
				</FormModal>
			</div>
		</>
	);
}

export default Home;
