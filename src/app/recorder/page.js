'use client'

import { useEffect, useState } from "react";
import { ReactMediaRecorder } from "react-media-recorder-2";

const AudioRecorder = () => {
  // State to keep track of the current blob URL
  const [blobUrl, setBlobUrl] = useState("");

  // Effect hook to log the blob URL whenever it changes
  useEffect(() => {
    if (blobUrl) {
      console.log(blobUrl);
      fetch(blobUrl)
        .then(res => res.blob())
        .then(blob => {
          console.log('logging blob');
          console.log(blob);
          // Create a FormData object to send the blob as a file
          const formData = new FormData();
          formData.append('file', blob, 'audio.wav'); // 'audio.wav' is the filename for the blob
          console.log(formData.get('file'));
          // Send the FormData to your Next.js API route
          fetch('/api/recorder', {
            method: 'POST',
            body: formData,
          })
          .then(response => response.json())
          .then(data => {
            console.log('Upload successful', data);
          })
          .catch(error => {
            console.error('Error uploading:', error);
          });
        });
    }
  }, [blobUrl]);

  return (
    <div>
      <ReactMediaRecorder
        audio
        onStop={(blobUrl) => setBlobUrl(blobUrl)}
        render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
          <div>
            <div className="bg-indigo-900 text-center py-4 lg:px-4">
              <div className="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
                <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">Status</span>
                <span className="font-semibold mr-2 text-left flex-auto">{status}</span>
                <svg className="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
              </div>
            </div>
            <div style={{marginLeft: 590}}>
              <button 
                className="bg-gray-300 mx-4 my-5 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                onClick={startRecording}>
                Start Recording
              </button>
              <button 
                className="bg-gray-300 mx-4 my-5 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                onClick={stopRecording}>
                Stop Recording
              </button>
              <audio className="mx-8" src={mediaBlobUrl} controls autoPlay loop />
            </div>
          </div>
        )}
      />
    </div>
  )
};

export default AudioRecorder;
