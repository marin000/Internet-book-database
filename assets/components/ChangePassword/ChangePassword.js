import React, {useState} from 'react';
import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { Divider } from 'primereact/divider';
import { Dialog } from 'primereact/dialog';
import './ChangePassword.css';

function ChangePassword() {

    const [formData, setFormData] = useState({});
    const history = useHistory();
    const [showMessage, setShowMessage] = useState(false);
    
    const formik = useFormik({
        initialValues: {
            password: '',
            repeatPass: '',
        },
        validate: (data) => {
            let errors = {};

            if (!data.password) {
                errors.password = 'Enter new password.';
            }
            if (!data.repeatPass) {
                errors.repeatPass = 'Confirm new password.';
            }
            
            if(data.password!==data.repeatPass){
                errors.repeatPass = 'Passwords do not match.'
            }

            return errors;
        },
        //on submit update password and logout user
        onSubmit: (data) => {
            setFormData(data);
            formik.resetForm();
            setShowMessage(true);
            axios.post(`https://localhost:8000/users/update`,data);
            axios.get(`https://localhost:8000/logout`);
        }
    });

    function onClickGoLogin(){
        setTimeout(function(){
            window.location.reload(1);
        }, 1000);
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
                    Your password has been successfully changed. You need to log in again.
                </p>
            </div>
        </Dialog>
        <div className="p-d-flex p-jc-center">
            <div className="card">
            <Card>
                <h3 className="p-text-center">Change password</h3>
                <form onSubmit={formik.handleSubmit} className="p-fluid">
                    <div className="p-field">
                        <span className="p-float-label">
                            <Password id="password" name="password" value={formik.values.password} onChange={formik.handleChange} toggleMask
                                 header={passwordHeader} footer={passwordFooter} className={classNames({ 'p-invalid': isFormFieldValid('password') })} feedback={false}/>
                            <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid('password') })}>New password*</label>
                        </span>
                        {getFormErrorMessage('password')}
                    </div>
                    <div className="p-field">
                        <span className="p-float-label">
                            <Password id="repeatPass" name="repeatPass" value={formik.values.repeatPass} onChange={formik.handleChange} toggleMask
                                className={classNames({ 'p-invalid': isFormFieldValid('repeatPass') })} feedback={false}/>
                            <label htmlFor="repeatPass" className={classNames({ 'p-error': isFormFieldValid('repeatPass') })}>Confirm new password*</label>
                        </span>
                        {getFormErrorMessage('repeatPass')}
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

export default ChangePassword;