import React from 'react';
import { ChatEngine } from 'react-chat-engine';
import './Chat.css';
import { Card } from 'primereact/card';

function Chat() {

    const projectID = 'chat engine id';

    return(
        <div>
        <Card>
        <h3 className="chat-head">Communicate with other people</h3>
        </Card>
            <ChatEngine
                height="100vh"
                projectID={projectID}
                userName={localStorage.getItem('username')}
                userSecret={localStorage.getItem('chatSecret')}
            />
        </div>
    );
}
export default Chat;
