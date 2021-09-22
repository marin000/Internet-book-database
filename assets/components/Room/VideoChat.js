import React, { useState, useCallback, useEffect } from 'react';
import Lobby from './Lobby';
import './CreateRoom.css'
import Room from './Room';

const VideoChat = () => {
  
  const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('');
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleRoomNameChange = useCallback(event => {
    setRoomName(event.target.value);
  }, []);

  useEffect(() => {
    fetch(`https://localhost:8000/users/getCurrentUser/`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setUsername(result.username);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  const handleSubmit = useCallback( event=>{
      event.preventDefault(); 
      fetch('https://aquamarine-pointer-3726.twil.io/video-token?identity=' + username, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .then((result) => {
        setToken(result.accessToken);
      });
    },
    [roomName, username]
  );

  const handleLogout = useCallback(event => {
    setToken(null);
  }, []);

  let render;
  if (token) {
    render = (
      <Room roomName={roomName} token={token} handleLogout={handleLogout} />
    );
  } else {
    render = (
      <Lobby
      roomName={roomName}
      handleRoomNameChange={handleRoomNameChange}
      handleSubmit={handleSubmit}
      />
    );
  }
  return render;
};
export default VideoChat;