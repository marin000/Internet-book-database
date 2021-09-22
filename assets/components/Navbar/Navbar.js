import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import logo from '../cover2.png';
import './Navbar.css';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

function Navbarr() {

    const [user,setUser] = useState("");
    const [permission, setPermission] = useState("");

    const items = [
        {
            label: 'User',
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'My profile',
                    icon: 'pi pi-fw pi-user',
                    url: user === true ? 'https://localhost:8000/user/myprofile' : 'https://localhost:8000/login'
                },
                {
                    label: 'My library',
                    icon: 'pi pi-book',
                    url: user === true ? 'https://localhost:8000/user/mylibrary' : 'https://localhost:8000/login'
                },
                {
                    label: 'Chat room',
                    icon: 'pi pi-comments',
                    url: user === true ? 'https://localhost:8000/user/chat' : 'https://localhost:8000/login'
                }
            ]
        },
        {
            label: 'Events',
            icon: 'pi pi-fw pi-calendar',
            items: [
                {
                    label: 'Meetings',
                    icon: 'pi pi-users',
                    items: [
                        {
                            label: 'Create new',
                            icon: 'pi pi-plus-circle',
                            url: user === false ? 'https://localhost:8000/login' : permission!=="user" ? 'https://localhost:8000/organizer/newMeeting' : 'https://localhost:8000/user/events/meetings/new/error',
                        },
                        {
                            label: 'Join',
                            icon: 'pi pi-user-plus',
                            url: user === true ? 'https://localhost:8000/user/events/meetings/enterRoom' : 'https://localhost:8000/login',
                        },
                    ]
                },
                {
                    label: 'Trivia',
                    icon: 'pi pi-question',
                    url: user === true ? 'https://localhost:8000/user/events/trivia' : 'https://localhost:8000/login'
                }
            ]
        },
        {
            label: 'Popularity',
            url: 'https://localhost:8000/popularity'
        },
        permission==="admin" ?
        {
            label: 'Admin' ,
            url: 'https://localhost:8000/admin'
        }
        : {},
        {
            label: user===true ? 'Sign Out' : 'Sign In',
            icon: user===true ? 'pi pi-sign-out' : 'pi pi-sign-in',
            url: user===true ? 'https://localhost:8000/logout' :'https://localhost:8000/login'
        }
    ];

    const [book, setBook] = useState("");
    const history = useHistory();
    const [selectedOption, setSelectedOption] = useState(null);

    const options = [
        { name: 'Newest', code: 'Newest' },
        { name: 'Magazine', code: 'Magazine' },
        { name: 'Book', code: 'Book'},
        { name: 'eBooks', code: 'eBooks' },
        { name: 'Download', code: 'epub'}
    ];

    //is user logged in
    useEffect(() => {
        fetch(`https://localhost:8000/isUserLogin`)
          .then(res => res.json())
          .then(
            (result) => {setUser(result);})
        },[user])

    //get User permission
    useEffect(() => {
        fetch(`https://localhost:8000/userPermission`)
          .then(res => res.json())
          .then(
            (result) => {setPermission(result);})
        },[permission])
    
    useEffect(() => {
        localStorage.setItem('user', user);
        }, [user]);

    const onOptionChange = (e) => {
        setSelectedOption(e.value);
    }

    function handleChange(event) {
        setBook(event.target.value);
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            console.log(book);
            history.push('/search/results',{ detail: book,filter: selectedOption });
        }
    }

    function handleClick(event) {
        event.preventDefault();
        console.log(book);
        history.push('/search/results',{ detail: book,filter: selectedOption });
    }

    return(
        <div className="card" >
            <Menubar 
                model={items} 
                start={<Link to="/"><img alt="logo" src={logo} height="40" className="p-mr-2"></img></Link>}  
                end={<div className="p-formgroup-inline">
                        <div className="p-field">
                            <Dropdown value={selectedOption} options={options} onChange={onOptionChange} optionLabel="name" placeholder="Filter" />
                            <InputText placeholder="Search" type="text" onChange={handleChange} onKeyDown={handleKeyDown}/>
                            <Button label="Search" className="p-button-outlined" onClick={handleClick} />
                        </div>
                    </div>} />
        </div>
    );
}
export default Navbarr;