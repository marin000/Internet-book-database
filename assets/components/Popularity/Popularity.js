import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { Panel } from 'primereact/panel';
import './Popularity.css';

function Popularity() {
    
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [stat, setStat] = useState([]);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);

    const onCustomPage = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    }

    useEffect(() => {
        fetch(`https://localhost:8000/library/statistics`, {mode: 'no-cors'})
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setStat(result); 
            },
            (error) => {
            setIsLoaded(true);
            setError(error);
            }
        )
    }, [])

    const template = {
        layout: 'RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink',
        'RowsPerPageDropdown': (options) => {
            const dropdownOptions = [
                { label: 10, value: 10 },
                { label: 20, value: 20 },
                { label: 50, value: 50 }
            ];

            return (
                <>
                    <span className="p-mx-1" style={{ color: 'var(--text-color)', userSelect: 'none' }}>Items per page: </span>
                    <Dropdown value={options.value} options={dropdownOptions} onChange={options.onChange} appendTo={document.body} />
                </>
            );
        },
        'CurrentPageReport': (options) => {
            return (
                <span style={{ color: 'var(--text-color)', userSelect: 'none', width: '120px', textAlign: 'center' }}>
                    {options.first} - {options.last} of {options.totalRecords}
                </span>
            )
        }
    };

    function titleRedirect(rowData) {
        return <div><Link to={`/book/details/${rowData.BookId}/${rowData.Author}`}>{rowData.Title}</Link></div>;
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
                <Panel>
                    <div className="popularity">
                        <div className="popularity-header">
                            <h3>Popularity in library</h3>
                        </div>
                        <DataTable value={stat} sortField="LibraryNum" sortOrder={+1} paginator paginatorTemplate={template}
                            first={first} rows={rows} onPage={onCustomPage} paginatorClassName="p-jc-end" className="p-mt-6">
                            <Column body={titleRedirect} header="Title"></Column>
                            <Column field="Author" header="Author"></Column>
                            <Column field="LibraryNum" header="In Library" sortable></Column>
                            <Column field="ReviewNum" header="Reviews" sortable></Column>
                            <Column field="FavoriteNum" header="In Favorite" sortable></Column>
                            <Column field="ForReadingNum" header="Set to read" sortable></Column>
                            <Column field="JustReadingNum" header="Reading now" sortable></Column>
                            <Column field="AlreadyReadNum" header="Already read" sortable></Column>
                        </DataTable>
                    </div>
                </Panel>
            </div>
        );
    }
}
export default Popularity;