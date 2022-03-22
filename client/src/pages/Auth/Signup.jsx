import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { replace, useFormik } from 'formik';
import * as Yup from 'yup';
import { createUser } from '../../redux/authSlice';
import { useDispatch } from 'react-redux';

function Signup() {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            firstName: '',
            lastName: '',
            password: '',

        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email('Invalid email').required('Required'),
            firstName: Yup.string().trim().min(2, 'Should be 5 character long').max(15, 'should not exceed 15 characters').required(('Required')),
            lastName: Yup.string().trim().min(2, 'Should be 5 character long').max(15, 'should not exceed 15 characters').required(('Required')),
            password: Yup.string().matches(/^[A-Za-z0-9]\w{8,}$/, "Should be 8 character long, Only numbers and letters").max(15, 'Should not exceed 15 characters').required('Required')
        }),
        onSubmit: (async (values) => {
            dispatch(createUser(values))
                .then(res => {
                    if(res.meta.requestStatus === "rejected"){
                        setErrorMessage(true);
                    }else if(res.meta.requestStatus === "fulfilled"){
                        navigate("/",  replace);
                    }
                })
            formik.resetForm({
                email: '',
                firstName: '',
                lastName: '',
                password: ''
            })
        })
    })

  return (
    <div className='auth'>
        <form autoComplete='off' onSubmit={formik.handleSubmit}>
            <div className='form-header form-item'>Sign up</div>
            {
                errorMessage && (
                    <span className='response-error'>Email or password is incorrect.</span>
                )
            }

            <div className='form-item'>
                <label>E-mail Address</label>
                <input type="email" name='email'
                placeholder='email'
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur} 
                />
                {formik.touched.email && formik.errors.email ? 
                <p className="error-message">{`* ${formik.errors.email}`}</p> : null}
            </div>

            <div className='form-item'>
                <label>First Name</label>
                <input type="text" name='firstName' autoComplete='off'
                placeholder='first name'
                onChange={formik.handleChange}
                value={formik.values.firstName}
                onBlur={formik.handleBlur}
                />
                {formik.touched.firstName && formik.errors.firstName ? 
                <p className="error-message">{`* ${formik.errors.firstName}`}</p> : null}
            </div>

            <div className='form-item'>
                <label>Last Name</label>
                <input type="text" name='lastName' autoComplete='off'
                placeholder='last name'
                onChange={formik.handleChange}
                value={formik.values.lastName}
                onBlur={formik.handleBlur}
                />
                {formik.touched.lastName && formik.errors.lastName ? 
                <p className="error-message">{`* ${formik.errors.lastName}`}</p> : null}
            </div>

            <div className='form-item'>
                <label>Password</label>
                <input type="password" name='password' autoComplete='off'
                placeholder='password'
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? 
                <p className="error-message">{`* ${formik.errors.password}`}</p> : null}
            </div>

            <div className='form-item'>
                <button type='submit' disabled={formik.isSubmitting}>Sign up</button>
            </div>

            <div className='form-item form-link'>
                Have an account? <Link to='/signin'>Log in now</Link>
            </div>

        </form>
    </div>
  )
}

export default Signup