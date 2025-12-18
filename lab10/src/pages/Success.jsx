import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const SuccessPage = () => {
    const navigate = useNavigate();

    return (
        <div style={{ 
            textAlign: 'center', 
            padding: '50px', 
            maxWidth: '600px', 
            margin: '50px auto', 
            backgroundColor: '#e6ffe6',
            border: '1px solid #4CAF50',
            borderRadius: '8px'
        }}>
            <h2 style={{ color: '#4CAF50' }}>✅ Request Confirmed!</h2>
            <p style={{ fontSize: '1.1em', marginTop: '20px' }}>
                Your appointment request has been successfully sent to the selected expert(s).
            </p>
            <p>
                The experts will contact you shortly to confirm the details.
            </p>
            
            <div style={{ marginTop: '30px' }}>
                <Button 
                    text="Back to Home"
                    onClick={() => navigate('/')}
                    className="btn-primary" 
                />
            </div>
        </div>
    );
};

export default SuccessPage;