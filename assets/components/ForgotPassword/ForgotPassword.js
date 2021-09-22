import React, {useState, useEffect} from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { classNames } from 'primereact/utils';
import { Dialog } from 'primereact/dialog';
import './ForgotPassword.css';
import emailjs from 'emailjs-com';
import{ init } from 'emailjs-com';
init("user_gIQ4ijwqfK2ammqvRHJvz");

function ForgotPassword() {

    const [formData, setFormData] = useState({});
    const [emails,setEmails] = useState([]);
    const [error, setError] = useState(null);
    const [showMessage, setShowMessage] = useState(false);
    
    useEffect(() => {
        fetch(`https://localhost:8000/users/getMails/`)
          .then(res => res.json())
          .then(
            (result) => {
              setEmails(result);
            },
            (error) => {
              setError(error);
            }
          )
      }, [])


    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validate: (data) => {
            let errors = {};

            if (!data.email) {
                errors.email = 'Email is required.';
            }
            else if(!emails.includes(data.email)){
                errors.email = 'Email does not exist!';
            }
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
                errors.email = 'Invalid email address. E.g. example@email.com';
            }

            return errors;
        },
        //on submit get user password token and send email to user with link for reset password with that token
        onSubmit: (data) => {
            setFormData(data);
            formik.resetForm();   
            fetch(`https://localhost:8000/getPassToken/` + data.email)
                      .then(res => res.json())
                      .then(
                        (result) => {
                          sendEmail(data.email,result);  
            });         
        }
    });

    function sendEmail(email,passToken) {
        var templateParams = {
            email: email,
            token: passToken,
        };
         
        emailjs.send('service id', 'template id', templateParams)
            .then(function(response) {
               console.log('SUCCESS!', response.status, response.text);
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
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>Successful!</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        Link to reset password has been sent to your email address.
                    </p>
                </div>
        </Dialog>
        <div className="p-d-flex p-jc-center">
            <div className="card">
            <Card>
                <h3 className="p-text-center">Forgot Password</h3>
                <form onSubmit={formik.handleSubmit} className="p-fluid">
                    <div className="p-field">
                        <span className="p-float-label p-input-icon-right">
                            <i className="pi pi-envelope" />
                            <InputText id="email" name="email" value={formik.values.email} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('email') })} />
                            <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid('email') })}>Email*</label>
                        </span>
                        {getFormErrorMessage('email')}
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
export default ForgotPassword;