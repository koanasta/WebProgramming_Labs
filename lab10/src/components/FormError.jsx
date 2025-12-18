
import React from 'react';

const FormError = ({ children }) => {
    if (!children) return null;
    
    return (
        <div style={{ color: 'red', marginTop: '5px', fontSize: '0.9em' }}>
            {children}
        </div>
    );
};

export default FormError;