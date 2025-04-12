import React, { useState } from 'react';
//simport './LoginSignup.css'; // Create or customize your CSS as needed

const LoginSignup = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(false); // false => show sign up form
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const toggleForm = () => {
    setIsLogin(prev => !prev);
    setError('');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!isLogin) {
      // Sign up flow: require a name.
      if (!formData.name) {
        setError("Name is required for sign up.");
        return;
      }
      // Simulate a successful signup. In a real application, call your signup endpoint.
      alert("Signup successful! Please log in with your credentials.");
      // Clear name (or all fields as needed) and switch to login mode.
      setFormData({ ...formData, name: '', password: '' });
      setIsLogin(true);
    } else {
      // Login flow
      if (formData.email && formData.password) {
        // In a real application, replace this logic with an API call.
        localStorage.setItem('token', 'dummy_token');
        localStorage.setItem('user', JSON.stringify({ email: formData.email }));
        onLoginSuccess();
      } else {
        setError("Please enter email and password.");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <div className="error">{error}</div>}
          <button type="submit" className="submit-btn">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p className="toggle-text">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span onClick={toggleForm} className="toggle-link">
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginSignup; 