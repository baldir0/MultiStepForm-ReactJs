import React, { useState, useCallback } from 'react';
import Field from './../Field';
import FormController from './../FormController';
import FocusTrap from 'focus-trap-react';

import styles from './MultiPageForm.module.css';
import useFormHandler from './useFormHandler';

export default function MultiPageForm({ title, pages, resolver, close }) {
  const [page, setPage] = useState(0);
  const isLastPage = page === pages.length - 1;
  const isFirstPage = page === 0;
  const nextPage = useCallback(() => setPage(page + 1), [page]);
  const prevPage = useCallback(() => setPage(page - 1), [page]);

  const [register, formHandler] = useFormHandler(resolver, nextPage, isLastPage, close);

  return (
    <div className="formContainer">
      {title && <h1 className={styles.title}>{title}</h1>}
      <FocusTrap focusTrapOptions={{ allowOutsideClick: true }}>
        <form onSubmit={formHandler} className={styles.form}>
          {pages[page].map((inputArgs) => {
            return (
              <label key={inputArgs.name + '_label'}>
                <Field attributes={inputArgs} register={register} />
                {inputArgs.label}
              </label>
            );
          })}
          <FormController
            isFirstPage={isFirstPage}
            isLastPage={isLastPage}
            prevPage={prevPage}
          />
        </form>
      </FocusTrap>
    </div>
  );
}
