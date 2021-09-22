import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import './TriviaRankings.css';

function TriviaRankings() {
    
    const id = useParams().id;
    const triviaName = useParams().triviaName;
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoadedUser, setIsLoadedUser] = useState(false);
    const [trivia, setTrivia] = useState([]);  
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [user, setUser] = useState([]);
    var no = 0;

    const onCustomPage = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    }

    useEffect(() => {
        fetch(`https://localhost:8000/getTriviaRankings/` + id, {mode: 'no-cors'})
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

    useEffect(() => {
        fetch(`https://localhost:8000/users/getCurrentUser/`)
          .then(res => res.json())
          .then(
            (result) => {
              setUser(result);
              setIsLoadedUser(true);
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

    function position(rowData) {
        no=no+1;
        if (rowData.UserId===user.id) {
            return <div style={{color: "yellow", fontWeight: "bold"}}>{no + '.'}</div>;
        }
        return no + '.';
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } 
    else if (!isLoaded && !isLoadedUser) {
        return <div>Loading...</div>;
    } 
    else{
        return(
            <div>
                <Card>
                <div className="triviaRankings">
                    <div className="triviaRankings-header">
                        <h4>{triviaName}</h4>
                    </div>
                    <Divider />
                    <DataTable value={trivia} sortField="Points" sortOrder={+1} paginator paginatorTemplate={template}
                    first={first} rows={rows} onPage={onCustomPage} paginatorClassName="p-jc-end" className="p-mt-6">
                        <Column body={position} header=""></Column>
                        <Column field="FirstName" header="First Name"></Column>
                        <Column field="LastName" header="Last name"></Column>
                        <Column field="Country" header="Country"></Column>
                        <Column field="Points" header="Points"></Column>
                    </DataTable>
                </div>
                </Card>
            </div>
        );
    }
}
export default TriviaRankings;