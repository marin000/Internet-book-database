import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { Avatar } from 'primereact/avatar';
import './MyProfile.css';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { useHistory } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { Tooltip } from 'primereact/tooltip';
import axios from "axios";
import data from '../Register/countries.json';
import ageData from '../Register/age.json';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

function MyProfile(){

    const [user, setUser] = useState([]);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({});
    const [emails,setEmails] = useState([]);
    const history = useHistory();
    const [countries, setCountries] = useState([]);
    const [age,setAge] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [libInfo, setLibInfo] = useState([]);
    const [showDialog, setShowDialog] = useState(false);

    const toast = useRef(null);
    const fileUploadRef = useRef(null);
    const [chatUser,setChatUser] = useState([]);

    const onUpload = (files) => {
        toast.current.show({severity: 'info', summary: 'Success', detail: 'Picture Uploaded'});
        setTimeout(function(){
          window.location.reload(1);
      }, 1000);
    }

  const accept = () => {
      toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
      fetch(`https://localhost:8000/deleteProfile`, {method: 'DELETE'});
      history.push('/');
      window.location.reload();
  }

  const reject = () => {
      toast.current.show({ severity: 'info', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
  }

    useEffect(() => {
        setCountries(data.data);
        setAge(ageData.ageData);
    }, []);

    useEffect(() => {
        fetch(`https://localhost:8000/users/getCurrentUser/`)
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setUser(result);
            },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
      }, [])

    useEffect(() => {
      axios({
            method: 'PUT',
            url: `https://api.chatengine.io/users/`,
            headers: {'PRIVATE-KEY': 'aa19c346-3187-453b-beb5-b6406fdc8884'}, 
            data: {
                "username": localStorage.getItem('username'),
                "secret": localStorage.getItem('chatSecret')
            }
          }).then(res => {
              setChatUser(res.data);})
          }, []);

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
      fetch(`https://localhost:8000/getUserLibInfo`)
        .then(res => res.json())
        .then(
          (result) => {
            setLibInfo(result);
          },
          (error) => {
            setError(error);
          }
        )
    }, [])

    const formik = useFormik({
      initialValues: {
          firstName: '',
          lastName: '',
          email: '',
          country: null,
          age: null,    
          password: ''      
      },
      validate: (data) => {
          let errors = {};
          
           if(emails.includes(data.email)){
              errors.email = 'Email adress already exist!';
          }
          if(data.email){
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
              errors.email = 'Invalid email address. E.g. example@email.com';
            }
          }
          return errors;
      },
      onSubmit: (data) => {
        setFormData(data);
        axios.post(`https://localhost:8000/users/update`,data);
        window.location.reload();   
      }
  });

  const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
      return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
  };

  const confirmDelete = () => {
    confirmDialog({
        message: 'Are you sure you want to delete this profile? All data will be lost!',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        acceptClassName: 'p-button-danger',
        accept,
        reject
    });
  };

  function onClickPassword(){
    history.push('/user/changePassword');
  }

  function onClickDialog(event) {
    setShowDialog(true);
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } 
  else if (!isLoaded || !user) {
    return <div>Loading...</div>;
  } 
  else{
    return(
      <div>
      <Toast ref={toast}></Toast>

      <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
      <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
      <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

      <Card>
      <Dialog visible={showDialog} onHide={() => setShowDialog(false)} position="top"  header="Choose profile picture" style={{ width: '80vw' }}>
        <FileUpload name="demo" url="https://localhost:8000/users/uploadImg" onUpload={onUpload} multiple accept="image/*" maxFileSize={1000000}
          emptyTemplate={<p className="p-m-0">Drag and drop files to here to upload.</p>} />
      </Dialog>
      <div className="p-grid p-col-align-stretch">
        <div className="p-col">
            <div className="otherInfo">
              <div className="p-d-flex p-jc-center">
                <div className="card-start">
                    <Card>
                      <div className="field-img">
                        { user.Picture ? 
                        <Avatar image={ require('../../../public/uploads/img/' + user.Picture)} className="p-mr-2" size="xlarge" shape='circle' />  
                        : <Avatar icon="pi pi-user" className="p-mr-2" size="xlarge" shape="circle" />
                        }
                        <Button icon="pi pi-plus" className="p-button-rounded p-button-info p-button-outlined" onClick={onClickDialog} />
                      </div>
                      <div className="field-lib">
                        Username: {user.username}
                      </div>
                      <div className="field-lib">
                        Member since: {user.MemberSince}
                      </div>
                      <div className="field-lib">
                        Books in library: {libInfo[0]}
                      </div>
                      <div className="field-lib">
                        Books to read: {libInfo[1]}
                      </div>
                      <div className="field-lib">
                        Currently reading books: {libInfo[2]}
                      </div>
                      <div className="field-lib">
                       Already read books: {libInfo[3]}
                      </div>
                    </Card>
                </div>
              </div>
            </div>
          </div>

      <div className="p-col">
        <div className="form-demo">
          <div className="p-d-flex p-jc-center">
              <div className="card">
              <Card>
                  <h3 className="p-text-center">My profile</h3>
                  <form onSubmit={formik.handleSubmit} className="p-fluid">
                      <h6>First name</h6>
                      <div className="p-field">
                          <span className="p-float-label">
                              <InputText id="firstName" name="firstName" placeholder={user.FirstName} value={formik.values.firstName} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('firstName') })} />
                          </span>
                          {getFormErrorMessage('firstName')}
                      </div>
                      <h6>Last name</h6>
                      <div className="p-field">
                          <span className="p-float-label">
                              <InputText id="lastName" name="lastName" placeholder={user.LastName} value={formik.values.lastName} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('lastName') })} />
                          </span>
                          {getFormErrorMessage('lastName')}
                      </div>
                      <h6>E-mail</h6>
                      <div className="p-field">
                          <span className="p-float-label p-input-icon-right">
                              <i className="pi pi-envelope" />
                              <InputText id="email" name="email" placeholder={user.Email} value={formik.values.email} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('email') })} />
                          </span>
                          {getFormErrorMessage('email')}
                      </div>
                      <h6>Country</h6>
                      <div className="p-field">
                          <span className="p-float-label">
                              <Dropdown id="country" name="country" placeholder={user.Country} value={formik.values.country} onChange={formik.handleChange} options={countries} optionLabel="name"
                              className={classNames({ 'p-invalid': isFormFieldValid('country') })} />
                          </span>
                          {getFormErrorMessage('country')}
                      </div>
                      <h6>Age</h6>
                      <div className="p-field">
                          <span className="p-float-label">
                              <Dropdown id="age" name="age" placeholder={String(user.Age)} value={formik.values.age} onChange={formik.handleChange} options={age} optionLabel="name"
                              className={classNames({ 'p-invalid': isFormFieldValid('age') })} />
                          </span>
                          {getFormErrorMessage('age')}
                      </div>
                      
                      <Button type="submit" label="Update" className="p-button-success" />
                      <Divider />
                      <Button className="p-button-warning" label="Change password" onClick={onClickPassword} />
                  </form>
                  <Divider />
                  <div className="button-delete">
                    <Button className="p-button-danger" label="Delete profile" onClick={confirmDelete} /> 
                  </div>
                  </Card>
              </div>
          </div>
        </div>
      </div>
    </div>
  </Card>
  </div>
  );
  }
}

export default MyProfile;