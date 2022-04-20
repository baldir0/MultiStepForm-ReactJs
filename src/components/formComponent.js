import React, { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup'; //cspell:disable-line
import { useForm } from 'react-hook-form';
import Field from './Field';
import FocusTrap from 'focus-trap-react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles/formComponent.css';

export default function MultiPageForm({ title, pages, resolver }) {
	const [page, setPage] = useState(0);
	const [arrOfInputNames, setArrOfInputNames] = useState([]);

	const isTitle = title ? true : false;
	const isLastPage = page === pages.length - 1 ? true : false;
	const isFirstPage = page === 0 ? true : false;

	const {
		register,
		handleSubmit,
		trigger,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(resolver),
		mode: 'onChange',
		reValidateMode: 'onBlur',
	});

	function buttonHandler(event) {
		const pressedButton = event.target.name;

		switch (pressedButton) {
			case 'nextPage':
				return trigger(arrOfInputNames).then((isValid) =>
					isValid ? setPage(page + 1) : ''
				);
			case 'prevPage':
				return setPage(page - 1);
			default:
				return;
		}
	}

	function enterHandler() {
		const form = document.querySelector('form');
		const formExist = form ? true : false;
		if (!formExist) return;

		form.onkeyup = function (key) {
			const nextPageButton = document.getElementsByName('nextPage')[0];
			const isEnterPressed = key.code === 'Enter' ? true : false;
			const isNextPageButtonFocus =
				key.target === nextPageButton ? true : false;
			if (!isEnterPressed || isLastPage) return;
			if (isNextPageButtonFocus) return;

			return nextPageButton.click();
		};
	}

	function errorHandler(name, placeholder) {
		const isError = errors[name] ? true : false;
		if (!isError) return;

		toast('Error: ' + placeholder + ' - ' + errors[name].message, {
			type: 'error',
			position: 'top-right',
			autoClose: 2000,
			theme: 'dark',
		});
	}

	function submitHandler(data) {
		console.table(data);
	}

	function getPage(arrayOfInputsValue) {
		return arrayOfInputsValue.map((inputProps) => {
			return (
				<label key={inputProps.name + '_label'}>
					<Field {...inputProps} register={register} />
					{errorHandler(inputProps.name, inputProps.placeholder)}
				</label>
			);
		});
	}

	function getPageElementNames(arrayOfInputsValue) {
		const res = arrayOfInputsValue.map((el) => el.name);
		setArrOfInputNames(res);
	}

	useEffect(() => {
		enterHandler();
	}, []);

	useEffect(() => {
		console.log('Page Names Updated');
		getPageElementNames(pages[page]);
	}, [page, pages]);

	return (
		<>
			<FocusTrap focusTrapOptions={{ allowOutsideClick: true }}>
				<form onSubmit={handleSubmit(submitHandler)}>
					{isTitle ? <h1>{title}</h1> : ''}
					{getPage(pages[page])}
					<div className="formControlButtons">
						{!isFirstPage && (
							<input
								type="button"
								value="<"
								name="prevPage"
								onClick={buttonHandler}
							/>
						)}
						{!isLastPage && (
							<input
								type="button"
								value=">"
								name="nextPage"
								onClick={buttonHandler}
							/>
						)}
					</div>
				</form>
			</FocusTrap>
			<ToastContainer limit={5} />
		</>
	);
}
