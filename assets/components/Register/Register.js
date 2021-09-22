import React, { useCallback, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { useHistory } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import axios from "axios";
import './Register.css';
import data from './countries.json';
import ageData from './age.json';

function Register() {

    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const [emails,setEmails] = useState([]);
    const [error, setError] = useState(null);
    const history = useHistory();
    const [countries, setCountries] = useState([]);
    const [age,setAge] = useState([]);
    const [usernames, setUsernames] = useState([]);

    useEffect(() => {
        setCountries(data.data);
        setAge(ageData.ageData);
    }, []);
    

    //get all mails and usernames from DB to check if mail from input already exist
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

    
      useEffect(() => {
        fetch(`https://localhost:8000/users/getUsernames/`)
          .then(res => res.json())
          .then(
            (result) => {
              setUsernames(result);
            },
            (error) => {
              setError(error);
            }
          )
      }, [])

    const formik = useFormik({
        initialValues: {
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            country: null,
            age: null,
            accept: false,
            chatSecret: ''
        },
        validate: (data) => {
            let errors = {};

            if (!data.username) {
                errors.username = 'Username is required.';
            }
            else if(usernames.includes(data.username)){
                errors.username = 'Username adress already exist!';
            }

            if (!data.firstName) {
                errors.firstName = 'First name is required.';
            }
            if (!data.lastName) {
                errors.lastName = 'Last name is required.';
            }

            if (!data.email) {
                errors.email = 'Email is required.';
            }
            else if(emails.includes(data.email)){
                errors.email = 'Email adress already exist!';
            }
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
                errors.email = 'Invalid email address. E.g. example@email.com';
            }

            if (!data.password) {
                errors.password = 'Password is required.';
            }
            if (data.country===null) {
                errors.country = 'Country is required.';
            }
            if (data.age===null) {
                errors.age = 'Age is required.';
            }

            if (!data.accept) {
                errors.accept = 'You need to agree to the terms and conditions.';
            }

            return errors;
        },
        //add user to DB and to react chat engine
        onSubmit: (data) => {
            data.chatSecret=data.username;
            setFormData(data);
            var chatData = {
                "username": data.username,
                "secret": data.username,
                "email": data.email,
                "first_name": data.firstName,
                "last_name": data.lastName,
            };
            setShowMessage(true);
            formik.resetForm();
            axios.post(`https://localhost:8000/users/new`,data);
            axios.post(`https://api.chatengine.io/users/`,chatData, {headers: {
                'PRIVATE-KEY': 'chat engine id'
            }});
        }
    });

    function onClickGoLogin(){
        history.push('/login');
    }

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const dialogFooter = <div className="p-d-flex p-jc-center"><Button label="OK" className="p-button-text" autoFocus onClick={onClickGoLogin} /></div>;
    const passwordHeader = <h6>Pick a password</h6>;
    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="p-mt-2">Suggestions</p>
            <ul className="p-pl-2 p-ml-2 p-mt-0" style={{ lineHeight: '1.5' }}>
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
            </ul>
        </React.Fragment>
    );


    return(
        <Card>
            <div className="form-demo">
            <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>Registration Successful!</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        Your account is registered under name <b>{formData.firstName + ' ' +formData.lastName}</b>.
                    </p>
                </div>
            </Dialog>

            <div className="p-d-flex p-jc-center">
                <div className="card">
                <Card>
                    <h3 className="p-text-center">Register</h3>
                    <form onSubmit={formik.handleSubmit} className="p-fluid">
                    <div className="p-field">
                            <span className="p-float-label">
                                <InputText id="username" name="username" value={formik.values.username} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('username') })} />
                                <label htmlFor="username" className={classNames({ 'p-error': isFormFieldValid('username') })}>Username*</label>
                            </span>
                            {getFormErrorMessage('username')}
                        </div>
                        <div className="p-field">
                            <span className="p-float-label">
                                <InputText id="firstName" name="firstName" value={formik.values.firstName} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('firstName') })} />
                                <label htmlFor="firstName" className={classNames({ 'p-error': isFormFieldValid('firstName') })}>First name*</label>
                            </span>
                            {getFormErrorMessage('firstName')}
                        </div>
                        <div className="p-field">
                            <span className="p-float-label">
                                <InputText id="lastName" name="lastName" value={formik.values.lastName} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('lastName') })} />
                                <label htmlFor="lastName" className={classNames({ 'p-error': isFormFieldValid('lastName') })}>Last name*</label>
                            </span>
                            {getFormErrorMessage('lastName')}
                        </div>
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
                                    className={classNames({ 'p-invalid': isFormFieldValid('password') })} header={passwordHeader} footer={passwordFooter} />
                                <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid('password') })}>Password*</label>
                            </span>
                            {getFormErrorMessage('password')}
                        </div>
                        <div className="p-field">
                            <span className="p-float-label">
                                <Dropdown id="country" name="country" value={formik.values.country} onChange={formik.handleChange} options={countries} optionLabel="name"
                                className={classNames({ 'p-invalid': isFormFieldValid('country') })} />
                                <label htmlFor="country" className={classNames({ 'p-error': isFormFieldValid('country') })}>Country</label>
                            </span>
                            {getFormErrorMessage('country')}
                        </div>
                        <div className="p-field">
                            <span className="p-float-label">
                                <Dropdown id="age" name="age" value={formik.values.age} onChange={formik.handleChange} options={age} optionLabel="name"
                                className={classNames({ 'p-invalid': isFormFieldValid('age') })} />
                                <label htmlFor="age" className={classNames({ 'p-error': isFormFieldValid('age') })}>Age</label>
                            </span>
                            {getFormErrorMessage('age')}
                        </div>
                        <div className="p-field-checkbox">
                            <Checkbox inputId="accept" name="accept" checked={formik.values.accept} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('accept') })} />
                            <label htmlFor="accept" className={classNames({ 'p-error': isFormFieldValid('accept') })}>I agree to the terms and conditions*</label>
                        </div>

                        <Button type="submit" label="Submit" className="p-mt-2" />
                    </form>
                    <Divider />
                    <div className="go-login">
                        <p>Already have an account? <a href= "/login">Sign In</a></p>
                    </div>
                    </Card>
                </div>
            </div>
        </div>
    </Card>
    );
}

export default Register;