// import * as yup from "yup";
import styles from "./app.module.css";
import { StrictMode } from "react";
import { useRef, useState } from "react";
import { FormChangeSchema } from "./formChangeSchema";
import { FormBlurSchema } from "./formBlurSchema";

const sendFormData = (formData) => {
	console.log(formData);
};

export const SignUpForm = () => {
	const [data, setData] = useState({
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [errors, setErrors] = useState({});

	const submitButtonRef = useRef(null);

	const onSubmit = (event) => {
		event.preventDefault();
		sendFormData(data);
		setData({
			email: "",
			password: "",
			confirmPassword: "",
		});
	};

	const valideteAndSetErrorsMessage = (name, value, schema) => {
		schema
			.validateAt(name, { ...data, [name]: value })
			.then(() => {
				if (!FormChangeSchema.isValidSync(data)) {
					submitButtonRef.current.focus();
				}
				setErrors({ ...errors, [name]: null });
			})
			.catch((error) =>
				setErrors(() => ({
					...errors,
					[name]: error.message,
				})),
			);
	};

	const formChange = (e) => {
		const { name, value } = e.target;
		setData({
			...data,
			[name]: value,
		});

		valideteAndSetErrorsMessage(name, value, FormChangeSchema);
	};

	const formBlur = (e) => {
		const { name, value } = e.target;

		valideteAndSetErrorsMessage(name, value, FormBlurSchema);
	};

	return (
		<StrictMode>
			<form onSubmit={onSubmit} className={styles.form}>
				<h2 className={styles.title}>Форма регистрации</h2>

				{errors.email && (
					<div className={styles.error}>{errors.email}</div>
				)}

				<input
					type="email"
					name="email"
					value={data.email}
					placeholder="Введите Email"
					onChange={formChange}
					onBlur={formBlur}
					className={styles.input}
				/>

				{errors.password && (
					<div className={styles.error}>{errors.password}</div>
				)}
				<input
					type="password"
					name="password"
					value={data.password}
					placeholder="Введите пароль"
					onChange={formChange}
					onBlur={formBlur}
					className={styles.input}
				/>

				{errors.confirmPassword && (
					<div className={styles.error}>{errors.confirmPassword}</div>
				)}
				<input
					type="password"
					name="confirmPassword"
					value={data.confirmPassword}
					placeholder="Подтвердите пароль"
					onChange={formChange}
					onBlur={formBlur}
					className={styles.input}
				/>

				<button
					ref={submitButtonRef}
					type="submit"
					disabled={
						!FormChangeSchema.isValidSync(data) &&
						!FormBlurSchema.isValidSync(data)
					}
					className={styles.button}
				>
					Отправить
				</button>
			</form>
		</StrictMode>
	);
};
