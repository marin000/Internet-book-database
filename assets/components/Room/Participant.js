import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { LocalTrackPublication } from 'twilio-video';

const Participant = ({ participant }) => {
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);
  const videoRef = useRef();
  const audioRef = useRef();
  const [mic,setMic] = useState(true);
  const [cam,setCam] = useState(true);

  const trackpubsToTracks = trackMap => Array.from(trackMap.values())
    .map(publication => publication.track)
    .filter(track => track !== null);

  useEffect(() => {
    const trackSubscribed = track => {
      if (track.kind === 'video') {
        setVideoTracks(videoTracks => [...videoTracks, track]);
      } else {
        setAudioTracks(audioTracks => [...audioTracks, track]);
      }
    };

    const trackUnsubscribed = track => {
      if (track.kind === 'video') {
        setVideoTracks(videoTracks => videoTracks.filter(v => v !== track));
      } else {
        setAudioTracks(audioTracks => audioTracks.filter(a => a !== track));
      }
    };

    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    setAudioTracks(trackpubsToTracks(participant.audioTracks));

    participant.on('trackSubscribed', trackSubscribed);
    participant.on('trackUnsubscribed', trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant])

  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    }
    }, [videoTracks]);

    useEffect(() => {
        const audioTrack = audioTracks[0];
        if (audioTrack) {
            audioTrack.attach(audioRef.current);
            return () => {
                audioTrack.detach();
            };
        }
    }, [audioTracks]);

  function videoOff() {
    participant.videoTracks.forEach(publication => {
      publication.track.disable();
    });
    setCam(false);
  }

  function videoOn() {
    participant.videoTracks.forEach(publication => {
      publication.track.enable();
    });
    setCam(true);
  }

  function audioOff() {
    participant.audioTracks.forEach(publication => {
      publication.track.disable();
    });
    setMic(false);
  }
  function audioOn() {
    participant.audioTracks.forEach(publication => {
      publication.track.enable();
    });
    setMic(true);
  }
  console.log(localStorage.getItem('username'));

  return (
    <div className="participant">
      <h3>{participant.identity}<div className="paricipant-button">
        { participant.identity===localStorage.getItem('username') ? cam ? 
          <Button label="Turn Off" icon="pi pi-video" onClick={videoOff}/>
        : <Button label="Turn On" icon="pi pi-video" onClick={videoOn}/> :""
        }
        {participant.identity===localStorage.getItem('username') ? mic ? 
          <Button label="Turn Off" icon="pi pi-volume-down" onClick={audioOff}/>
        : <Button label="Turn On" icon="pi pi-volume-down" onClick={audioOn}/> :""
      }
      </div></h3>
      
      <video ref={videoRef} autoPlay={true} />
      <audio ref={audioRef} autoPlay={true} muted={false} />
    </div>
  );
};

export default Participant;
