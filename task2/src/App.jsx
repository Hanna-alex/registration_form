import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "./app.module.css";
import { StrictMode } from "react";
import { useRef, useEffect } from "react";

const sendFormData = (formData) => {
	console.log(formData);
};

const fieldsSchema = yup.object().shape({
	email: yup
		.string()
		.max(30, "Должно быть не больше 30 символов")
		.min(6, "Должно быть не меньше 6 символов")
		.matches(
			/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/,
			"Формат почты должен быть таким user@user.er",
		)
		.required("Введите email"),

	password: yup
		.string()
		.matches(/[^\w\d]/gi, "В пароле должен быть хотя бы один спецсимвол")
		.matches(/[A-Z]/, "В пароле должна быть хотя бы одна большая буква")
		.matches(/[a-z]/, "В пароле должна быть хотя бы одна маленькая буква")
		.matches(/\d/, "В пароле должна быть хотя бы одна цифра")
		.min(8, "Пароль быть не меньше 8 символов")
		.required("Введите пароль"),

	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password")], "Пароли должны совпадать")
		.required("Введите пароль"),
});

export const SignUpForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isDirty, isValid },
	} = useForm({
		defaultValues:{
		email: "",
		password: "",
		confirmPassword: "",
		},
		resolver:yupResolver(fieldsSchema),
		shouldFocusError: true,
		mode: "onChange",
		
	});

	const errorsMessage ={
		emailError:  errors.email ? errors.email.message : null,
		passwordError: errors.password  ? errors.password.message  :null,
		confirmPasswosError: errors.confirmPassword?  errors.confirmPassword.message:null
	}

	const submitButtonRef = useRef(null);
	useEffect(() => {
    if (isValid) {
      submitButtonRef.current.focus();
    }
  }, [isValid]);


	return (
		<StrictMode>
			<form onSubmit={handleSubmit(sendFormData)} className={styles.form}>
				<h2 className={styles.title}>Форма регистрации</h2>

				{errorsMessage.emailError && <div className={styles.error}>{errorsMessage.emailError}</div>}

				<input
					type="email"
					name="email"
					placeholder="Введите Email"
					{...register("email")}
					className={styles.input}
				/>

				{errorsMessage.passwordError && (
					<div className={styles.error}>{errorsMessage.passwordError}</div>
				)}
				<input
					type="password"
					name="password"
					placeholder="Введите пароль"
					{...register("password")}
					className={styles.input}
				/>

				{errorsMessage.confirmPasswosError && (
					<div className={styles.error}>{errorsMessage.confirmPasswosError}</div>
				)}
				<input
					type="password"
					name="confirmPassword"
					placeholder="Подтвердите пароль"
					{...register("confirmPassword")}
					className={styles.input}
				/>

				<button
					ref={submitButtonRef}
					type="submit"
					disabled={
						!isDirty || !isValid
					}
					className={styles.button}
				>
					Отправить
				</button>
			</form>
		</StrictMode>
	);
};
