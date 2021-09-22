import React, { useEffect, useState } from 'react';
import {  Link } from "react-router-dom";
import { DataView } from 'primereact/dataview';
import './Home.css';
import 'primeflex/primeflex.css';

function Home() {

    const [error, setError] = useState(null);
    const [isLoadedallTime, setIsLoadedAllTime] = useState(false);
    const [isLoadedBest, setIsLoadedBest] = useState(false);
    const [isLoadedNew, setIsLoadedNew] = useState(false);
    const [allTime, setAllTime] = useState([]);
    const [newBooks, setNewBooks] = useState([]);
    const [bestsellers, setBestsellers] = useState([]); 
    const [layout, setLayout] = useState('list');

    const url='https://localhost:8000/api/';

    //get best books of all time
    useEffect(() => {
        fetch(url + 'allTimeBooks', {mode: 'no-cors'})
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoadedAllTime(true);
              setAllTime(result);
            },
            (error) => {
              setIsLoadedAllTime(true);
              setError(error);
            }
          )
      }, [])

      //get bestsellers
      useEffect(() => {
        fetch(url + 'bestSellers', {mode: 'no-cors'})
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoadedBest(true);
              setBestsellers(result);
            },
            (error) => {
              setIsLoadedBest(true);
              setError(error);
            }
          )
      }, [])

      //get new books
      useEffect(() => {
        fetch(url + 'newBooks', {mode: 'no-cors'})
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoadedNew(true);
              setNewBooks(result);
            },
            (error) => {
              setIsLoadedNew(true);
              setError(error);
            }
          )
      }, [])

      //template for new and all time books
      const itemTemplate = (data) => {
        return (
            <div className="book-item" key={data.id}>
                <Link to={{ pathname: "/search/results",state: { detail: data.Name} }} >
                  <img src={data.Image} onError={(e) => e.target.src='https://thumbs.dreamstime.com/b/book-error-line-icon-book-error-vector-line-icon-elements-mobile-concept-web-apps-thin-line-icons-website-design-114930650.jpg'} alt={data.Name} />
                </Link>
                <div className="book-detail">
                <Link to={{ pathname: "/search/results",state: { detail: data.Name} }}>
                    <div className="book-name">{data.Name}</div>
                  </Link>
                    <div className="book-author">{data.Author}</div>
                </div>
            </div>
        );
    }

    const itemTemplateBestsellers = (data) => {
      return (
          <div className="book-item" key={data.id}>
            <Link to={{ pathname: "/search/results",state: { detail: data.Name} }}>
              <img src={data.Image} onError={(e) => e.target.src='https://thumbs.dreamstime.com/b/book-error-line-icon-book-error-vector-line-icon-elements-mobile-concept-web-apps-thin-line-icons-website-design-114930650.jpg'} alt={data.Name} />
            </Link>  
              <div className="book-detail">
              <Link to={{ pathname: "/search/results",state: { detail: data.Name} }}>
                  <div className="book-name">{data.Name}</div>
                </Link>  
                  <div className="book-author">{data.Author}</div>
                  <div className="book-sales">{data.Sales} Sales</div>
              </div>
          </div>
      );
  }


  if (error) {
    return <div>Error: {error.message}</div>;
  } 
  else{
    return (
      <div className="p-grid p-col-align-stretch">
        <div className="p-col">
          <div className="datascroller-demo">
            <div className="card">
              {isLoadedallTime ? 
            <DataView value={allTime} layout={layout} header={"Best books of all time"}
                        itemTemplate={itemTemplate} rows={10} />
               : <div>Loading...</div> }
             </div>
          </div>
        </div>
        <div className="p-col">
          <div className="datascroller-demo">
              <div className="card">
                {isLoadedBest ?
              <DataView value={bestsellers} layout={layout} header={"Bestsellers"}
                          itemTemplate={itemTemplateBestsellers} rows={10} />
              : <div>Loading...</div> }
              </div>
            </div>
        </div>
        <div className="p-col">
        <div className="datascroller-demo">
            <div className="card">
              {isLoadedNew ? 
            <DataView value={newBooks} layout={layout} header={"New books"}
                        itemTemplate={itemTemplate} rows={10} />
              : <div>Loading...</div> }
             </div>
          </div>
        </div>
    </div>
    );
  }
}
export default Home;