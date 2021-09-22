import React, {useState} from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import './TriviaCreate.css';
import axios from 'axios';
import AdminHeader from '../AdminHeader/AdminHeader';
import { InputTextarea } from 'primereact/inputtextarea';

//form for create new trivia

function TriviaCreate() {
    
    const [formData, setFormData] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [showMessageQuestion, setShowMessageQuestion] = useState(false);
    const [showMessageAnswer, setShowMessageAnswer] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: '',
            question1: '',correct1: '',option1a: '',option1b: '',option1c: '',
            question2: '',correct2: '',option2a: '',option2b: '',option2c: '',
            question3: '',correct3: '',option3a: '',option3b: '',option3c: '',
            question4: '',correct4: '',option4a: '',option4b: '',option4c: '',
            question5: '',correct5: '',
            question6: '', correct6: '',
            question7: '', correct7: ''        
        },
        validate: (data) => {
            let errors = {};

            if (!data.name) {
                errors.name = 'Name is required.';
            }
            return errors;
        },
        onSubmit: (data) => {
            if (!data.question1 || !data.question2 || !data.question3 || !data.question4 || !data.question5 || !data.question6 || !data.question7) {
                setShowMessageQuestion(true);
            }
            else if (!data.correct1 || !data.correct2 || !data.correct3 || !data.correct4 || !data.correct5 || !data.correct6 || !data.correct7
                || !data.option1a || !data.option1b || !data.option1c || !data.option2a || !data.option2b || !data.option2c 
                || !data.option3a || !data.option3b || !data.option3c || !data.option4a || !data.option4b || !data.option4c) {
                setShowMessageAnswer(true);
            }
            else{
                setFormData(data);
                setShowMessage(true);
                formik.resetForm();
                axios.post(`https://localhost:8000/trivia/createNew`,data);
            }
        }
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const dialogFooter = <div className="p-d-flex p-jc-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;
    const dialogFooterQuestion = <div className="p-d-flex p-jc-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessageQuestion(false)} /></div>;
    const dialogFooterAnswer = <div className="p-d-flex p-jc-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessageAnswer(false)} /></div>;

    return(
        <Card>
        <div className="form-demo">
        <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>Successful!</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        You create new trivia, to publish it go to trivia info page "Check all".
                    </p>
                </div>
            </Dialog>

            <Dialog visible={showMessageQuestion} onHide={() => setShowMessageQuestion(false)} position="top" footer={dialogFooterQuestion} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3">
                    <i className="pi pi-minus-circle" style={{ fontSize: '5rem', color: 'red' }}></i>
                    <h5>Invalid question!</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        Some question is missing!
                    </p>
                </div>
            </Dialog>
            <Dialog visible={showMessageAnswer} onHide={() => setShowMessageAnswer(false)} position="top" footer={dialogFooterAnswer} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3">
                    <i className="pi pi-minus-circle" style={{ fontSize: '5rem', color: 'red' }}></i>
                    <h5>Invalid answer!</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        Some answer is missing!
                    </p>
                </div>
            </Dialog>

        <AdminHeader />
        <div className="p-d-flex p-jc-center">
            <div className="card">
            <Card>
                <h3 className="p-text-center">Create new trivia</h3>
                <form onSubmit={formik.handleSubmit} className="p-fluid">
                    <div className="p-field">
                        <span className="p-float-label">
                            <InputText id="name" name="name" value={formik.values.name} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('name') })} />
                            <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid('name') })}>Name*</label>
                        </span>
                        {getFormErrorMessage('name')}
                    </div>
                    <div className="p-field">
                        <span className="p-float-label">
                            <InputTextarea id="question1" name="question1" rows={2} value={formik.values.question1} onChange={formik.handleChange} />
                            <label htmlFor="question1" >Question 1*</label>
                        </span>
                    </div>
                    <div className="p-field-answer">
                        <span className="p-float-label">
                            <InputText id="correct1" name="correct1" value={formik.values.correct1} onChange={formik.handleChange} />
                            <label htmlFor="correct1" >Correct 1*</label>
                        </span>
                    </div>
                    <div className="p-field-answer">
                        <span className="p-float-label">
                            <InputText id="option1a" name="option1a" value={formik.values.option1a} onChange={formik.handleChange} />
                            <label htmlFor="option1a" >Option 1.a)*</label>
                        </span>
                    </div>
                    <div className="p-field-answer">
                        <span className="p-float-label">
                            <InputText id="option1b" name="option1b" value={formik.values.option1b} onChange={formik.handleChange} />
                            <label htmlFor="option1b" >Option 1.b)*</label>
                        </span>
                    </div>
                    <div className="p-field-answer">
                        <span className="p-float-label">
                            <InputText id="option1c" name="option1c" value={formik.values.option1c} onChange={formik.handleChange} />
                            <label htmlFor="option1c" >Option 1.c)*</label>
                        </span>
                    </div>
                    <div className="p-field">
                        <span className="p-float-label">
                            <InputTextarea id="question2" name="question2" rows={2} value={formik.values.question2} onChange={formik.handleChange} />
                            <label htmlFor="question2" >Question 2*</label>
                        </span>
                    </div>
                    <div className="p-field-answer">
                        <span className="p-float-label">
                            <InputText id="correct2" name="correct2" value={formik.values.correct2} onChange={formik.handleChange} />
                            <label htmlFor="correct2" >Correct 2*</label>
                        </span>
                    </div>
                    <div className="p-field-answer">
                        <span className="p-float-label">
                            <InputText id="option2a" name="option2a" value={formik.values.option2a} onChange={formik.handleChange} />
                            <label htmlFor="option2a" >Option 2.a)*</label>
                        </span>
                    </div>
                    <div className="p-field-answer">
                        <span className="p-float-label">
                            <InputText id="option2b" name="option2b" value={formik.values.option2b} onChange={formik.handleChange} />
                            <label htmlFor="option2b" >Option 2.b)*</label>
                        </span>
                    </div>
                    <div className="p-field-answer">
                        <span className="p-float-label">
                            <InputText id="option2c" name="option2c" value={formik.values.option2c} onChange={formik.handleChange} />
                            <label htmlFor="option2c" >Option 2.c)*</label>
                        </span>
                    </div>
                    <div className="p-field">
                        <span className="p-float-label">
                            <InputTextarea id="question3" name="question3" rows={2} value={formik.values.question3} onChange={formik.handleChange} />
                            <label htmlFor="question3" >Question 3*</label>
                        </span>
                    </div>
                    <div className="p-field-answer">
                        <span className="p-float-label">
                            <InputText id="correct3" name="correct3" value={formik.values.correct3} onChange={formik.handleChange} />
                            <label htmlFor="correct3" >Correct 3*</label>
                        </span>
                    </div>
                    <div className="p-field-answer">
                        <span className="p-float-label">
                            <InputText id="option3a" name="option3a" value={formik.values.option3a} onChange={formik.handleChange} />
                            <label htmlFor="option3a" >Option 3.a)*</label>
                        </span>
                    </div>
                    <div className="p-field-answer">
                        <span className="p-float-label">
                            <InputText id="option3b" name="option3b" value={formik.values.option3b} onChange={formik.handleChange} />
                            <label htmlFor="option3b" >Option 3.b)*</label>
                        </span>
                    </div>
                    <div className="p-field-answer">
                        <span className="p-float-label">
                            <InputText id="option3c" name="option3c" value={formik.values.option3c} onChange={formik.handleChange} />
                            <label htmlFor="option3c" >Option 3.c)*</label>
                        </span>
                    </div>
                    <div className="p-field">
                        <span className="p-float-label">
                            <InputTextarea id="question4" name="question4" rows={2} value={formik.values.question4} onChange={formik.handleChange} />
                            <label htmlFor="question4" >Question 4*</label>
                        </span>
                    </div>
                    <div className="p-field-answer">
                        <span className="p-float-label">
                            <InputText id="correct4" name="correct4" value={formik.values.correct4} onChange={formik.handleChange} />
                            <label htmlFor="correct4" >Correct 4*</label>
                        </span>
                    </div>
                    <div className="p-field-answer">
                        <span className="p-float-label">
                            <InputText id="option4a" name="option4a" value={formik.values.option4a} onChange={formik.handleChange} />
                            <label htmlFor="option4a" >Option 4.a)*</label>
                        </span>
                    </div>
                    <div className="p-field-answer">
                        <span className="p-float-label">
                            <InputText id="option4b" name="option4b" value={formik.values.option4b} onChange={formik.handleChange} />
                            <label htmlFor="option4b" >Option 4.b)*</label>
                        </span>
                    </div>
                    <div className="p-field-answer">
                        <span className="p-float-label">
                            <InputText id="option4c" name="option4c" value={formik.values.option4c} onChange={formik.handleChange} />
                            <label htmlFor="option4c" >Option 4.c)*</label>
                        </span>
                    </div>
                    <div className="p-field">
                        <span className="p-float-label">
                            <InputTextarea id="question5" name="question5" rows={2} value={formik.values.question5} onChange={formik.handleChange} />
                            <label htmlFor="question5" >Question 5*</label>
                        </span>
                    </div>
                    <div className="p-field">
                        <span className="p-float-label">
                            <InputText id="correct5" name="correct5" value={formik.values.correct5} onChange={formik.handleChange} />
                            <label htmlFor="correct5" >Correct 5*</label>
                        </span>
                    </div>
                    <div className="p-field">
                        <span className="p-float-label">
                            <InputTextarea id="question6" name="question6" rows={2} value={formik.values.question6} onChange={formik.handleChange} />
                            <label htmlFor="question6" >Question 6*</label>
                        </span>
                    </div>
                    <div className="p-field">
                        <span className="p-float-label">
                            <InputText id="correct6" name="correct6" value={formik.values.correct6} onChange={formik.handleChange} />
                            <label htmlFor="correct6" >Correct 6*</label>
                        </span>
                    </div>
                    <div className="p-field">
                        <span className="p-float-label">
                            <InputTextarea id="question7" name="question7" rows={2} value={formik.values.question7} onChange={formik.handleChange} />
                            <label htmlFor="question7" >Question 7*</label>
                        </span>
                    </div>
                    <div className="p-field">
                        <span className="p-float-label">
                            <InputText id="correct7" name="correct7" value={formik.values.correct7} onChange={formik.handleChange} />
                            <label htmlFor="correct7" >Correct 7*</label>
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

export default TriviaCreate;