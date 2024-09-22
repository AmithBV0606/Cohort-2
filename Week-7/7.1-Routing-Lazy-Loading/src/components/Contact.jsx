import React from 'react'
import { useNavigate } from 'react-router-dom';

function Contact() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    }

  return (
    <div>
        <h1>Contact us : +91 6361670056</h1>
        <button onClick={handleClick}>Back to Home</button>
    </div>
  )
}

export default Contact;