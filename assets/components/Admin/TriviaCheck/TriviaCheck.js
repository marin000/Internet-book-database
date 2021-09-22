import React,{useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import './TriviaCheck.css';
import AdminHeader from '../AdminHeader/AdminHeader';
import {  Link } from "react-router-dom";

//get all trivia in list

function TriviaCheck() {
    
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [trivia, setTrivia] = useState([]);  

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

    function deleteTrivia(rowData) {
        return <Button label="Delete" className="p-button-danger" onClick={()=>onClickDelete(rowData)}/>;
    }

    function onClickDelete(rowData) {
        fetch(`https://localhost:8000/deleteTrivia/` + rowData.id, {method: 'DELETE'});
        window.location.reload();
    }

    function publishTrivia(rowData) {
        return <Button label={rowData.Published===false ? "Publish" : "Unpublish"} onClick={()=>onClickPublish(rowData)}/>;
    }

    function onClickPublish(rowData) {
        fetch(`https://localhost:8000/publishTrivia/` + rowData.id, {method: 'POST'});
        window.location.reload();
    }

    function editTrivia(rowData) {
        return <Link to={`/admin/trivia/edit/${rowData.id}`}><Button label="Edit" className="p-button-info"/></Link>;
    }

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
                    <div className="header">
                        <h2><AdminHeader title={'Trivia list'} /></h2>
                    </div>
                    <Divider />
                    <div className="trivia-list">
                        <DataTable value={trivia} className="p-datatable-check" stripedRows>
                            <Column field='Name' header="Name"></Column>
                            <Column field='DateOfCreation' header="Date of creation"></Column>
                            <Column body={editTrivia} header=""></Column>
                            <Column body={publishTrivia} header=""></Column>
                            <Column body={deleteTrivia} header=""></Column>
                        </DataTable>
                    </div>
                </Card>
            </div>
        );
    }
}
export default TriviaCheck;