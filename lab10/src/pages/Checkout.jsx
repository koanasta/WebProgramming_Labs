import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearFavorites } from '../redux/actions'; 
import FormError from '../components/FormError';
import Button from '../components/Button';
import Loader from '../components/Loader';

const CheckoutSchema = Yup.object().shape({

    fullName: Yup.string()
        .min(3, 'Full name must be at least 3 characters.')
        .max(50, 'Full name cannot exceed 50 characters.')
        .required('Full Name is a required field.'),
        
   
    email: Yup.string()
        .email('Email address is invalid.')
        .matches(
            /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i, 
            'Email format is incorrect (e.g., user@example.com) — requires letters, numbers, @, and domain.'
        )
        .required('Email is a required field.'),
        
    phone: Yup.string()
        .matches(
            /^\+?\d{10,15}$/, 
            'Phone number is invalid. Use 10-15 digits with an optional + at the start.'
        )
        .required('Phone number is a required field.'),

   
    budget: Yup.number()
        .typeError('Budget must be a number.')
        .required('Budget is a required field.')
        .min(100, 'Minimum budget for a request is $100.')
        .max(10000, 'Maximum budget is $10,000.'),
        
    preferredDate: Yup.date()
        .typeError('Preferred date must be a valid date.')
        .min(new Date(), 'Date must be in the future.')
        .required('Preferred date is a required field.'),

    note: Yup.string()
        .max(250, 'The note cannot exceed 250 characters.'),
});


const CheckoutPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const favorites = useSelector((state) => state.favorites.favorites);
    
    
    if (favorites.length === 0) {
        return (
            <div className="checkout-container" style={{ padding: '20px', textAlign: 'center' }}>
                <h2>Request Appointment</h2>
                <p>Your list of favorite contacts is empty. Please add contacts to proceed.</p>
                <Button text="Go to Catalog" onClick={() => navigate('/catalog')} className="btn-primary" />
            </div>
        );
    }

    const initialValues = {
        fullName: '',
        email: '',
        phone: '',
        budget: '',
        note: '',
        preferredDate: '',
    };

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        
        setTimeout(() => {
            console.log('Request submitted:', values, 'for contacts:', favorites.map(c => c.name));
            
           
            dispatch(clearFavorites());
            
            setSubmitting(false);
            resetForm();
            
            navigate('/success');
        }, 1500);
    };

    return (
        <div className="checkout-container" style={{ padding: '20px', maxWidth: '600px', margin: '20px auto', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h2 className="checkout-title">Request Appointment with Experts ({favorites.length})</h2>
            <p style={{marginBottom: '20px'}}>Please provide your contact details for the experts to reach out.</p>
            

            <Formik
                initialValues={initialValues}
                validationSchema={CheckoutSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, isSubmitting }) => (
                    <Form className="checkout-form">
                        
                        <div className="form-group" style={{ marginBottom: '15px' }}>
                            <label htmlFor="fullName">Full Name</label>
                            <Field name="fullName" type="text" className="form-input" style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                            {errors.fullName && touched.fullName ? (
                                <FormError>{errors.fullName}</FormError>
                            ) : null}
                        </div>

                        <div className="form-group" style={{ marginBottom: '15px' }}>
                            <label htmlFor="email">Email</label>
                            <Field name="email" type="email" className="form-input" style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                            {errors.email && touched.email ? (
                                <FormError>{errors.email}</FormError>
                            ) : null}
                        </div>
                        
                        <div className="form-group" style={{ marginBottom: '15px' }}>
                            <label htmlFor="phone">Phone Number</label>
                            <Field name="phone" type="text" className="form-input" placeholder="+380..." style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                            {errors.phone && touched.phone ? (
                                <FormError>{errors.phone}</FormError>
                            ) : null}
                        </div>

                        <div className="form-group" style={{ marginBottom: '15px' }}>
                            <label htmlFor="budget">Max Budget ($)</label>
                            <Field name="budget" type="number" className="form-input" style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                            {errors.budget && touched.budget ? (
                                <FormError>{errors.budget}</FormError>
                            ) : null}
                        </div>

                        <div className="form-group" style={{ marginBottom: '15px' }}>
                            <label htmlFor="preferredDate">Preferred Date</label>
                            <Field name="preferredDate" type="date" className="form-input" style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} /> 
                            {errors.preferredDate && touched.preferredDate ? (
                                <FormError>{errors.preferredDate}</FormError>
                            ) : null}
                        </div>

                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <label htmlFor="note">Additional Note (optional)</label>
                            <Field as="textarea" name="note" className="form-input" rows="3" style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                            {errors.note && touched.note ? (
                                <FormError>{errors.note}</FormError>
                            ) : null}
                        </div>


                        <Button 
                            text={isSubmitting ? 'Submitting...' : 'Confirm Request'}
                            type="submit" 
                            disabled={isSubmitting}
                            className="btn-primary" 
                        />
                        {isSubmitting && <Loader />}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CheckoutPage;