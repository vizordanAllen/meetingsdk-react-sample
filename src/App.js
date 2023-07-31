import React, { useState } from 'react';

import './App.css';
import { ZoomMtg } from '@zoomus/websdk';
import * as ZoomVideo from '@zoom/videosdk';

ZoomMtg.setZoomJSLib('https://source.zoom.us/2.14.0/lib', '/av');

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');

function App() {

  console.log(process.env.REACT_APP_SDK)

  const [meetingId, setMeetingId] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState('')
  const [userEmail, setUserEmail] = useState('')


  var authEndpoint = 'http://localhost:4000'
  var sdkKey = process.env.REACT_APP_SDK

  var role = 0
  var registrantToken = ''
  var zakToken = ''
  var leaveUrl = 'http://localhost:3000'

  function getSignature(e) {
    if (!meetingId || !password) {
      alert("Meeting id and password is required")
      return
    }
    e.preventDefault();

    fetch(authEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        meetingNumber: meetingId,
        role: role
      })
    }).then(res => res.json())
      .then(response => {
        startMeeting(response.signature)
      }).catch(error => {
        console.error(error)
        alert("something went wrong !")
      })
  }

  async function startMeeting(signature) {
    document.getElementById('zmmtg-root').style.display = 'block'

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      success: (success) => {
        console.log(success)

        ZoomMtg.join({
          signature: signature,
          sdkKey: sdkKey,
          meetingNumber: meetingId,
          passWord: password,
          userName: userName,
          userEmail: userEmail,
          tk: registrantToken,
          zak: zakToken,
          success: (success) => {
            console.log(success)
          },
          error: (error) => {
            console.log(error)
          }
        })

      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  const meetingChange = (e) => {
    let value = e.target.value.split(" ").join("")
    setMeetingId(value)
  }

  return (
    <div className="App">
      <main>
        <h1>Zoom Meeting SDK Sample React</h1>

        <div>
          <input value={meetingId} onChange={meetingChange} placeholder='Meeting Number' />
          <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder='passcode' />

        </div>
        <div>
          <input value={user} onChange={(e) => setUser(e.target.value)} placeholder='User Name' />
          <input value={userEmail} onChange={(e) => setUserEmail(e.target.value)} placeholder='email' />
        </div>

        <button onClick={getSignature}>Join Meeting</button>
      </main>
    </div>
  );
}

export default App;
