import React from 'react';
import './Signup.css';
import { useFormik } from 'formik';
import axios from 'axios';

const initialValues = {
    name: "", 
    email: "", 
    institute: "",
    password: "", 
    confirmPassword : ""
};

const onSubmit = async (values) => {
    try {
        const response = await axios.post('http://localhost:5000/submit', values);
        console.log('Response from server:', response.data);
    } catch (error) {
        console.error('Error submitting form:', error);
    }
};

const validate = (values) => {
    let errors = {};

    if (!values.name) {
        errors.name = "Required";
    }
    if (!values.email) {
        errors.email = "Required";
    }
    if (!values.institute) {
        errors.institute = "Required";
    }
    if (!values.password) {
        errors.password = "Required";
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = "Required";
    }
    return errors;
};

const Signup = () => {
    const formik = useFormik({
        initialValues,
        onSubmit,
        validate   
    }); 
    
    return (
        <div className="signup">
            <form onSubmit={formik.handleSubmit} className="form-container">
                <div className="form-control">
                    <input 
                        type='text' 
                        name='name' 
                        placeholder='Name'
                        onChange={formik.handleChange} 
                        value={formik.values.name} 
                        onBlur={formik.handleBlur} />
                    {formik.touched.name && formik.errors.name ? <div className='error'>{formik.errors.name}</div> : null}
                </div>

                <div className="form-control">
                    <input 
                        type='email' 
                        name='email' 
                        placeholder='Email'
                        onChange={formik.handleChange} 
                        value={formik.values.email} 
                        onBlur={formik.handleBlur} />
                    {formik.touched.email && formik.errors.email ? <div className='error'>{formik.errors.email}</div> : null}
                </div>

                <div className="form-control">
                    <input 
                        type='text' 
                        name='institute' 
                        placeholder='Institute'
                        onChange={formik.handleChange} 
                        value={formik.values.institute} 
                        onBlur={formik.handleBlur} />
                    {formik.touched.institute && formik.errors.institute ? <div className='error'>{formik.errors.institute}</div> : null}
                </div>

                <div className="form-control">
                    <input 
                        type='text' 
                        name='password' 
                        placeholder='Password'
                        onChange={formik.handleChange} 
                        value={formik.values.password} 
                        onBlur={formik.handleBlur} />
                    {formik.touched.password && formik.errors.password ? <div className='error'>{formik.errors.password}</div> : null}
                </div>

                <div className="form-control">
                    <input 
                        type='text' 
                        name='confirmPassword' 
                        placeholder='Confirm Password'
                        onChange={formik.handleChange} 
                        value={formik.values.confirmPassword} 
                        onBlur={formik.handleBlur} />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? <div className='error'>{formik.errors.confirmPassword}</div> : null}
                </div>

                <button type='submit' className="submit-btn">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;