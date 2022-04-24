import React, { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup'; //cspell:disable-line
import { useForm } from 'react-hook-form';
import Field from './Field';
import FocusTrap from 'focus-trap-react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles/formComponent.css';

export default function MultiPageForm({ title, pages, resolver, close }) {
  const [page, setPage] = useState(0);

  const hasTitle = title ? true : false;
  const isLastPage = page === pages.length - 1 ? true : false;
  const isFirstPage = page === 0 ? true : false;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resolver),
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  });

  function saveToLocalStorage(data) {
    Object.keys(data).forEach((key) => {
      localStorage.setItem(key, data[key]);
    });
  }

  function prevPage() {
    return setPage(page - 1);
  }

  function nextPage(data) {
    saveToLocalStorage(data);
    return setPage(page + 1);
  }

  function errorHandler() {
    Object.keys(errors).forEach((key) => {
      const name = errors[key].ref.placeholder;
      const message = errors[key].message;
      toast('Error:' + name + ': ' + message, {
        type: 'error',
        position: 'top-right',
        autoClose: 2000,
        theme: 'dark',
      });
    });
  }

  function sendForm(data) {
    saveToLocalStorage(data);
    toast('Form submitted', {
      type: 'success',
      position: 'top-right',
      autoClose: 2000,
      theme: 'dark',
    });
    console.table(localStorage);
    close();
  }

  function submitHandler(data) {
    if (isLastPage) return sendForm(data);
    return nextPage(data);
  }

  function fetchPage(pageInputs) {
    return (
      <FocusTrap focusTrapOptions={{ allowOutsideClick: true }}>
        <form onSubmit={handleSubmit(submitHandler, errorHandler)} className="form">
          {pageInputs.map((inputArgs) => {
            return (
              <label key={inputArgs.name + '_label'}>
                <Field attributes={inputArgs} register={register}></Field>
              </label>
            );
          })}
          <div className="container-controlButtons">
            {!isFirstPage && (
              <input
                type="button"
                value="<"
                name="prevPage"
                className="button prev"
                onClick={prevPage}
              />
            )}
            {!isLastPage && (
              <input
                type="submit"
                value=">"
                name="nextPage"
                className="button next"
              />
            )}
          </div>
        </form>
      </FocusTrap>
    );
  }

  return (
    <div className="formContainer">
      {hasTitle ? <h1 className="title">{title}</h1> : ''}
      {fetchPage(pages[page])}
    </div>
  );
}
