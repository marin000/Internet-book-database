import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { Divider } from 'primereact/divider';
import { Dialog } from 'primereact/dialog';
import './Login.css';

function Login() {

    const [formData, setFormData] = useState({});
    const history = useHistory();
    const [checkLogin, setCheckLogin] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate: (data) => {
            let errors = {};

            if (!data.email) {
                errors.email = 'Email is required.';
            }
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
                errors.email = 'Invalid email address. E.g. example@email.com';
            }

            if (!data.password) {
                errors.password = 'Password is required.';
            }

            return errors;
        },
        onSubmit: (data) => {
            setFormData(data);
            formik.resetForm();
            //check if email and password are valid
            fetch(`https://localhost:8000/users/checkLogin/` + data.email + `/`  +data.password)
            .then(res => res.json())
            .then(
              (result) => {
                  if (result===true) {
                      //if are valid get username and secret and store for react chat engine
                    fetch(`https://localhost:8000/getUserByEmail/` + data.email)
                    .then(res => res.json())
                    .then(
                      (result) => {
                          localStorage.setItem('username',result[0]);
                          localStorage.setItem('chatSecret',result[1]);
                          axios.post(`https://localhost:8000/login`,data);
                          setTimeout(function(){
                        window.location.reload(1);
                    }, 1000);
                    history.push('/');
                    });
                  }else{
                    setShowMessage(true);
                  }
              });

        }
    });


    function handleRegister(){
        history.push('/register');
    }

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };
    const dialogFooter = <div className="p-d-flex p-jc-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;

    return(
        <Card>
        <div className="form-demo">
            <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3">
                    <i className="pi pi-minus-circle" style={{ fontSize: '5rem', color: 'red' }}></i>
                    <h5>Fail to Log In!</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        Invalid e-mail or password.
                    </p>
                </div>
            </Dialog>

        <div className="p-d-flex p-jc-center">
            <div className="card">
            <Card>
                <h3 className="p-text-center">Log In</h3>
                <form onSubmit={formik.handleSubmit} className="p-fluid">
                    <div className="p-field">
                        <span className="p-float-label p-input-icon-right">
                            <i className="pi pi-envelope" />
                            <InputText id="email" name="email" value={formik.values.email} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('email') })} />
                            <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid('email') })}>Email*</label>
                        </span>
                        {getFormErrorMessage('email')}
                    </div>
                    <div className="p-field">
                        <span className="p-float-label">
                            <Password id="password" name="password" value={formik.values.password} onChange={formik.handleChange} toggleMask
                                className={classNames({ 'p-invalid': isFormFieldValid('password') })} feedback={false}/>
                            <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid('password') })}>Password*</label>
                        </span>
                        {getFormErrorMessage('password')}
                    </div>
                    <Button type="submit" label="Submit" className="p-mt-2" />
                </form>
                    <div className="forgot">
                        <a href= "/forgot">Forgot password?</a>
                    </div>
                <Divider />
                <div className="go-register">
                    <p>Don't have account?</p>
                    <Button className="p-button-info p-button" label="Register" onClick={handleRegister} />
                </div>
                </Card>
                </div>
            </div>
        </div>
    </Card>
    );
}
export default Login;