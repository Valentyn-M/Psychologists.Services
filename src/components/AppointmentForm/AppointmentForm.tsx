import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import s from './AppointmentForm.module.scss';
import * as Yup from 'yup';
import Button from '@/components/Button/Button';
import { useState } from 'react';
import clsx from 'clsx';
import FormikTimePicker from '@/components/FormikTimePicker/FormikTimePicker';

export interface PsychologistInfo {
  avatarUrl: string;
  name: string;
}

export interface AppointmentFormProps {
  onClose: () => void;
  psychologist: PsychologistInfo;
}

interface FormValues {
  name: string;
  phone: string;
  time: string;
  email: string;
  comment: string;
}

const AppointmentForm = ({ onClose, psychologist }: AppointmentFormProps) => {
  const [loading, setLoading] = useState(false);

  const initialValues: FormValues = {
    name: '',
    phone: '',
    time: '',
    email: '',
    comment: '',
  };

  const registerSchema = Yup.object().shape({
    name: Yup.string().min(3, 'Too Short!').max(20, 'Too Long!').required('Required'),
    phone: Yup.string()
      .matches(/^\+?[0-9]{10,15}$/, 'Invalid phone number')
      .required('Required'),
    time: Yup.string()
      .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format (use HH:mm)')
      .required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    comment: Yup.string().min(3, 'Too Short!').max(500, 'Too Long!').required('Required'),
  });

  const handleSubmit = (values: FormValues, actions: FormikHelpers<FormValues>): void => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      actions.resetForm();
      onClose();
      console.log(values);
    }, 1000);
  };

  return (
    <div>
      <h2 className={s.title}>Make an appointment with a psychologists</h2>
      <p className={s.text}>
        You are on the verge of changing your life for the better. Fill out the short form below to book your personal
        appointment with a professional psychologist. We guarantee confidentiality and respect for your privacy.
      </p>
      <div className={s.psychologist}>
        <img className={s.img} src={psychologist.avatarUrl} alt="Avatar" width="44" height="44" />
        <div className={s.info}>
          <p className={s.yourPsychologist}>Your psychologist</p>
          <p className={s.name}>{psychologist.name}</p>
        </div>
      </div>
      <Formik<FormValues> initialValues={initialValues} onSubmit={handleSubmit} validationSchema={registerSchema}>
        {({ errors, touched }) => (
          <Form className={s.form}>
            <label className={s.label} htmlFor="name">
              <div className={`${s.fieldWrap} ${errors.name && touched.name ? s.error : ''}`}>
                <Field className={s.field} type="text" name="name" id="name" placeholder=" " autoComplete="off" />
                <span className={s.floatingLabel}>Name</span>
                <ErrorMessage className={s.floatingError} name="name" component="span" />
              </div>
            </label>
            <div className={s.blockssWrap}>
              <label className={`${s.label} ${s.phone}`} htmlFor="phone">
                <div className={`${s.fieldWrap} ${errors.phone && touched.phone ? s.error : ''}`}>
                  <Field className={s.field} type="text" name="phone" id="phone" placeholder=" " autoComplete="off" />
                  <span className={s.floatingLabel}>+380</span>
                  <ErrorMessage className={s.floatingError} name="phone" component="span" />
                </div>
              </label>
              <div className={`${s.fieldWrap} ${errors.time && touched.time ? s.error : ''}`}>
                <FormikTimePicker name="time" />
                {/* <span className={s.floatingLabel}>00:00</span> */}
                <ErrorMessage className={s.floatingError} name="time" component="span" />
              </div>
            </div>
            <label className={s.label} htmlFor="email">
              <div className={`${s.fieldWrap} ${errors.email && touched.email ? s.error : ''}`}>
                <Field className={s.field} type="email" name="email" id="email" placeholder=" " autoComplete="off" />
                <span className={s.floatingLabel}>Email</span>
                <ErrorMessage className={s.floatingError} name="email" component="span" />
              </div>
            </label>
            <label className={s.label} htmlFor="comment">
              <div className={`${s.fieldWrap} ${s.comment} ${errors.comment && touched.comment ? s.error : ''}`}>
                <Field
                  className={s.field}
                  as="textarea"
                  name="comment"
                  id="comment"
                  placeholder=" "
                  autoComplete="off"
                />
                <span className={s.floatingLabel}>Comment</span>
                <ErrorMessage className={s.floatingError} name="comment" component="span" />
              </div>
            </label>

            <Button className={s.btn} type="submit" disabled={loading}>
              {loading ? 'Loading...' : 'Send'}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AppointmentForm;
