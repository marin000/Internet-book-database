import React,{useRef} from 'react';
import { SlideMenu } from 'primereact/slidemenu';
import { Button } from 'primereact/button';
import './AdminHeader.css';

function AdminHeader(props) {

    const menu = useRef(null);
    const items = [
        {
            label: 'Admin dashboard',
            items: [
                {
                    label: 'List of users',
                    icon: 'pi pi-users',
                    url: 'https://localhost:8000/admin/'
                },
                {
                    label: 'Trivia',
                    icon: 'pi pi-question',
                    items: [
                        {
                            label: 'Create New',
                            icon: 'pi pi-plus',
                            url: 'https://localhost:8000/admin/trivia/new/'
                        },
                        {
                            label: 'Check all',
                            icon: 'pi pi-info',
                            url: 'https://localhost:8000/admin/trivia/checkAll/'
                        }
                    ]
                }
            ]
        }
    ];

    return(
        <div className="admin-header-content">
            <div className="admin-header-menu">
                <SlideMenu model={items} popup ref={menu} id="popup_menu" />
                <Button label="Menu" icon="pi pi-bars" onClick={(event) => menu.current.toggle(event)} aria-controls="popup_menu" aria-haspopup />
            </div>
            <div className="admin-header-title">{props.title}</div>
        </div>
    );
}

export default AdminHeader;