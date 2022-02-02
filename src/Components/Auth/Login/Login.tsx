import React from 'react';
import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Local Imports
import CustomButton from '../../CustomButton/index';
import styles from './styles.module.scss';
import useAuthHook from '../../../FirebaseCalls/useAuthHook';

const Login: React.FC = () => {

  const { signInUser } = useAuthHook();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .min(6, 'Must be 6 characters at least')
        .required('Required')
        .max(20, 'Can not exceed 20 characters')
    }),
    onSubmit: values => signInUser(values.email, values.password)
  });

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <TextField
          className={styles.input}
          id="email"
          label="Email"
          variant="outlined"
          type="text"
          focused
          helperText={formik.touched.email && formik.errors.email}
          error={formik.touched.email && !!formik.errors.email}
          {...formik.getFieldProps('email')}
        />
        <TextField
          className={styles.input}
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          focused
          {...formik.getFieldProps('password')}
          helperText={formik.touched.password && formik.errors.password}
          error={formik.touched.password && !!formik.errors.password}
        />
        <Link to="/signup">
          <p className={styles.guest}>Don't have an account? Sign Up</p>
        </Link>
        <CustomButton type="submit" onClick={formik.handleSubmit} isPurple title="Login" small={false} />
      </form>
    </div>
  );
};

export default Login;
