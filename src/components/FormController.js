import React from 'react';

function FormController({ isLastPage, isFirstPage, nextPage, prevPage }) {
  return (
    <div className="container-controlButtons">
      {!isFirstPage && (
        <input
          type="button"
          className="button prev"
          value="<"
          name="prevPage"
          onClick={prevPage}
        />
      )}
      {!isLastPage && (
        <input
          type="submit"
          className="button next"
          value=">"
          name="prevPage"
        />
      )}
    </div>
  );
}

export default FormController;
