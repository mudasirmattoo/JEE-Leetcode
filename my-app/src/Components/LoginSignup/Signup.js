import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');

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
        } else if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            institute: "",
            password: "",
            confirmPassword: "",
        },
        validate,
        onSubmit: async (values) => {
            setError('');

            try {
                const response = await fetch("http://localhost:9080/register-user", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Failed to register!");
                }

                alert("Signup successful! Please log in.");
                navigate("/login");

            } catch (err) {
                setError(err.message);
            }
        }
    });

    return (
        <div className="signup">
            <form onSubmit={formik.handleSubmit} className="form-container">
                {error && <div className="error">{error}</div>}

                <div className="form-control">
                    <input
                        type='text'
                        name='name'
                        placeholder='Name'
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.name && formik.errors.name && <div className='error'>{formik.errors.name}</div>}
                </div>

                <div className="form-control">
                    <input
                        type='email'
                        name='email'
                        placeholder='Email'
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email && <div className='error'>{formik.errors.email}</div>}
                </div>

                <div className="form-control">
                    <input
                        type='text'
                        name='institute'
                        placeholder='Institute'
                        onChange={formik.handleChange}
                        value={formik.values.institute}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.institute && formik.errors.institute && <div className='error'>{formik.errors.institute}</div>}
                </div>

                <div className="form-control">
                    <input
                        type='password'
                        name='password'
                        placeholder='Password'
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password && <div className='error'>{formik.errors.password}</div>}
                </div>

                <div className="form-control">
                    <input
                        type='password'
                        name='confirmPassword'
                        placeholder='Confirm Password'
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword && <div className='error'>{formik.errors.confirmPassword}</div>}
                </div>

                <button type='submit' className="submit-btn">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;
