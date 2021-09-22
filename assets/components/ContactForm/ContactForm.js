import React, {useState} from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { classNames } from 'primereact/utils';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import './ContactForm.css';
import emailjs from 'emailjs-com';
import{ init } from 'emailjs-com';
init("user_gIQ4ijwqfK2ammqvRHJvz");

function ContactForm() {

    const [formData, setFormData] = useState({});
    const [showMessage, setShowMessage] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            text: ''
        },
        validate: (data) => {
            let errors = {};

            if (!data.email) {
                errors.email = 'Email is required.';
            }
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
                errors.email = 'Invalid email address. E.g. example@email.com';
            }

            if(!data.text){
                errors.text = 'Message is missing.';
            }

            return errors;
        },
        //on submit send user message to admin
        onSubmit: (data) => {
            setFormData(data);
            formik.resetForm();   
            sendEmail(data.email,data.text);       
        }
    });

    function sendEmail(email,text) {
        var templateParams = {
            email: email,
            text: text,
        };
         
        emailjs.send('emailjs service id', 'template id', templateParams)
            .then(function(response) {
               console.log('SUCCESS!', response.status, response.text);
               setShowMessage(true);
            }, function(error) {
               console.log('FAILED...', error);
            });
    }

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };
    const dialogFooter = <div className="p-d-flex p-jc-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;


    
    return (
        <Card>
        <div className="form-demo">
        <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'green' }}></i>
                    <h5>Successful!</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        Your message has been sent successfully.
                    </p>
                </div>
        </Dialog>

        <div className="p-d-flex p-jc-center">
            <div className="card">
            <Card>
                <h3 className="p-text-center">Contact us</h3>
                <form onSubmit={formik.handleSubmit} className="p-fluid">
                    <div className="p-field">
                        <span className="p-float-label p-input-icon-right">
                            <i className="pi pi-envelope" />
                            <InputText id="email" name="email" value={formik.values.email} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('email') })} />
                            <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid('email') })}>Your Email*</label>
                        </span>
                        {getFormErrorMessage('email')}
                    </div>
                    <div className="p-field">
                        <span className="p-float-label">
                            <InputTextarea id="text" name="text" rows={7} cols={30} value={formik.values.text} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('text') })} />
                            <label htmlFor="text" className={classNames({ 'p-error': isFormFieldValid('text') })}>Message*</label>
                        </span>
                        {getFormErrorMessage('text')}
                    </div>                    
                    <Button type="submit" label="Submit" className="p-mt-2" />
                </form>
                </Card>
                </div>
            </div>
        </div>
    </Card>
    );
}
export default ContactForm;