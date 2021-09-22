import React,{useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';import './Trivia.css';
import { Divider } from 'primereact/divider';
import { useHistory, Link } from "react-router-dom";
import { Dialog } from 'primereact/dialog';

//user can see list of all trivia and choose to play or view rankings

function Trivia() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [trivia, setTrivia] = useState([]);  
    const [showMessage, setShowMessage] = useState(false);
    const history = useHistory();

    useEffect(() => {
        fetch(`https://localhost:8000/trivia/getAll`, {mode: 'no-cors'})
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

    const filterTrivia = trivia.filter(trivia => trivia.Published===true);


    function playTrivia(rowData) {
        return <Button label="Play" onClick={()=>onClickPlay(rowData)}/>
    }

    function onClickPlay(rowData) {
        fetch(`https://localhost:8000/checkUserPlayTrivia/` + rowData.id)
            .then(res => res.json())
            .then(
              (result) => {
                  if (result===true) {
                      setShowMessage(true);
                  }else{
                    history.push(`/user/events/trivia/play/${rowData.id}`);
                  }
                });
    }

    function seeRankings(rowData) {
        return <Link to={`/user/events/trivia/rankings/${rowData.id}/${rowData.Name}`}><Button label="Rankings" className="p-button-secondary" /></Link>;
    }
    
    const dialogFooter = <div className="p-d-flex p-jc-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;

    if (error) {
        return <div>Error: {error.message}</div>;
    } 
    else if (!isLoaded) {
        return <div>Loading...</div>;
    } 
    else{
        return(
            <div>
                <Card>
                <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                        <div className="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3">
                            <i className="pi pi-ban" style={{ fontSize: '5rem', color: 'red' }}></i>
                            <h4>You already play this trivia!</h4>
                        </div>
                    </Dialog>

                    <div className="header">
                        <h2>Trivia</h2>
                    </div>
                    <Divider />
                    <div className="user-trivia">
                        <DataTable value={filterTrivia} className="p-datatable-user-trivia" stripedRows>
                            <Column field='Name' header="Name"></Column>
                            <Column field="DateOfCreation" header="Published date"></Column>
                            <Column body={playTrivia} header=""></Column>
                            <Column body={seeRankings} header=""></Column>
                        </DataTable>
                    </div>
                </Card>
            </div>
        );
    }
}
export default Trivia;