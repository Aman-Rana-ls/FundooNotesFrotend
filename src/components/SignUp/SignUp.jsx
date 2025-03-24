import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import './SignUp.scss';
import {registerApiCall} from '../../utils/Api';

export default function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        username: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async () => {
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await registerApiCall(formData);
            if (response.data.success) {
                localStorage.setItem("username", formData.username); 
                navigate("/");
            } else {
                alert("Registration failed!");
            }
        } catch (error) {
            console.error("Error registering:", error);
        }
    };

    return (
        <div className="signup-page">
          <div className="signup-main-cnt">
            <div className="signup-form-cnt">
              <h2 className="signup-title">Fundo</h2>
              <h3>Create your Fundo Account</h3>
              <div className="signup-ip-field-cnt">
                <input type="text" name="firstName" placeholder="First Name*" required onChange={handleChange} />
                <input type="text" name="lastName" placeholder="Last Name*" required onChange={handleChange} />
              </div>
              <input type="text" name="username" placeholder="Username*" required onChange={handleChange} />
              <p className="signup-note">You can use letters, numbers & periods</p>
              <input type="email" name="email" placeholder="Email*" required onChange={handleChange} />
              <input type="password" name="password" placeholder="Password*" required onChange={handleChange} />
              <input type="password" name="confirmPassword" placeholder="Confirm Password*" required onChange={handleChange} />
              <p className="signup-note">Use 8 or more characters with a mix of letters, numbers & symbols</p>
              <div className="signup-bottom-cnt">
                <Link to="/" className="signup-link">Sign in instead</Link>
                <Button className="signup-btn" variant="contained" onClick={handleRegister}>Register</Button>
              </div>
            </div>
            <div className="signup-img-cnt">
              <img src="https://th.bing.com/th/id/OIP.AzVBy4UhLsIMai2sz78MNAHaEm?w=1200&h=745&rs=1&pid=ImgDetMain"
                alt="Fundo Signup" />
              <p>One account. All of Fundo working for you.</p>
            </div>
          </div>
        </div>
      );
      
}
