
import React from 'react'


export const renderField = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
  }) => (
    <div>
      <label className="input__label">{label}
        <input {...input} placeholder={label} type={type}  className={ touched && error ? "valid-error input" : "input"}/>
        {touched &&
          ((error && <span className="span-error">{error}</span>) ||
            (warning && <span>{warning}</span>))}
            </label>
    </div>
  )

  export const validate = values => {
    const errors = {}
    if (!values.nick) {
      errors.nick = 'Required'
    } else if (values.nick.length < 3) {
      errors.nick = 'Must be 3 characters or more'
    }
    if (!values.login) {
      errors.login = 'Required'
    } else if (values.login.length < 3) {
      errors.login = 'Must be 3 characters or more'
    }
    if (!values.password) {
      errors.password = 'Required'
    } else if (values.password.length < 5) {
        errors.password = 'Must be 5 characters or more'
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Required'
    } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Confirm password bad'
    }
    return errors
  }