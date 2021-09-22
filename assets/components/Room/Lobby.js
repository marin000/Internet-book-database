import React, { useState, useEffect } from 'react';
import { Panel } from 'primereact/panel';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';

const Lobby = ({
  roomName,
  handleRoomNameChange,
  handleSubmit
}) => {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
      fetch(`https://localhost:8000/api/getMeetings`, {mode: 'no-cors'})
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setMeetings(result);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [])

  if (error) {
      return <div>Error: {error.message}</div>;
  } 
  else if (!isLoaded) {
      return <div>Loading...</div>;
  } 
  else{
    return (
      <div>
      <Panel>
        <div className="lobby">
        <div className="lobby-header">
          <h4>List of scheduled meetings</h4>
          <Divider />
        </div>
          <form className="lobby-form" onSubmit={handleSubmit}>
            <h5>Enter a room you want to join:</h5>
            <div>
              <input
                type="text"
                id="room"
                value={roomName}
                onChange={handleRoomNameChange}
                required
              />
            </div>
              <Button label="Join" type="submit" />
          </form>
          <Divider />
          <div className="header">
              <DataTable value={meetings} stripedRows sortField="DateAndTime" sortOrder={-1}>
                <Column field='Name' header="Name"></Column>
                <Column field='DateAndTime' header="Date and time"></Column>
                <Column field='Room' header="Room"></Column>
                <Column field='Description' header="Description"></Column>
              </DataTable>
          </div>
          </div>
      </Panel>
    </div>
    );
  }
};

export default Lobby;
