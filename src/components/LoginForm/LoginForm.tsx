import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import s from './LoginForm.module.scss';
import { svgIcon } from '../App';
import Button from '../Button/Button';

export interface LoginFormProps {}

interface FormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC<LoginFormProps> = ({}) => {
  const initialValues: FormValues = {
    email: '',
    password: '',
  };

  const registerSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .max(32, 'Password must not exceed 32 characters')
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[.!@#$%^&*])/,
        'Password must contain at least one uppercase letter, one number, and one special character (e.g., .!@#$%^&*)'
      )
      .required('Required'),
  });

  const handleSubmit = (values: FormValues, actions: FormikHelpers<FormValues>): void => {
    console.log(values);
    actions.resetForm();
  };

  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div>
      <h2>Registration</h2>
      <p>
        Thank you for your interest in our platform! In order to register, we need some information. Please provide us
        with the following information.
      </p>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={registerSchema}>
        {({ errors, touched }) => (
          <Form className={s.form}>
            <label className={s.label} htmlFor="email">
              <div className={`${s.fieldWrap} ${errors.email && touched.email ? s.error : ''}`}>
                <Field className={s.field} type="email" name="email" id="email" placeholder=" " autoComplete="off" />
                <span className={s.floatingLabel}>Email</span>
                <ErrorMessage className={s.floatingError} name="email" component="span" />
              </div>
            </label>
            <label className={s.label} htmlFor="password">
              <div className={`${s.fieldWrap} ${errors.password && touched.password ? s.error : ''}`}>
                <Field
                  className={s.field}
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  placeholder=" "
                  autoComplete="off"
                />
                <span className={s.floatingLabel}>Password</span>
                <button
                  type="button"
                  className={s.togglePassword}
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg className={s.conClose}>
                      <use href={`${svgIcon}#icon-eye`} />
                    </svg>
                  ) : (
                    <svg className={s.conClose}>
                      <use href={`${svgIcon}#icon-eye-off`} />
                    </svg>
                  )}
                </button>
                <ErrorMessage className={s.floatingError} name="password" component="span" />
              </div>
            </label>
            <Button className={s.btn} type="submit">
              Log In
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
