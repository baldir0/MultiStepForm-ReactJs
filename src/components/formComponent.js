import React, { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup'; //cspell:disable-line
import { useForm } from 'react-hook-form';
import Field from './Field';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles/formComponent.css';

export default function MultiPageForm({ title, pages, resolver }) {
	const [page, setPage] = useState(0);

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
		const pageObjects = pages[page].map((pageElement) => pageElement.name);
		switch (event.target.name) {
			case 'nextPage':
				return trigger(pageObjects).then((isValid) => {
					if (isValid) return setPage(page + 1);
				});
			case 'prevPage':
				return setPage(page - 1);
			default:
				return;
		}
	}

	function errorHandler(name, placeholder) {
		const isError = errors[name] ? true : false;
		if (isError) {
			toast('Error: ' + placeholder + ' - ' + errors[name].message, {
				type: 'error',
				position: 'top-right',
				autoClose: 2000,
				theme: 'dark'
			});
			return;
		}
		return;
	}

	function submitHandler(data) {
		console.table(data)
	}

	document.querySelector('form') && (
		document.querySelector('form').onkeyup = (key) => { 
			if (key.code === 'Enter' && !isLastPage) {
				const pageObjects = pages[page].map((pageElement) => pageElement.name);
				return trigger(pageObjects).then((isValid) => {
					if (isValid) return setPage(page + 1);
				})
			}}
		)

	function getPage(arrayOfInputsValue) {
		return arrayOfInputsValue.map((inputProps) => {
			return (
				<label key={inputProps.name + "_label"}>
					<Field {...inputProps} register={register}/>
					{ errorHandler(inputProps.name, inputProps.placeholder) }
				</label>
			)
		})
	}
	
	return (
		<form onSubmit={handleSubmit(submitHandler)}>
			{isTitle ? <h1>{title}</h1> : ''}
			{getPage(pages[page])}
			<ToastContainer limit={5} />
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
	);
}
