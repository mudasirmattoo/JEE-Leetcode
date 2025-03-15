import React from 'react';
import './Login.css';
import { useFormik } from 'formik';
import axios from 'axios';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const initialValues = { 
    email: "", 
    password: "", 
};

const Login = () => {
    const { login } = useUser();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        try {
            const response = await axios.post('http://localhost:5000/submit', values);
            login(response.data);
            navigate('/profile');
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const validate = (values) => {
        let errors = {};

        
        if (!values.email) {
            errors.email = "Required";
        }
        
        if (!values.password) {
            errors.password = "Required";
        }
        return errors;
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validate   
    }); 
    
    return (
        <div className="login">
            <form onSubmit={formik.handleSubmit} className="form-container">
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
                        name='password' 
                        placeholder='Password'
                        onChange={formik.handleChange} 
                        value={formik.values.password} 
                        onBlur={formik.handleBlur} />
                    {formik.touched.password && formik.errors.password ? <div className='error'>{formik.errors.password}</div> : null}
                </div>


                <button type='submit' className="submit-btn">Login</button>
            </form>
        </div>
    );
};

export default Login;