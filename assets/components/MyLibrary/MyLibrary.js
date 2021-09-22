import React,{useEffect, useState} from 'react';
import { DataView } from 'primereact/dataview';
import {  Link } from "react-router-dom";
import 'primeflex/primeflex.css';
import './MyLibrary.css';
import Header from './Header/Header';

//get all books from library
function MyLibrary() {

    const [apiKey, setApiKey] = useState("google book api key");
    const url = 'https://localhost:8000/library/api/getAll/';
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [item, setItem] = useState([]);
    const [layout, setLayout] = useState('grid');

    useEffect(() => {
        fetch(url, {mode: 'no-cors'})
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setItem(result);
            },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
    }, [])

    console.log(item);
   
    const renderGridItem = (data) => {
        return (
            <div className="p-col-12 p-md-4">
                <div className="book-grid-item">
                    <div className="book-grid-item-content">
                        <Link to={`/book/details/${data.BookId}/${data.Author}`}>
                                <img src={data.Image} onError={(e) => e.target.src='https://thumbs.dreamstime.com/b/book-error-line-icon-book-error-vector-line-icon-elements-mobile-concept-web-apps-thin-line-icons-website-design-114930650.jpg'} alt={data.Title} />
                        </Link>    
                        <Link to={`/book/details/${data.BookId}/${data.Author}`}>
                                <div className="book-title">{data.Title}</div>
                        </Link>    
                        <div className="book-author">{data.Author}</div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    else if(!isLoaded){
        return <div>Loading...</div>;
    }
    else{
        return(
            <div className="dataview-demo">
                <div className="card">
                    <DataView value={item} layout={layout} header={<Header title={'My library books'}/>}
                            itemTemplate={renderGridItem} paginator rows={9} />
                </div>  
            </div>
        )
    }
}

export default MyLibrary;