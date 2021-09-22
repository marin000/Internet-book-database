import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';import './MeetingsNew.css';
import { Card } from 'primereact/card';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

//create new meeting
function MeetingsNew() {
    
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            name: '',
            dateTime: null,
            description: ''
        },
        validate: (data) => {
            let errors = {};

            if (!data.name) {
                errors.name = 'Name is required.';
            }
            if (!data.dateTime) {
                errors.dateTime = 'Please set date and time.';
            }

            return errors;
        },
        onSubmit: (data) => {
            setFormData(data);
            setShowMessage(true);
            console.log(data.dateTime.toLocaleString().slice(0,-3));
            formik.resetForm();
            const meetData = {
                'name': data.name,
                'dateTime': data.dateTime.toLocaleString().slice(0,-3),
                'description': data.description
            }
            axios.post(`https://localhost:8000/meetings/new`,meetData);
        }
    });

    function onClickRedirect(e) {
        e.preventDefault();
        setShowMessage(false);
        history.push('/user/events/meetings/enterRoom');
    }

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const dialogFooter = <div className="p-d-flex p-jc-center"><Button label="OK" className="p-button-text" autoFocus onClick={onClickRedirect} /></div>;

    return (
        <Card>
        <div className="form-demo-meeting">
            <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'green' }}></i>
                    <h5>Successful</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        Your have successfully created new meeting.
                    </p>
                </div>
            </Dialog>

            <div className="p-d-flex p-jc-center">
                <div className="card">
                    <Card>
                    <h3 className="p-text-center">Create new meeting</h3>
                    <form onSubmit={formik.handleSubmit} className="p-fluid">
                        <div className="p-field-meeting">
                            <span className="p-float-label">
                                <InputText id="name" name="name" value={formik.values.name} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('name') })} />
                                <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid('name') })}>Name*</label>
                            </span>
                            {getFormErrorMessage('name')}
                        </div>
                        <div className="p-field-meeting">
                            <span className="p-float-label">
                                <Calendar id="dateTime" name="dateTime" value={formik.values.dateTime} onChange={formik.handleChange} showTime className={classNames({ 'p-invalid': isFormFieldValid('dateTime') })}/>
                                <label htmlFor="dateTime" className={classNames({ 'p-error': isFormFieldValid('dateTime') })}>Date and Time*</label>
                            </span>
                        </div>
                        <div className="p-field-meeting">
                            <span className="p-float-label">
                                <InputTextarea id="description" name="description" rows={5} value={formik.values.description} onChange={formik.handleChange} />
                                <label htmlFor="description">Description*</label>
                            </span>
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
export default MeetingsNew;