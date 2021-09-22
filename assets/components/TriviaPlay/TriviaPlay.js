import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { Card } from 'primereact/card';
import { RadioButton } from 'primereact/radiobutton';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useHistory } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import './TriviaPlay.css';

function TriviaPlay() {
    
    const id = useParams().id;
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [trivia, setTrivia] = useState([]);  
    const history = useHistory();
    const [answer1, setAnswer1] = useState(null);
    const [answer2, setAnswer2] = useState(null);
    const [answer3, setAnswer3] = useState(null);
    const [answer4, setAnswer4] = useState(null);
    const [answer5, setAnswer5] = useState('');
    const [answer6, setAnswer6] = useState('');
    const [answer7, setAnswer7] = useState('');
    const [hideCorrect, setHideCorrect] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [showMessageStart, setShowMessageStart] = useState(true);
    const [finalPoints, setFinalPoints] = useState(null);
    var points = 0;

    const [seconds, setSeconds] = useState(60);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval = null;
        if(isActive && seconds===0){
            finishTrivia();
        }
        if (isActive) {
          interval = setInterval(() => {
            setSeconds(seconds => seconds - 1);
          }, 1000);
        } else if (!isActive && seconds !== 0) {
          clearInterval(interval);
        }
        return () => clearInterval(interval);
      }, [isActive, seconds]);

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

    function finishTrivia() {
        setIsActive(false);
        if (answer1===trivia.Answer1[0]) {
            points = points + 3;
        }
        if (answer2===trivia.Answer2[0]) {
            points = points + 3;
        }
        if (answer3===trivia.Answer3[0]) {
            points = points + 3;
        }
        if (answer4===trivia.Answer4[0]) {
            points = points + 3;
        }
        answer5.toLowerCase();
        answer6.toLowerCase();
        answer7.toLowerCase();
        const correct5 = trivia.Answer5.toLowerCase().split(",");
        const correct6 = trivia.Answer6.toLowerCase().split(",");
        const correct7 = trivia.Answer7.toLowerCase().split(",");
        if (correct5.includes(answer5)) {
            points= points+5;
        }
        if (correct6.includes(answer6)) {
            points=points+5;
        }
        if (correct7.includes(answer7)) {
            points=points+5;
        }
        setFinalPoints(points);
        setShowMessage(true);
        setHideCorrect(true);
        fetch(`https://localhost:8000/saveTriviaPoints/` + id + `/` + points, {method: 'POST'});
    }

    function start() {
        setShowMessageStart(false); 
        setIsActive(!isActive);
    }

    const dialogFooter = <div className="p-d-flex p-jc-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;
    const dialogFooter2 = <div className="p-d-flex p-jc-center"><Button label="OK" className="p-button-text" autoFocus onClick={start} /></div>;


    if (error) {
        return <div>Error: {error.message}</div>;
    } 
    else if (!isLoaded) {
        return <div>Loading...</div>;
    } 
    else{
        return(
            <div>
                <div className="time">
                    {seconds}s
                </div>
                { trivia.Questions && trivia.Answer1 && trivia.Answer2 && trivia.Answer3 && trivia.Answer4 && trivia.Answer5 && trivia.Answer6 && trivia.Answer7 ?
                <Card>
                    <Dialog visible={showMessageStart} onHide={() => setShowMessageStart(false)} position="top" footer={dialogFooter2} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                        <div className="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3">
                            <i className="pi pi-question" style={{ fontSize: '5rem', color: 'blue' }}></i>
                            <h4>Trivia</h4>
                            <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                                You have 7 questions. The first 4 have 3 points each and the remaining 3 questions have 5 points each.
                                You also have 60 seconds to answer questions.
                            </p>
                        </div>
                    </Dialog>

                    <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                        <div className="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3">
                            <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'green' }}></i>
                            <h2>{finalPoints} /27 points</h2>
                        </div>
                    </Dialog>

                    <div className="triviaPlay-header">
                        <h2>{trivia.Name}</h2>
                    </div>
                    <Divider />
                    <div className="triviaPlay-question">
                        1. {trivia.Questions[0]}
                    </div>
                    <div className="triviaPlay-answer-radio">
                        <div className="p-field-radiobutton">
                            <RadioButton inputId="answer1a" name="answer1" value={trivia.Answer1[1]} onChange={(e) => setAnswer1(e.value)} checked={answer1 === trivia.Answer1[1]} />
                            <label htmlFor="answer1a">1.a) {trivia.Answer1[1]} </label>
                        </div>
                        <div className="p-field-radiobutton">
                            <RadioButton inputId="answer1b" name="answer1" value={trivia.Answer1[2]} onChange={(e) => setAnswer1(e.value)} checked={answer1 === trivia.Answer1[2]} />
                            <label htmlFor="answer1b">1.b) {trivia.Answer1[2]}</label>
                        </div>
                        <div className="p-field-radiobutton">
                            <RadioButton inputId="answer1c" name="answer1" value={trivia.Answer1[3]} onChange={(e) => setAnswer1(e.value)} checked={answer1 === trivia.Answer1[3]} />
                            <label htmlFor="answer1c">1.c) {trivia.Answer1[3]}</label>
                        </div>
                        {hideCorrect ?
                            <div className="triviaPlay-correct">
                                Correct answer: {trivia.Answer1[0]}
                            </div>
                        : ""}
                    </div>
                    <Divider />
                    <div className="triviaPlay-question">
                        2. {trivia.Questions[1]}
                    </div>
                    <div className="triviaPlay-answer-radio">
                        <div className="p-field-radiobutton">
                            <RadioButton inputId="answer2a" name="answer2" value={trivia.Answer2[1]} onChange={(e) => setAnswer2(e.value)} checked={answer2 === trivia.Answer2[1]} />
                            <label htmlFor="answer2a">2.a) {trivia.Answer2[1]}</label>
                        </div>
                        <div className="p-field-radiobutton">
                            <RadioButton inputId="answer2b" name="answer2" value={trivia.Answer2[2]} onChange={(e) => setAnswer2(e.value)} checked={answer2 === trivia.Answer2[2]} />
                            <label htmlFor="answer2b">2.b) {trivia.Answer2[2]}</label>
                        </div>
                        <div className="p-field-radiobutton">
                            <RadioButton inputId="answer2c" name="answer2" value={trivia.Answer2[3]} onChange={(e) => setAnswer2(e.value)} checked={answer2 === trivia.Answer2[3]} />
                            <label htmlFor="answer2c">2.c) {trivia.Answer2[3]}</label>
                        </div>
                        {hideCorrect ?
                            <div className="triviaPlay-correct">
                                Correct answer: {trivia.Answer2[0]}
                            </div>
                        : ""}
                    </div>
                    <Divider />
                    <div className="triviaPlay-question">
                        3. {trivia.Questions[2]}
                    </div>
                    <div className="triviaPlay-answer-radio">
                        <div className="p-field-radiobutton">
                            <RadioButton inputId="answer3a" name="answer3" value={trivia.Answer3[1]} onChange={(e) => setAnswer3(e.value)} checked={answer3 === trivia.Answer3[1]} />
                            <label htmlFor="answer3a">3.a) {trivia.Answer3[1]}</label>
                        </div>
                        <div className="p-field-radiobutton">
                            <RadioButton inputId="answer3b" name="answer3" value={trivia.Answer3[2]} onChange={(e) => setAnswer3(e.value)} checked={answer3 === trivia.Answer3[2]} />
                            <label htmlFor="answer3b">3.b) {trivia.Answer3[2]}</label>
                        </div>
                        <div className="p-field-radiobutton">
                            <RadioButton inputId="answer3c" name="answer3" value={trivia.Answer3[3]} onChange={(e) => setAnswer3(e.value)} checked={answer3 === trivia.Answer3[3]} />
                            <label htmlFor="answer3c">3.c) {trivia.Answer3[3]}</label>
                        </div>
                        {hideCorrect ?
                            <div className="triviaPlay-correct">
                                Correct answer: {trivia.Answer3[0]}
                            </div>
                        : ""}
                    </div>
                    <Divider />
                    <div className="triviaPlay-question">
                        4. {trivia.Questions[3]}
                    </div>
                    <div className="triviaPlay-answer-radio">
                        <div className="p-field-radiobutton">
                            <RadioButton inputId="answer4a" name="answer4" value={trivia.Answer4[1]} onChange={(e) => setAnswer4(e.value)} checked={answer4 === trivia.Answer4[1]} />
                            <label htmlFor="answer4a">4.a) {trivia.Answer4[1]}</label>
                        </div>
                        <div className="p-field-radiobutton">
                            <RadioButton inputId="answer4b" name="answer4" value={trivia.Answer4[2]} onChange={(e) => setAnswer4(e.value)} checked={answer4 === trivia.Answer4[2]} />
                            <label htmlFor="answer4b">4.b) {trivia.Answer4[2]}</label>
                        </div>
                        <div className="p-field-radiobutton">
                            <RadioButton inputId="answer4c" name="answer4" value={trivia.Answer4[3]} onChange={(e) => setAnswer4(e.value)} checked={answer4 === trivia.Answer4[3]} />
                            <label htmlFor="answer4c">4.c) {trivia.Answer4[3]}</label>
                        </div>
                        {hideCorrect ?
                            <div className="triviaPlay-correct">
                                Correct answer: {trivia.Answer4[0]}
                            </div>
                        : ""}
                    </div>
                    <Divider />
                    <div className="triviaPlay-question">
                        5. {trivia.Questions[4]}
                    </div>
                    <div className="triviaPlay-answer-input">
                        <InputText value={answer5} onChange={(e) => setAnswer5(e.target.value)} />
                    </div>
                    {hideCorrect ?
                            <div className="triviaPlay-correct">
                                Correct answer: {trivia.Answer5.split(",")[0]}
                            </div>
                        : ""}
                    <Divider />
                    <div className="triviaPlay-question">
                        6. {trivia.Questions[5]}
                    </div>
                    <div className="triviaPlay-answer-input">
                        <InputText value={answer6} onChange={(e) => setAnswer6(e.target.value)} />
                    </div>
                    {hideCorrect ?
                            <div className="triviaPlay-correct">
                                Correct answer: {trivia.Answer6.split(",")[0]}
                            </div>
                        : ""}
                    <Divider />
                    <div className="triviaPlay-question">
                        7. {trivia.Questions[6]}
                    </div>
                    <div className="triviaPlay-answer-input">
                        <InputText value={answer7} onChange={(e) => setAnswer7(e.target.value)} />
                    </div>
                    {hideCorrect ?
                            <div className="triviaPlay-correct">
                                Correct answer: {trivia.Answer7.split(",")[0]}
                            </div>
                        : ""}
                    <Divider />
                    {hideCorrect===false ?
                    <div className="triviaPlay-button">
                        <Button label="Finish" className="p-button-success p-button-lg" onClick={finishTrivia} />
                    </div>
                    : ""}
                </Card>
                : "" }
            </div>
        );
    }
}

export default TriviaPlay;