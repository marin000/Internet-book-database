import React, { useState, useEffect } from 'react';
import Video from 'twilio-video';
import Participant from './Participant';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';

const Room = ({ roomName, token, handleLogout }) => {

    const [room, setRoom] = useState(null);
    const [participants, setParticipants] = useState([]);

    const remoteParticipants = participants.map(participant => (
      <Participant key={participant.sid} participant={participant} />
    ));

    useEffect(() => {
        const participantConnected = participant => {
            setParticipants(prevParticipants => [...prevParticipants, participant]);
        };
        const participantDisconnected = participant => {
            setParticipants(prevParticipants =>
            prevParticipants.filter(p => p !== participant)
            );
        };
        Video.connect(token, {
            name: roomName
        }).then(room => {
            setRoom(room);
            room.on('participantConnected', participantConnected);
            room.on('participantDisconnected', participantDisconnected);
            room.participants.forEach(participantConnected);
        });

        return () => {
            setRoom(currentRoom => {
              if (currentRoom && currentRoom.localParticipant.state === 'connected') {
                currentRoom.localParticipant.tracks.forEach(function(trackPublication) {
                  trackPublication.track.stop();
                });
                currentRoom.disconnect();
                return null;
              } else {
                return currentRoom;
              }
            });
          };
    },[roomName,token]);
    
    if (!room || !participants) {
      return <div>Loading ...</div>
    }
    else{
      return (
        <div className="room">
          <Card>
          <div className="room-header">
            <h2 className="p-mr-3">Room: {roomName}</h2>
            <Button className="p-button-danger" label="Leave meeting" onClick={handleLogout} /> 
          </div>
          <Divider />
          <div className="local-participant">
            {room ? (
              <Participant
                key={room.localParticipant.sid}
                participant={room.localParticipant}
              />
            ) : (
              ''
            )}
          </div>
          <div className="room-header-participants">
            <h3>Remote Participants</h3>
          </div>
          <div className="remote-participants">{remoteParticipants}</div>
          </Card>
        </div>
      );
    }
};

export default Room;