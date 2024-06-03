import React, { useState } from "react";
import * as yup from "yup";
import "./App.css";

const schema = yup.object().shape({
	email: yup
		.string()
		.email("Invalid email format")
		.required("Email is required"),
	password: yup
		.string()
		.min(6, "Password must be at least 6 characters")
		.required("Password is required"),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password"), null], "Passwords must match"),
});

const SignUpForm = () => {
	const [data, setData] = useState({
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setData({
			...data,
			[name]: value,
		});

		schema
			.validateAt(name, { [name]: value })
			.then(() => setErrors({ ...errors, [name]: null }))
			.catch((error) => setErrors({ ...errors, [name]: error.message }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		schema
			.validate(data)
			.then(() => {
				console.log("Form submitted successfully");
			})
			.catch((err) => {
				const newErrors = {};
				err.inner.forEach((error) => {
					newErrors[error.path] = error.message;
				});
				setErrors(newErrors);
			});
	};

	return (
		<div className="form-container">
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="email"
					placeholder="Email"
					value={data.email}
					onChange={handleChange}
				></input>
				{errors.email && (
					<p className="error-message">{errors.email}</p>
				)}
				<input
					type="password"
					name="password"
					placeholder="Password"
					value={data.password}
					onChange={handleChange}
				></input>
				{errors.password && (
					<p className="error-message">{errors.password}</p>
				)}
				<input
					type="password"
					name="confirmPassword"
					placeholder="Confirm Password"
					value={data.confirmPassword}
					onChange={handleChange}
				></input>

				{errors.confirmPassword && (
					<p className="error-message">{errors.confirmPassword}</p>
				)}
				<button type="submit" disabled={!schema.isValidSync(data)}>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};

export default SignUpForm;
