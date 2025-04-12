import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { Link } from 'react-router-dom';

const initialValues = {
    name: "",
    email: "",
    institute: "",
    password: "",
    confirmPassword: ""
};

const validate = (values) => {
    let errors = {};
    if (!values.name) { errors.name = "Required"; }
    if (!values.email) { errors.email = "Required"; }
    if (!values.institute) { errors.institute = "Required"; }
    if (!values.password) { errors.password = "Required"; }
    if (!values.confirmPassword) { errors.confirmPassword = "Required"; }
    else if (values.password && values.confirmPassword !== values.password) {
        errors.confirmPassword = "Passwords must match";
    }
    return errors;
};

const Signup = () => {
    const onSubmit = async (values) => {
        try {
            const response = await axios.post('http://localhost:5000/submit', values);
            console.log('Response from server:', response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    });

    return (
        <div className="w-full max-w-md mx-auto my-16 bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-8 py-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign Up</h2>
                
                <form onSubmit={formik.handleSubmit} className="space-y-5">
                    <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            onBlur={formik.handleBlur}
                            className="w-full px-4 py-3 rounded-md bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent transition duration-200"
                        />
                        {formik.touched.name && formik.errors.name && (
                            <p className="mt-1 text-sm text-red-600">{formik.errors.name}</p>
                        )}
                    </div>

                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            onBlur={formik.handleBlur}
                            className="w-full px-4 py-3 rounded-md bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent transition duration-200"
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
                        )}
                    </div>

                    <div>
                        <input
                            type="text"
                            name="institute"
                            placeholder="Institute"
                            onChange={formik.handleChange}
                            value={formik.values.institute}
                            onBlur={formik.handleBlur}
                            className="w-full px-4 py-3 rounded-md bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent transition duration-200"
                        />
                        {formik.touched.institute && formik.errors.institute && (
                            <p className="mt-1 text-sm text-red-600">{formik.errors.institute}</p>
                        )}
                    </div>

                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            onBlur={formik.handleBlur}
                            className="w-full px-4 py-3 rounded-md bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent transition duration-200"
                        />
                        {formik.touched.password && formik.errors.password && (
                            <p className="mt-1 text-sm text-red-600">{formik.errors.password}</p>
                        )}
                    </div>

                    <div>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            onChange={formik.handleChange}
                            value={formik.values.confirmPassword}
                            onBlur={formik.handleBlur}
                            className="w-full px-4 py-3 rounded-md bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent transition duration-200"
                        />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                            <p className="mt-1 text-sm text-red-600">{formik.errors.confirmPassword}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-3 text-white font-medium bg-red-900 hover:bg-red-800 rounded-md transition duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-red-900 hover:underline font-medium">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;

// import React from 'react';
// import { useFormik } from 'formik';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const initialValues = {
//     name: "",
//     email: "",
//     institute: "",
//     password: "",
//     confirmPassword: ""
// };

// const validate = (values) => {
//     let errors = {};
//     if (!values.name) { errors.name = "Required"; }
//     if (!values.email) { errors.email = "Required"; }
//     if (!values.institute) { errors.institute = "Required"; }
//     if (!values.password) { errors.password = "Required"; }
//     if (!values.confirmPassword) { errors.confirmPassword = "Required"; }
//     else if (values.password && values.confirmPassword !== values.password) {
//         errors.confirmPassword = "Passwords must match";
//     }
//     return errors;
// };

// const Signup = () => {
//     const onSubmit = async (values) => {
//         try {
//             const response = await axios.post('http://localhost:5000/submit', values);
//             console.log('Response from server:', response.data);
//         } catch (error) {
//             console.error('Error submitting form:', error);
//         }
//     };

//     const formik = useFormik({
//         initialValues,
//         onSubmit,
//         validate
//     });

//     const containerStyle = {
//         width: '100%',
//         maxWidth: '28rem',
//         margin: '4rem auto',
//         backgroundColor: 'white',
//         borderRadius: '0.5rem',
//         boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
//         overflow: 'hidden'
//     };

//     const innerContainerStyle = {
//         padding: '2rem'
//     };

//     const headerStyle = {
//         fontSize: '1.5rem',
//         fontWeight: '700',
//         color: '#2d3748',
//         marginBottom: '1.5rem'
//     };

//     const formStyle = {
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '1.25rem'
//     };

//     const inputContainerStyle = {
//         display: 'flex',
//         flexDirection: 'column'
//     };

//     const inputStyle = {
//         width: '100%',
//         padding: '0.75rem 1rem',
//         borderRadius: '0.375rem',
//         backgroundColor: '#f9fafb',
//         border: '1px solid #d1d5db',
//         outline: 'none',
//         transition: 'all 0.2s',
//         fontSize: '1rem'
//     };

//     const errorStyle = {
//         marginTop: '0.25rem',
//         fontSize: '0.875rem',
//         color: '#e53e3e'
//     };

//     const buttonStyle = {
//         width: '100%',
//         padding: '0.75rem 1rem',
//         color: 'white',
//         fontWeight: '500',
//         backgroundColor: '#7f1d1d', // red-900
//         border: 'none',
//         borderRadius: '0.375rem',
//         cursor: 'pointer',
//         transition: 'all 0.2s',
//         fontSize: '1rem'
//     };

//     const footerTextStyle = {
//         marginTop: '1.5rem',
//         textAlign: 'center',
//         color: '#4b5563'
//     };

//     const linkStyle = {
//         color: '#7f1d1d', // red-900
//         fontWeight: '500',
//         textDecoration: 'none'
//     };

//     return (
//         <div style={containerStyle}>
//             <div style={innerContainerStyle}>
//                 <h2 style={headerStyle}>Sign Up</h2>
                
//                 <form onSubmit={formik.handleSubmit} style={formStyle}>
//                     <div style={inputContainerStyle}>
//                         <input
//                             type="text"
//                             name="name"
//                             placeholder="Name"
//                             onChange={formik.handleChange}
//                             value={formik.values.name}
//                             onBlur={formik.handleBlur}
//                             style={inputStyle}
//                         />
//                         {formik.touched.name && formik.errors.name && (
//                             <p style={errorStyle}>{formik.errors.name}</p>
//                         )}
//                     </div>

//                     <div style={inputContainerStyle}>
//                         <input
//                             type="email"
//                             name="email"
//                             placeholder="Email"
//                             onChange={formik.handleChange}
//                             value={formik.values.email}
//                             onBlur={formik.handleBlur}
//                             style={inputStyle}
//                         />
//                         {formik.touched.email && formik.errors.email && (
//                             <p style={errorStyle}>{formik.errors.email}</p>
//                         )}
//                     </div>

//                     <div style={inputContainerStyle}>
//                         <input
//                             type="text"
//                             name="institute"
//                             placeholder="Institute"
//                             onChange={formik.handleChange}
//                             value={formik.values.institute}
//                             onBlur={formik.handleBlur}
//                             style={inputStyle}
//                         />
//                         {formik.touched.institute && formik.errors.institute && (
//                             <p style={errorStyle}>{formik.errors.institute}</p>
//                         )}
//                     </div>

//                     <div style={inputContainerStyle}>
//                         <input
//                             type="password"
//                             name="password"
//                             placeholder="Password"
//                             onChange={formik.handleChange}
//                             value={formik.values.password}
//                             onBlur={formik.handleBlur}
//                             style={inputStyle}
//                         />
//                         {formik.touched.password && formik.errors.password && (
//                             <p style={errorStyle}>{formik.errors.password}</p>
//                         )}
//                     </div>

//                     <div style={inputContainerStyle}>
//                         <input
//                             type="password"
//                             name="confirmPassword"
//                             placeholder="Confirm Password"
//                             onChange={formik.handleChange}
//                             value={formik.values.confirmPassword}
//                             onBlur={formik.handleBlur}
//                             style={inputStyle}
//                         />
//                         {formik.touched.confirmPassword && formik.errors.confirmPassword && (
//                             <p style={errorStyle}>{formik.errors.confirmPassword}</p>
//                         )}
//                     </div>

//                     <button
//                         type="submit"
//                         style={buttonStyle}
//                     >
//                         Sign Up
//                     </button>
//                 </form>

//                 <p style={footerTextStyle}>
//                     Already have an account?{" "}
//                     <Link to="/login" style={linkStyle}>
//                         Login
//                     </Link>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default Signup;