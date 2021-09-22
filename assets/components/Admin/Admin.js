import React,{useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import './Admin.css';
import AdminHeader from './AdminHeader/AdminHeader';

//get list of all users

function Admin() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [users, setUsers] = useState([]);  
    const [selectedRole, setSelectedRole] = useState(null);
    const [userId,setUserId] = useState(null);

    const roles = [
        { name: 'Admin', code: 'ADM' },
        { name: 'Organizer', code: 'ORG' },
        { name: 'User', code: 'USR' }
    ];

    useEffect(() => {
        fetch(`https://localhost:8000/users/getAll`, {mode: 'no-cors'})
        .then(res => res.json())
        .then(
            (result) => {
            setIsLoaded(true);
            setUsers(result);
            },
            (error) => {
            setIsLoaded(true);
            setError(error);
            }
        )
    }, [])

    function deleteUser(rowData, column) {
        return <Button label="Delete" className="p-button-danger p-button-sm" onClick={()=>onClickDelete(rowData)}/>;
    }

    function onClickDelete(rowData) {
        fetch(`https://localhost:8000/deleteUser/` + rowData.id, {method: 'DELETE'});
        window.location.reload();
    }

    const onRoleChange = (e) => {
        setSelectedRole(e.value);
        setUserId(parseInt(e.target.id));
    }

    function onClickSaveRole() {
        fetch(`https://localhost:8000/updateUserRole/` + userId + `/` + selectedRole['name'], {method: 'POST'});
        window.location.reload();
    }

    function selectRole(rowData) {
        return <div className="users-roles">
                    <Dropdown id={rowData.id.toString() } value={userId===rowData.id ? selectedRole : rowData.roles[0]} options={roles} onChange={onRoleChange} optionLabel="name" placeholder={rowData.roles[0]=== "ROLE_USER" ? "User" : rowData.roles[0]==="ROLE_ORGANIZER" ? "Organizer" : "Admin"} />
                    <Button label="Save" className="p-button-success p-button-sm" onClick={onClickSaveRole} />
                </div>;

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
                        <h2><AdminHeader title={'List of users'} /></h2>
                    </div>
                    <Divider />
                    <div className="users-list">
                        <DataTable value={users} className="p-datatable" stripedRows>
                            <Column field='username' header="Username"></Column>
                            <Column field='FirstName' header="First name"></Column>
                            <Column field='LastName' header="Last name"></Column>
                            <Column field='Country' header="Country"></Column>
                            <Column field='Age' header="Age"></Column>
                            <Column body={selectRole} header="Role"></Column>
                            <Column body={deleteUser} header=""></Column>
                        </DataTable>
                    </div>
                </Card>
            </div>
        );
    }
}
export default Admin;