import * as yup from 'yup';

const ERROR_MSG = {
	ERROR_FIELD_REQUIRED_MESSAGE: 'To pole jest wymagane',
  ERROR_NAME_INVALID_CHARACTERS: 'Pole może składać się jedynie z liter',
	ERROR_PHONENUMBER_TOO_FEW_DIGITS:
		'Numer telefonu musi mieć przynajmniej 9 cyfr',
	ERROR_PHONENUMBER_TOO_MANY_DIGITS:
		'Numer telefonu może składać się maksymalnie z 12 cyfr',
	ERROR_PHONENUBMER_INVALID_NUMBER: 'Nieprawidłowy numer telefonu',
	ERROR_EMAIL: 'Nieprawidłowy adres email',
};

const schema = yup.object({
	firstName: yup
		.string()
		.default('')
		.required(ERROR_MSG.ERROR_FIELD_REQUIRED_MESSAGE)
    .matches(/[A-Za-z]/i, ERROR_MSG.ERROR_NAME_INVALID_CHARACTERS),
	lastName: yup
		.string()
		.required(ERROR_MSG.ERROR_FIELD_REQUIRED_MESSAGE)
    .matches(/[A-Za-z]/i, ERROR_MSG.ERROR_NAME_INVALID_CHARACTERS)
		.default(''),
	email: yup.string().email(ERROR_MSG.ERROR_EMAIL).default(''),
	phoneNumber: yup
		.string()
		.nullable()
		.optional()
    .default('')
		.when(
			('phoneNumber',
			(phoneNumber, schema) => {
				if (phoneNumber && phoneNumber.length) {
					return schema.matches(
						/^\d{9}$|^\+\d{11}$/i,
						ERROR_MSG.ERROR_PHONENUBMER_INVALID_NUMBER // cspell:disable-line
					);
				}
				return schema.notRequired();
			})
		),
	educationLevel: yup.string(),
	position: yup.string(),
});

export default schema;
