import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { Panel } from 'primereact/panel';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Sidebar } from 'primereact/sidebar';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import 'primeflex/primeflex.css';
import './BookDetails.css';

function BookDetails() {

    const id = useParams().id;
    const author = useParams().author;
    const [apiKey, setApiKey] = useState('google book api key');
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [item, setItem] = useState([]);
    const [errorRelated, setErrorRelated] = useState(null);
    const [isLoadedRelated, setIsLoadedRelated] = useState(null);
    const [related, setRelated] = useState([]);
    const [bookCheck, setBookCheck] = useState("");
    const toast = useRef(null);
    const [visibleRight, setVisibleRight] = useState(false);
    const [libraryBook, setLibraryBook] = useState([]);
    const [rating, setRating] = useState(null);
    const [displayResponsive, setDisplayResponsive] = useState(false);
    const [reviewInput, setReviewInput] = useState('');
    const [editReview, setEditReview] = useState(false);
    const [user, setUser] = useState(localStorage.getItem('user') || '');

    const responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '600px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '480px',
          numVisible: 1,
          numScroll: 1
      }
  ];

  const accept = () => {
      toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have deleted book from library', life: 3000 });
      fetch(`https://localhost:8000/library/delete/` + id, {method: 'DELETE'});
      setBookCheck("");
  }

  const reject = () => {
      toast.current.show({ severity: 'info', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
  }


    //get book by id
    useEffect(() => {
      fetch(`https://www.googleapis.com/books/v1/volumes/`+id+`?key=`+apiKey)
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
    }, [id])
    console.log(item);


    //get books related by author
    useEffect(() => {
      fetch(`https://www.googleapis.com/books/v1/volumes?q=`+author+`&maxResults=10&key=`+apiKey)
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoadedRelated(true);
            setRelated(result.items);
          },
          (error) => {
            setIsLoadedRelated(true);
            setErrorRelated(error);
          }
        )
    }, [author,id])

    //book exist in DB
    useEffect(() => {
      fetch(`https://localhost:8000/library/check/` + id)
        .then(res => res.json())
        .then(
          (result) => {setBookCheck(result);})
      },[bookCheck,id])

    //and get book
    useEffect(() => {
      if (bookCheck) {
        fetch(`https://localhost:8000/library/getBook/` + id)
          .then(res => res.json())
          .then(
            (result) => {setLibraryBook(result);})
      }
    },[bookCheck,id])

    //add and remove book from library
    function handleClick(event,action) {
      event.preventDefault();
      if (action==="add") {
        fetch(`https://localhost:8000/library/add/` + id, {method: 'POST'});
        setBookCheck("");
      }
      else{
        confirmDialog({
          message: 'Do you want to delete this book from library?',
          header: 'Delete Confirmation',
          icon: 'pi pi-info-circle',
          acceptClassName: 'p-button-danger',
          accept,
          reject
      });
      }
    }

    //add and remove book from favorite
    function handleChangeFav(event) {
      event.preventDefault();
      fetch(`https://localhost:8000/library/favorite/` + id, {method: 'POST'});
      setBookCheck("");
    }

    //add and remove book from "to read" option
    function handleChangeForReading(event) {
      event.preventDefault();
      fetch(`https://localhost:8000/library/forReading/` + id, {method: 'POST'});
      setBookCheck("");    
    }

    //add and remove book from "reading now" option
    function handleChangeJustReading(event) {
      event.preventDefault();
      fetch(`https://localhost:8000/library/justReading/` + id, {method: 'POST'});
      setBookCheck("");    
    }

    //add and remove book from "already read" option
    function handleChangeAlreadyRead(event) {
      event.preventDefault();
      fetch(`https://localhost:8000/library/alreadyRead/` + id, {method: 'POST'});
      setBookCheck("");   
     }

    //set user book rating
    function handleChangeRating(event) {
      event.preventDefault();
      fetch(`https://localhost:8000/library/userRating/` + id + `/` + event.value, {method: 'POST'});
      setBookCheck("");
    }

    function updateCheckBook() {
      setBookCheck("");
    }

    function onClickReview(event) {
      event.preventDefault();
      setDisplayResponsive(true);
    }

    function onHideReview() {
      setDisplayResponsive(false);
      setEditReview(false);
    }

    function handleChangeReview(event) {
      console.log(event.target.value);
      setReviewInput(event.target.value);
  }
    function updateReview() {
      console.log(reviewInput);
      fetch(`https://localhost:8000/library/updateReview/` + id + `/` + reviewInput, {method: 'POST'});
      setDisplayResponsive(false);
      setEditReview(false);
      setBookCheck("");
    }

    function deleteReview() {
      fetch(`https://localhost:8000/library/deleteReview/` + id, {method: 'POST'});
      setDisplayResponsive(false);
      setReviewInput("");
      setBookCheck("");
    }

    function onclickEditReview(){
      setReviewInput(libraryBook.Review);
      setEditReview(true);
      setDisplayResponsive(true);
    }
    
    function renderFooterReview1(){
      return (
          <div>
              <Button label="Edit" icon="pi pi-pencil" onClick={onclickEditReview} />
              <Button label="Delete" icon="pi pi-times-circle" onClick={deleteReview} />
          </div>
      );
      }
      function renderFooterReview2(){
        return (
            <div>
                <Button label="Save" icon="pi pi-check-square" onClick={updateReview}  />
            </div>
        );
  }

    function relatedTemplate(data) {
      if (errorRelated) {
        return <div>Error: {error.message}</div>;
      }
      else if(!isLoadedRelated){
        return <div>Loading...</div>;
      }
      else{
        return (
          <div className="book-item">
              <div className="book-item-content">
                  <div className="p-mb-3">
                  <Link to={`/book/details/${data.id},${data.volumeInfo.authors}`}  onClick={updateCheckBook} >
                      { data.volumeInfo.imageLinks ?
                      <img src={data.volumeInfo.imageLinks.thumbnail} onError={(e) => e.target.src='https://thumbs.dreamstime.com/b/book-error-line-icon-book-error-vector-line-icon-elements-mobile-concept-web-apps-thin-line-icons-website-design-114930650.jpg'} alt={data.volumeInfo.title} className="book-image" />
                      :
                      <img src='https://thumbs.dreamstime.com/b/book-error-line-icon-book-error-vector-line-icon-elements-mobile-concept-web-apps-thin-line-icons-website-design-114930650.jpg' alt='default' className="book-image" />
                      }  
                    </Link>
                  </div>
                  <div>
                    <Link to={`/book/details/${data.id},${data.volumeInfo.authors}`}  onClick={updateCheckBook}>
                      <h4 className="p-mb-1">{data.volumeInfo.title}</h4>
                      </Link>
                      <h6 className="p-mt-0 p-mb-3">{data.volumeInfo.authors + " "}</h6>
                  </div>
              </div>
          </div>
        );
      }
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
          <Toast ref={toast} />
          <Panel>
          <div className="p-book-detail">
            <div className="p-grid">
              <div className="p-col-4">
                {item.volumeInfo && item.volumeInfo.imageLinks ? 
                <img className="book-detail-img" src={item.volumeInfo.imageLinks.thumbnail} onError={(e) => e.target.src='https://thumbs.dreamstime.com/b/book-error-line-icon-book-error-vector-line-icon-elements-mobile-concept-web-apps-thin-line-icons-website-design-114930650.jpg'} alt={item.volumeInfo.title} />
                :<img className="book-detail-img" src='https://thumbs.dreamstime.com/b/book-error-line-icon-book-error-vector-line-icon-elements-mobile-concept-web-apps-thin-line-icons-website-design-114930650.jpg' alt='default' />}
              </div>
              <div className="p-col-8">
                <div className="book-detail">
                  <div className="title">
                      {item.volumeInfo ? item.volumeInfo.title : "No title"}&nbsp;&nbsp;
                  </div>
                  { bookCheck===true ? 
                  <div className="title-options">
                    <Button label="Remove from library" className="p-button-outlined p-button-danger p-button-sm"  onClick={(e) => {handleClick(e,"remove");}} /> &nbsp;&nbsp;
                    <div className="title-options-sidebar">
                      <Button label="Library" icon="pi pi-book" onClick={() => setVisibleRight(true)} iconPos="right" className="p-mr-2" />
                    </div>
                  </div>
                  : user==='true' ? <Button label="Add to library" className="p-button-outlined p-button-sm" onClick={(e) => {handleClick(e,"add");}} /> 
                  :  <Link to='/login'><Button label="Add to library" className="p-button-outlined p-button-sm" /></Link>
                  }
                  <div className="subtitle">
                      {item.volumeInfo ? item.volumeInfo.subtitle : ""}
                  </div>
                  <div className="author">
                      {item.volumeInfo ? item.volumeInfo.authors + " " : ""}
                  </div>
                  <div className="rating">
                    { item.volumeInfo ?
                      <Rating value={item.volumeInfo.averageRating} readOnly stars={5} cancel={false} />
                      : <Rating value={0} readOnly stars={5} cancel={false} />
                    } 
                  </div>
                  <div className="categories">
                      {item.volumeInfo ? "Genre: " + item.volumeInfo.categories + " " : ""}
                  </div>
                  <div className="lang-pages">
                      {item.volumeInfo ? "Language:" + item.volumeInfo.language + ", Pages:" + item.volumeInfo.pageCount : ""}
                  </div>
                  <div className="published">
                      {item.volumeInfo ? "Published date:" + item.volumeInfo.publishedDate + ", Publisher:" + item.volumeInfo.publisher : ""}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-grid">
                <div className="p-col-12">
                  <div className="description">
                    { item.volumeInfo && item.volumeInfo.description ? item.volumeInfo.description.replace(/(<([^>]+)>)/gi, "").replace(/&quot;/g,"") : ""}
                  </div>
                </div>
            </div>
            <div className="p-grid">
              <div className="p-col-12">
                <div className="pdf">PDF: 
                  { item.accessInfo && item.accessInfo.pdf.isAvailable===true ? 
                  <a href={item.accessInfo.pdf.acsTokenLink} download><Button label="Download" className="p-button-primary p-button-sm" /></a> : "Not available"}
                </div>
                <div className="epub">EPUB: 
                  { item.accessInfo && item.accessInfo.epub.isAvailable===true ? 
                  <a href={item.accessInfo.epub.acsTokenLink} download><Button label="Download" className="p-button-primary p-button-sm" /></a> : "Not available"}
                </div>
                <div className="quote">Quote sharing:
                  {item.accessInfo && item.accessInfo.quoteSharingAllowed===true ? "Allowed" : "Disallowed"}
                </div>
              </div>
            </div>
            <div className="p-grid">
              <div className="p-col-12">
                <div className="carousel-demo">
                <Carousel value={related} numVisible={3} numScroll={1} responsiveOptions={responsiveOptions} className="custom-carousel" circular
                    autoplayInterval={3000} itemTemplate={relatedTemplate} header={<h5>Related books by author</h5>} />
                </div>
              </div>
            </div>
          </div>

          <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
            <h2>{libraryBook.Title}</h2>
            <div className="sidebar-fav">
                    <h5 className="p-mr-5">In favorite</h5>&nbsp;
                    <Checkbox inputId="binary" checked={libraryBook.Favorite ? true : false} onChange={handleChangeFav} />
            </div>
            <div className="sidebar-forReading">
                    <h5 className="p-mr-2">Want to read</h5>&nbsp;
                    <Checkbox inputId="binary" checked={libraryBook.ForReading ? true : false} onChange={handleChangeForReading} />
            </div>
            <div className="sidebar-justReading">
                    <h5 className="p-mr-2">Reading now</h5>&nbsp;
                    <Checkbox inputId="binary" checked={libraryBook.JustReading ? true : false} onChange={handleChangeJustReading} />
            </div>
            <div className="sidebar-alreadyRead">
                    <h5 className="p-mr-3">Already read</h5>
                    <Checkbox inputId="binary" checked={libraryBook.AlreadyRead ? true : false} onChange={handleChangeAlreadyRead} />
            </div>
            <div className="sidebar-rating">
                <h5 className="p-mr-5">Your rating</h5>
                <Rating value={libraryBook.Rating} cancel={false} onChange={handleChangeRating} />
            </div>
            <div className="sidebar-review">
              { libraryBook.Review ? 
              <div className="review-content">
                  <h5 className="p-mr-4">Your review</h5>
                  <Button label="Show" icon="pi pi-external-link" onClick={onClickReview} />
                  <Dialog header="Your book review" visible={displayResponsive} onHide={onHideReview} breakpoints={{'960px': '75vw'}} style={{width: '50vw'}} footer={renderFooterReview1}>
                    <p>{libraryBook.Review}</p>
                  </Dialog>
                </div>
                : <div className="review-content">
                  <h5 className="p-mr-4">Add review</h5>
                  <Button label="New" icon="pi pi-external-link" onClick={onClickReview} />
                  <Dialog header="Add book review" visible={displayResponsive} onHide={onHideReview} breakpoints={{'960px': '75vw'}} style={{width: '50vw'}} footer={renderFooterReview2}>
                    <InputTextarea value={reviewInput} onChange={handleChangeReview} rows={7} cols={80} />
                  </Dialog>
                </div>
              }
              { editReview ? 
              <Dialog header="Edit book review" visible={displayResponsive} onHide={onHideReview} breakpoints={{'960px': '75vw'}} style={{width: '50vw'}} footer={renderFooterReview2}>
              <InputTextarea value={reviewInput} onChange={handleChangeReview} rows={11} cols={100} />
            </Dialog>
            : null}
            </div>
          </Sidebar>
          </Panel>
          </div>
      );
    }
}

export default BookDetails;