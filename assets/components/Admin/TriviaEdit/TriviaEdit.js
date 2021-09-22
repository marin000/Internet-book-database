import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import './TriviaEdit.css';
import axios from 'axios';
import AdminHeader from '../AdminHeader/AdminHeader';
import { InputTextarea } from 'primereact/inputtextarea';

function TriviaEdit() {
    
    const id = useParams().id;
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [trivia, setTrivia] = useState([]);  
    const [formData, setFormData] = useState([]);
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        fetch(`https://localhost:8000/getTrivia/` + id, {mode: 'no-cors'})
        .then(res => res.json())
        .then(
            (result) => {
            setIsLoaded(true);
            setTrivia(result);
            },
            (error) => {
            setIsLoaded(true);
            setError(error);
            }
        )
    }, [])

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
            return errors;
        },
        onSubmit: (data) => {
            setFormData(data);
            setShowMessage(true);
            axios.post(`https://localhost:8000/editTrivia/` + id,data);
            window.location.reload()
        }
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const dialogFooter = <div className="p-d-flex p-jc-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;
    
    if (error) {
        return <div>Error: {error.message}</div>;
    } 
    else if (!isLoaded) {
        return <div>Loading...</div>;
    } 
    else{
        return(
            <Card>
            <div className="form-demo">
            <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                    <div className="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3">
                        <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                        <h5>Successful!</h5>
                        <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                            You have successfully updated trivia.
                        </p>
                    </div>
                </Dialog>

            <AdminHeader />
            <div className="p-d-flex p-jc-center">
                <div className="card">
                <Card>
                    <h3 className="p-text-center">Edit trivia</h3>
                    { trivia.Questions && trivia.Answer1 && trivia.Answer2 && trivia.Answer3 && trivia.Answer4 && trivia.Answer5 && trivia.Answer6 && trivia.Answer7 ?
                    <form onSubmit={formik.handleSubmit} className="p-fluid">
                        <h6>Name</h6>
                        <div className="p-field">
                            <span className="p-float-label">
                                <InputText id="name" name="name" placeholder={trivia.Name} value={formik.values.name} onChange={formik.handleChange} />
                            </span>
                        </div>
                        <h6>Question 1</h6>
                        <div className="p-field">
                            <span className="p-float-label">
                                <InputTextarea  id="question1" name="question1" rows={2} placeholder={trivia.Questions[0]} value={formik.values.question1} onChange={formik.handleChange} />
                            </span>
                        </div>
                        <h6>Correct 1</h6>
                        <div className="p-field-answer">
                            <span className="p-float-label">
                                <InputText id="correct1" name="correct1" placeholder={trivia.Answer1[0]} value={formik.values.correct1} onChange={formik.handleChange} />
                            </span>
                        </div>
                        <h6>Option 1.a)</h6>
                        <div className="p-field-answer">
                            <span className="p-float-label">
                                <InputText id="option1a" name="option1a" placeholder={trivia.Answer1[1]} value={formik.values.option1a} onChange={formik.handleChange} />
                            </span>
                        </div>
                        <h6>Option 1.b)</h6>
                        <div className="p-field-answer">
                            <span className="p-float-label">
                                <InputText id="option1b" name="option1b" placeholder={trivia.Answer1[2]} value={formik.values.option1b} onChange={formik.handleChange} />
                            </span>
                        </div>
                        <h6>Option 1.c)</h6>
                        <div className="p-field-answer">
                            <span className="p-float-label">
                                <InputText id="option1c" name="option1c" placeholder={trivia.Answer1[3]} value={formik.values.option1c} onChange={formik.handleChange} />
                            </span>
                        </div>
                        <h6>Question 2</h6>
                        <div className="p-field">
                            <span className="p-float-label">
                                <InputTextarea id="question2" name="question2" rows={2} placeholder={trivia.Questions[1]} value={formik.values.question2} onChange={formik.handleChange} />
                            </span>
                        </div>
                        <h6>Correct 2</h6>
                        <div className="p-field-answer">
                            <span className="p-float-label">
                                <InputText id="correct2" name="correct2" placeholder={trivia.Answer2[0]} value={formik.values.correct2} onChange={formik.handleChange} />
                            </span>
                        </div>
                        <h6>Option 2.a)</h6>
                        <div className="p-field-answer">
                            <span className="p-float-label">
                                <InputText id="option2a" name="option2a" placeholder={trivia.Answer2[1]} value={formik.values.option2a} onChange={formik.handleChange} />
                            </span>
                        </div>
                        <h6>Option 2.b)</h6>
                        <div className="p-field-answer">
                            <span className="p-float-label">
                                <InputText id="option2b" name="option2b" placeholder={trivia.Answer2[2]} value={formik.values.option2b} onChange={formik.handleChange} />
                            </span>
                        </div>
                        <h6>Option 2.c)</h6>
                        <div className="p-field-answer">
                            <span className="p-float-label">
                                <InputText id="option2c" name="option2c" placeholder={trivia.Answer2[3]} value={formik.values.option2c} onChange={formik.handleChange} />
                            </span>
                        </div>
                        <h6>Question 3</h6>
                        <div className="p-field">
                            <span className="p-float-label">
                                <InputTextarea id="question3" name="question3" rows={2} placeholder={trivia.Questions[2]} value={formik.values.question3} onChange={formik.handleChange} />
                            </span>
                        </div>
                        <h6>Correct 3</h6>
                        <div className="p-field-answer">
                            <span className="p-float-label">
                                <InputText id="correct3" name="correct3" placeholder={trivia.Answer3[0]} value={formik.values.correct3} onChange={formik.handleChange} />
                            </span>
                        </div>
                        <h6>Option 3.a)</h6>
                        <div className="p-field-answer">
                            <span className="p-float-label">
                                <InputText id="option3a" name="option3a" placeholder={trivia.Answer3[1]} value={formik.values.option3a} onChange={formik.handleChange} />
                            </span>
                        </div>
                        <h6>Option 3.b)</h6>
                        <div className="p-field-answer">
                            <span className="p-float-label">
                                <InputText id="option3b" name="option3b" placeholder={trivia.Answer3[2]} value={formik.values.option3b} onChange={formik.handleChange} />
                            </span>
                        </div>
                        <h6>Option 3.c)</h6>
                        <div className="p-field-answer">
                            <span className="p-float-label">
                                <InputText id="option3c" name="option3c" placeholder={trivia.Answer3[3]} value={formik.values.option3c} onChange={formik.handleChange} />
                            </span>
                        </div>
                        <h6>Question 4</h6>
                        <div className="p-field">
                            <span className="p-float-label">
                                <InputTextarea id="question4" name="question4" rows={2} placeholder={trivia.Questions[3]} value={formik.values.question4} onChange={formik.handleChange} />
                            </span>
                        </div>
                        <h6>Correct 4</h6>
                        <div className="p-field-answer">
                            <span className="p-float-label">
                                <InputText id="correct4" name="correct4" placeholder={trivia.Answer4[0]} value={formik.values.correct4} onChange={formik.handleChange} />
                            </span>
                        </div>
                        <h6>Option 4.a)</h6>
                        <div className="p-field-answer">
                            <span className="p-float-label">
                                <InputText id="option4a" name="option4a" placeholder={trivia.Answer4[1]} value={formik.values.option4a} onChange={formik.handleChange} />
                            </span>
                        </div>
                        <h6>Option 4.b)</h6>
                        <div className="p-field-answer">
                            <span className="p-float-label">
                                <InputText id="option4b" name="option4b" placeholder={trivia.Answer4[2]} value={formik.values.option4b} onChange={formik.handleChange} />
                            </span>
                        </div>
                        <h6>Option 4.c)</h6>
                        <div className="p-field-answer">
                            <span className="p-float-label">
                                <InputText id="option4c" name="option4c" placeholder={trivia.Answer4[3]} value={formik.values.option4c} onChange={formik.handleChange} />
                            </span>
                        </div>
                        <h6>Question 5</h6>
                        <div className="p-field">
                            <span className="p-float-label">
                                <InputTextarea id="question5" name="question5" rows={2} placeholder={trivia.Questions[4]} value={formik.values.question5} onChange={formik.handleChange} />
                            </span>
                        </div>
                        <h6>Answer 5</h6>
                        <div className="p-field">
                            <span className="p-float-label">
                                <InputText id="correct5" name="correct5" placeholder={trivia.Answer5} value={formik.values.correct5} onChange={formik.handleChange} />
                            </span>
                        </div>
                        <h6>Question 6</h6>
                        <div className="p-field">
                            <span className="p-float-label">
                                <InputTextarea id="question6" name="question6" rows={2} placeholder={trivia.Questions[5]} value={formik.values.question6} onChange={formik.handleChange} />
                            </span>
                        </div>
                        <h6>Answer 6</h6>
                        <div className="p-field">
                            <span className="p-float-label">
                                <InputText id="correct6" name="correct6" placeholder={trivia.Answer6} value={formik.values.correct6} onChange={formik.handleChange} />
                            </span>
                        </div>
                        <h6>Question 7</h6>
                        <div className="p-field">
                            <span className="p-float-label">
                                <InputTextarea id="question7" name="question7" rows={2} placeholder={trivia.Questions[6]} value={formik.values.question7} onChange={formik.handleChange} />
                            </span>
                        </div>
                        <h6>Answer 7</h6>
                        <div className="p-field">
                            <span className="p-float-label">
                                <InputText id="correct7" name="correct7" placeholder={trivia.Answer7} value={formik.values.correct7} onChange={formik.handleChange} />
                            </span>
                        </div>
                        <Button type="submit" label="Update" className="p-button-success" />
                    </form>
                    : ""}
                </Card>
                </div>
                </div>
            </div>
        </Card>
        );
    }
}
export default TriviaEdit;