import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { DataView } from 'primereact/dataview';
import {  Link } from "react-router-dom";
import 'primeflex/primeflex.css';
import './SearchResults.css';

function SearchResults (){
 
    const location=useLocation();
    const book = location.state.detail;
    const [apiKey, setApiKey] = useState("google book api key");
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [layout, setLayout] = useState('list');
    const option = location.state.filter;
    let filter="";

    if(option){
      switch (option.code) {
        case "Newest":
          filter="&orderBy=newest";
          break;
        case "Magazine":
          filter="&printType=magazines";
          break;
        case "eBooks":
          filter="&filter=free-ebooks";
          break;
        case "Book":
          filter="&printType=books";
          break;
        case "epub":
          filter="&download=epub";
          break;
        default:
          break;
      }
    }

    useEffect(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=`+book+filter+`&maxResults=30&key=`+apiKey)
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setItems(result.items);
            },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
      }, [book])
      console.log(items);

      const itemTemplate = (data) => {
        return (
            <div className="book-item" key={data.id}>
              <Link to={`/book/details/${data.id}/${data.volumeInfo.authors}`}>
                { data.volumeInfo.imageLinks ? 
                  <img src={data.volumeInfo.imageLinks.thumbnail} onError={(e) => e.target.src='https://thumbs.dreamstime.com/b/book-error-line-icon-book-error-vector-line-icon-elements-mobile-concept-web-apps-thin-line-icons-website-design-114930650.jpg'} alt={data.name} />
                  :
                  <img src='https://thumbs.dreamstime.com/b/book-error-line-icon-book-error-vector-line-icon-elements-mobile-concept-web-apps-thin-line-icons-website-design-114930650.jpg' alt='default' />
                }   
                </Link>  
                <div className="book-detail">
                <Link to={`/book/details/${data.id}/${data.volumeInfo.authors}`}>
                    <div className="book-title">{data.volumeInfo.title}</div>
                  </Link>
                    <div className="book-subtitle">{data.volumeInfo.subtitle}</div>
                    <div className="book-author">{data.volumeInfo.authors + " "}</div>     
                    <div className="book-categories">{data.volumeInfo.categories}</div>                    
                </div>
                <div className="book-detail-more">
                    <h4 className="heading">Details</h4>
                    <div className="book-pages">Pages: {data.volumeInfo.pageCount}</div>
                    <div className="book-language">Language: {data.volumeInfo.language}</div>
                    <div className="book-published">Published date: {data.volumeInfo.publishedDate},Publisher: {data.volumeInfo.publisher}</div>
                    <div className="info">{ data.searchInfo ? data.searchInfo.textSnippet.replace(/(<([^>]+)>)/gi, "")
                                                                                          .replace(/&quot;/g,"")
                                                                                          .replace(/&#39;/g,"")
                                                                                          .replace(/&nbsp;/g,"") : ""}</div>               
                 </div>
            </div>
        );
    }

      if (!book){
        return <div className="empty-search">
                  <section className="empty-search-text">
                    <p>Search IBD by typing a title or part of the title in the search box at the top of this page.</p>
                  </section>
                </div>
      }  
      else if (error) {
        return <div>Error: {error.message}</div>;
      } 
      else if (!isLoaded) {
        return <div>Loading...</div>;
      } 
      else {
        return (
            <div className="datascroller-demo">
              <div className="card">
                <DataView value={items} layout={layout} header={"Results for " + book}
                            itemTemplate={itemTemplate} paginator rows={10} />
              </div>
            </div>
        );
      }    

}
export default SearchResults;

