import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../cover2.png';
import './Footer.css';

function Footer() {

    const user = localStorage.getItem('user');
    console.log(user);
    return(
        <div className="footer">
            <div className="footer-container">
                <section className="footer-text">
                    <p className="footer-text-heading">
                        Read and communicate with our help
                    </p>
                </section>
                <div className="footer-links">
                    <div className="footer-link-wrapper">
                        <div className="footer-link-items">
                            <h4 className="footer-item-header">User profile</h4>
                            { user ? 
                            <div>
                                <div style={{marginBottom:"0.7rem", marginTop:"0.3rem"}}><Link to='/user/mylibrary'>My library</Link></div>
                                <div><Link to='/user/events/trivia'>Play Trivia</Link></div>
                            </div>
                            : <div>
                                <div style={{marginBottom:"0.7rem", marginTop:"0.3rem"}}><Link to='/login'>My library</Link></div>
                                <div><Link to='/login'>Play Trivia</Link></div>
                                </div>}
                        </div>
                        <div className='footer-link-items'>
                            <h4 className= "footer-item-header">Communicate</h4>
                            { user ? 
                            <div>
                                <div style={{marginBottom:"0.7rem", marginTop:"0.3rem"}}><Link to='/user/chat'>Chat room</Link></div>
                                <div><Link to='/user/events/meetings/enterRoom'>Video meetings</Link></div>
                            </div>
                            : <div>
                                <div style={{marginBottom:"0.7rem", marginTop:"0.3rem"}}><Link to='/login'>Chat room</Link></div>
                                <div><Link to='/login'>Video meetings</Link></div>
                                </div>}
                        </div>
                        <div className='footer-link-items'>
                            <h4 className="footer-item-header">About us</h4>
                            <div>
                                <div style={{marginBottom:"0.7rem", marginTop:"0.3rem"}}><Link to='/contact'>Contact us</Link></div>
                                <div><Link to={{pathname:'https://www.privacypolicygenerator.info/live.php?token=nIm9ZfYJC30XnO4fybpUaF5C3Y1ZzAiL'}} target="_blank">Privacy policy</Link></div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="website-logo">
                    <div className="website-logo-wrap">
                        <small className="website-rights">IBD © 2021</small>
                    </div>
                </section>
            </div>
        </div>
    );
}
export default Footer;