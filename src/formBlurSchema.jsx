import * as yup from "yup";

export const FormBlurSchema = yup.object().shape({
	email: yup
		.string()
		.required("Введите email")
		.matches(
			/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/,
			"Формат почты должен быть таким user@user.er",
		)
		.min(6, "Должно быть не меньше 6 символов"),

	password: yup
		.string()
		.required("Введите пароль")
		.matches(/[^\w\d]/gi, "В пароле должен быть хотя бы один спецсимвол")
		.matches(/[A-Z]/, "В пароле должна быть хотя бы одна большая буква")
		.matches(/[a-z]/, "В пароле должна быть хотя бы одна маленькая буква")
		.matches(/\d/, "В пароле должна быть хотя бы одна цифра")
		.min(8, "Пароль быть не меньше 8 символов")
		.required("Введите пароль"),

	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password")], "Пароли должны совпадать")
		.required("Подтвердите пароль"),
});
