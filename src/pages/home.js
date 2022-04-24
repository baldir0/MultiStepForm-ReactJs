import React, { useState } from 'react';
import FormModal from '../modals/FormModal';
import MultiPageForm from '../components/MultiPageForm';
import { ToastContainer } from 'react-toastify';

import './styles/home.css';

import Pages from '../resources/formProp/formProperties.json';
import ValidationSchema from '../schemas/formSchema';

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
    <div className="home">
      <button className="button center open-modal" onClick={openModal}>
        Otwórz Formularz
      </button>
      <FormModal isOpen={isOpen} close={closeModal}>
        <MultiPageForm
          title="User Declaration Form"
          pages={Pages}
          resolver={ValidationSchema}
          close={closeModal}
        />
      </FormModal>
      <ToastContainer limit={5} />
    </div>
  );
}

export default Home;
