import React,{useRef} from 'react';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import './Header.css';

function Header(props) {

    const menu = useRef(null);
    const items = [
        {
            label: 'My library',
            items: [
                {
                    label: 'Favorite',
                    icon: 'pi pi-heart',
                    url: 'https://localhost:8000/user/mylibrary/favorite/'
                },
                {
                    label: 'To read',
                    icon: 'pi pi-eye',
                    url: 'https://localhost:8000/user/mylibrary/forReading/'
                },
                {
                    label: 'Reading now',
                    icon: 'pi pi-book',
                    url: 'https://localhost:8000/user/mylibrary/justReading/'
                },
                {
                    label: 'Already read',
                    icon: 'pi pi-check',
                    url: 'https://localhost:8000/user/mylibrary/alreadyRead/'
                }
            ]
        }
    ];

    return(
        <div className="header-content">
            <div className="header-menu">
                <Menu model={items} popup ref={menu} id="popup_menu" />
                <Button label="Menu" icon="pi pi-bars" onClick={(event) => menu.current.toggle(event)} aria-controls="popup_menu" aria-haspopup />
            </div>
            <div className="header-title">{props.title}</div>
        </div>
    );
}

export default Header;