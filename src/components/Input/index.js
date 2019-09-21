import React from "react";

export const Input = ({ label, type = "text", touch, valid, ...rest }) => {
	return (
		<div className="input">
			<label htmlFor="" className="input__label">
				<span className="input__label--span">{label}</span>
				<input
					className={touch && valid ? "input-number input-error" : "input-number input-valid"}
					type={type}
					{...rest}
				/>
			</label>
		</div>
	);
};