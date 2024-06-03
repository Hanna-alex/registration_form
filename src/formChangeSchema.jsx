import * as yup from "yup";

export const FormChangeSchema = yup.object().shape({
	email: yup
		.string()
		.max(30, "Должно быть не больше 30 символов")
		.min(6, " ")
		.matches(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/, " ")
		.required("Введите email"),

	password: yup.string().required("Введите пароль"),

	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password")], " ")
		.required("Введите пароль"),
});
