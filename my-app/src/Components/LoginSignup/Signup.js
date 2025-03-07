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
        const response = await axios.post('http://localhost:9080/register-user', values,{
            withCredentials: true
        });
        console.log('Response from server:', response.data);
    } catch (error) {
        console.error('Error submitting form:', error);
    }
};

const validate = (values) => {
    let errors = {};

    if (!values.name) errors.name = "Required";
    if (!values.email) errors.email = "Required";
    if (!values.institute) errors.institute = "Required";

    if (!values.password) {
        errors.password = "Required";
    } else if (values.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = "Required";
    } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "Passwords must match";
    }

    return errors;
};


const Signup = () => {
    const [message, setMessage] = React.useState("");

    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            try {
                const response = await axios.post("http://localhost:9080/register-user", values, {
                    withCredentials: true
                });
                setMessage(response.data.message);
            } catch (error) {
                if (error.response) {
                    setMessage(error.response.data);
                } else {
                    setMessage("Registration failed. Please try again.");
                }
            }
        },
        validate,
    });

    return (
        <div className="signup">
            <form onSubmit={formik.handleSubmit} className="form-container">
                <input type="text" name="username" placeholder="Username" {...formik.getFieldProps("username")} />
                {formik.touched.name && formik.errors.name && <div className="error">{formik.errors.name}</div>}

                <input type="email" name="email" placeholder="Email" {...formik.getFieldProps("email")} />
                {formik.touched.email && formik.errors.email && <div className="error">{formik.errors.email}</div>}

                <input type="text" name="institute" placeholder="Institute" {...formik.getFieldProps("institute")} />
                {formik.touched.institute && formik.errors.institute && <div className="error">{formik.errors.institute}</div>}

                <input type="password" name="password" placeholder="Password" {...formik.getFieldProps("password")} />
                {formik.touched.password && formik.errors.password && <div className="error">{formik.errors.password}</div>}

                <input type="password" name="confirmPassword" placeholder="Confirm Password" {...formik.getFieldProps("confirmPassword")} />
                {formik.touched.confirmPassword && formik.errors.confirmPassword && <div className="error">{formik.errors.confirmPassword}</div>}

                <button type="submit" className="submit-btn">Sign Up</button>

                {message && <div className="message">{message}</div>}
            </form>
        </div>
    );
};


export default Signup;