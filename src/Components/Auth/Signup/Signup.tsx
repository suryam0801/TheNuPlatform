import React, { useState } from 'react';
import { TextField, FormControlLabel, Checkbox, Snackbar, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Local Imports
import logo from '../../../assets/gc-logo-symbol-nobg.png';
import CustomButton from '../../CustomButton/index';
import styles from './styles.module.scss';
import useAuthHook from '../../../FirebaseCalls/useAuthHook';

type Props = {};

type SnackData = {
  open: boolean;
  message: string | null;
};

const Signup: React.FC<Props> = props => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const { makeUser } = useAuthHook();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(2, 'Must be 2 characters at least')
        .required('Required')
        .max(12, 'Can not exceed 12 characters'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .min(6, 'Must be 6 characters at least')
        .required('Required')
        .max(20, 'Can not exceed 20 characters')
    }),
    onSubmit: values => makeUser(values.username, values.email, values.password)
  });

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <TextField
          className={styles.input}
          id="username"
          label="Username"
          variant="outlined"
          helperText={formik.touched.username && formik.errors.username}
          error={formik.touched.username && !!formik.errors.username}
          {...formik.getFieldProps('username')}
        />
        <TextField
          className={styles.input}
          id="email"
          label="Email"
          variant="outlined"
          helperText={formik.touched.email && formik.errors.email}
          error={formik.touched.email && !!formik.errors.email}
          {...formik.getFieldProps('email')}
        />
        <TextField
          className={styles.input}
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          helperText={formik.touched.password && formik.errors.password}
          error={formik.touched.password && !!formik.errors.password}
          {...formik.getFieldProps('password')}
        />
        <CustomButton type="submit" onClick={formik.handleSubmit} isPurple title="Signup" small={false} />
      </form>
      <Link to="/login">
        <p className={styles.guest}>Already a member ? Login</p>
      </Link>
      {isLoading && <CircularProgress />}
    </div>
  );
};

export default Signup;
