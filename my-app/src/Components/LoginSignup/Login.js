import React, { useState } from "react";
import "./Login.css";
import { useFormik } from "formik";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const initialValues = { 
    email: "", 
    password: "", 
};

const Login = () => {
    const { login } = useUser();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const validate = (values) => {
        let errors = {};
        if (!values.email) errors.email = "Required";
        if (!values.password) errors.password = "Required";
        return errors;
    };

    const onSubmit = async (values) => {
        setError("");

        try {
            const response = await fetch("http://localhost:9080/login-user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Login failed!");

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(values.email));

            navigate("/profile");

        } catch (error) {
            setError(error.message);
        }
    };

    const formik = useFormik({ initialValues, onSubmit, validate });

    return (
        <div className="login">
            <form onSubmit={formik.handleSubmit} className="form-container">
                {error && <div className="error-message">{error}</div>}

                <div className="form-control">
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email"
                        onChange={formik.handleChange} 
                        value={formik.values.email} 
                        onBlur={formik.handleBlur} 
                    />
                    {formik.touched.email && formik.errors.email && <div className="error">{formik.errors.email}</div>}
                </div>

                <div className="form-control">
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password"
                        onChange={formik.handleChange} 
                        value={formik.values.password} 
                        onBlur={formik.handleBlur} 
                    />
                    {formik.touched.password && formik.errors.password && <div className="error">{formik.errors.password}</div>}
                </div>

                <button type="submit" className="submit-btn">Login</button>
            </form>
        </div>
    );
};

export default Login;
