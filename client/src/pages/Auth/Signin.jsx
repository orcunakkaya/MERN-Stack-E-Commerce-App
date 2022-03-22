import React, { useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getUser } from '../../redux/authSlice';
import { useDispatch } from 'react-redux';

function Signin() {
    let dispatch = useDispatch();
    const location = useLocation();
    const [errorMessage, setErrorMessage] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email('Invalid email').required('Required'),
            password: Yup.string().matches(/^[A-Za-z0-9]\w{8,}$/, "Should be 5 character long, Only numbers and letters").max(15, 'Should not exceed 15 characters').required('Required')
        }),
        onSubmit: (async (values) => {
            await dispatch(getUser(values))
                .then((res) => {
                    if(res.meta.requestStatus === "rejected"){
                        setErrorMessage(true);
                    }
                })
            formik.resetForm({
                email: '',
                password: ''
            })
        })
    })

    if( localStorage.getItem("accessToken") ) {
        return <Navigate replace to={location.state?.from?.pathname || "/"} />
    }

  return (
    <div className='auth'>
        <form autoComplete='off' onSubmit={formik.handleSubmit}>
            <div className='form-header form-item'>Sign in</div>
            {
                errorMessage && (
                    <span className='response-error'>Email or password is incorrect.</span>
                )
            }
            <div className='form-item'>
                <label>Email Address</label>
                <input type="email" name='email'
                placeholder='email'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? 
            <p className="error-message">{`* ${formik.errors.email}`}</p> : null}
            </div>
            <div className='form-item'>
                <label>Password</label>
                <input type="password" name='password' autoComplete='off'
                placeholder='password'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? 
                <p className="error-message">{`* ${formik.errors.password}`}</p> : null}
            </div>
            <div className='form-item'>
                <button type='submit'>Log in</button>
            </div>
            <div className='form-item form-link'>
                Don't have an account? <Link to='/signup'>Sign Up</Link>
            </div>
        </form>
    </div>
  )
}

export default Signin