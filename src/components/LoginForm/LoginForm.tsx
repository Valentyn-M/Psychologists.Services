import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import s from './LoginForm.module.scss';
import { svgIcon } from '../App';
import Button from '../Button/Button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectLoading } from '@/store/auth/selectors';
import { loginUser } from '@/store/auth/operations';
import { useSnackbar } from 'notistack';

export interface LoginFormProps {
  onClose?: () => void;
}

interface FormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const loading = useAppSelector(selectLoading);

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
    const email = values.email;
    const password = values.password;
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        actions.resetForm();
        onClose?.();
      })
      .catch((error) => {
        const errorMessage = typeof error === 'string' ? error : error?.message || 'Something went wrong';
        enqueueSnackbar(`Error: ${errorMessage}`, { variant: 'error' });
      });
  };
  // FormikHelpers<FormValues> надає методи, типізовані під мої значення (наприклад, resetForm)

  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div>
      <h2 className={s.title}>Log In</h2>
      <p className={s.text}>
        Welcome back! Please enter your credentials to access your account and continue your search for a psychologist.
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
                    <svg className={s.iconEye}>
                      <use href={`${svgIcon}#icon-eye`} />
                    </svg>
                  ) : (
                    <svg className={s.iconEye}>
                      <use href={`${svgIcon}#icon-eye-off`} />
                    </svg>
                  )}
                </button>
                <ErrorMessage className={s.floatingError} name="password" component="span" />
              </div>
            </label>
            <Button className={s.btn} type="submit" disabled={loading}>
              {loading ? 'Loading...' : 'Log In'}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
