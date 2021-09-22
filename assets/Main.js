import './styles/app.css';
import React from 'react';
import Home from './components/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchResults from './components/SearchResults/SearchResults';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbarr from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import BookDetails from './components/BookDetails/BookDetails';
import MyLibrary from './components/MyLibrary/MyLibrary';
import Favorite from './components/MyLibrary/Favorite';
import ForReading from './components/MyLibrary/ForReading';
import JustReading from './components/MyLibrary/JustReading';
import AlreadyRead from './components/MyLibrary/AlreadyRead';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import MyProfile from './components/MyProfile/MyProfile';
import ChangePassword from './components/ChangePassword/ChangePassword';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import VideoChat from './components/Room/VideoChat';
import Chat from './components/Chat/Chat';
import Admin from './components/Admin/Admin';
import TriviaCheck from './components/Admin/TriviaCheck/TriviaCheck';
import TriviaEdit from './components/Admin/TriviaEdit/TriviaEdit';
import TriviaCreate from './components/Admin/TriviaCreate/TriviaCreate';
import Trivia from './components/Trivia/Trivia';
import TriviaPlay from './components/TriviaPlay/TriviaPlay';
import TriviaRankings from './components/TriviaRankings/TriviaRankings';
import MeetingsNew from './components/MeetingsNew/MeetingsNew';
import MeetingsNewError from './components/MeetingsNew/MeetingsNewError';
import ContactForm from './components/ContactForm/ContactForm';
import Popularity from './components/Popularity/Popularity';

function Main() {
    return(
        <Router>
            <Navbarr />
            <Switch>
                <Route exact path='/'>
                    <Home />
                </Route>
                <Route exact path='/search/results/'>
                    <SearchResults />
                </Route>
                <Route exact path='/book/details/:id/:author' children={<BookDetails />}>
                    <BookDetails />
                </Route>
                <Route exact path='/user/mylibrary/'>
                    <MyLibrary />
                </Route>
                <Route exact path='/user/mylibrary/favorite'>
                    <Favorite />
                </Route>
                <Route exact path='/user/mylibrary/forReading'>
                    <ForReading />
                </Route>
                <Route exact path='/user/mylibrary/justReading'>
                    <JustReading />
                </Route>
                <Route exact path='/user/mylibrary/alreadyRead'>
                    <AlreadyRead />
                </Route>
                <Route exact path='/register'>
                    <Register />
                </Route>
                <Route exact path='/login'>
                    <Login />
                </Route>
                <Route exact path='/user/myprofile'>
                    <MyProfile />
                </Route>
                <Route exact path='/user/changePassword'>
                    <ChangePassword />
                </Route>
                <Route exact path='/forgot'>
                    <ForgotPassword />
                </Route>
                <Route exact path='/resetPassword/:id'>
                    <ResetPassword />
                </Route>
                <Route exact path='/user/events/meetings/enterRoom'>
                    <VideoChat />
                </Route>
                <Route exact path='/user/chat'>
                    <Chat />
                </Route>
                <Route exact path='/admin'>
                    <Admin />
                </Route>
                <Route exact path='/admin/trivia/new'>
                    <TriviaCreate />
                </Route>
                <Route exact path='/admin/trivia/checkAll'>
                    <TriviaCheck />
                </Route>
                <Route exact path='/admin/trivia/edit/:id'>
                    <TriviaEdit />
                </Route>
                <Route exact path='/user/events/trivia'>
                    <Trivia />
                </Route>
                <Route exact path='/user/events/trivia/play/:id'>
                    <TriviaPlay />
                </Route>
                <Route exact path='/user/events/trivia/rankings/:id/:triviaName'>
                    <TriviaRankings />
                </Route>
                <Route exact path='/organizer/newMeeting'>
                    <MeetingsNew />
                </Route>
                <Route exact path='/user/events/meetings/new/error'>
                    <MeetingsNewError />
                </Route>
                <Route exact path='/contact'>
                    <ContactForm />
                </Route>
                <Route exact path='/popularity'>
                    <Popularity />
                </Route>
            </Switch>
            <Footer />
        </Router>
    )   
}
export default Main;
