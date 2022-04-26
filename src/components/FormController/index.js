import React from 'react';
import styles from './FormController.module.css'

function FormController({ isLastPage, isFirstPage, prevPage }) {
  return (
    <div className={styles['container-controlButtons']}>
      {!isFirstPage && (
        <input
          type="button"
          className={styles.prev}
          value="<"
          name="prevPage"
          onClick={prevPage}
        />
      )}
      {!isLastPage && (
        <input
          type="submit"
          className={styles.next}
          value=">"
          name="prevPage"
        />
      )}
    </div>
  );
}

export default FormController;
