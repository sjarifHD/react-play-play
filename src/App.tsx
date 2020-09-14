import React from 'react'
import logo from './logo.svg'
import './App.css'
import fetch from 'node-fetch'
import msgpack from 'msgpack-lite'

function App() {

  const BASE_URL = "http://localhost:2516"

  const getFeedLogs = async () => {
    const response = await fetch(`${BASE_URL}/`)
    const feedlogs = await response.json()
    console.log(feedlogs)
  }

  const getFeedLogsGzip = async () => {
    const response = await fetch(`${BASE_URL}/gzip`)
    const feedlogs = await response.json()
    console.log(feedlogs)
  }

  const getFeedLogsMsgpack = async () => {
    const response = await fetch(`${BASE_URL}/msgpack`)

    const hexRes = await response.text()
    const binRes = hexStringToByte(hexRes)
    const feedlogs = msgpack.decode(binRes)
    console.log(feedlogs)

    // const feedlogs = msgpack.decode(new Buffer(await response.arrayBuffer()))
    // console.log(hexRes)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button style={{marginTop: 16, marginBottom: 16}} onClick={getFeedLogs}>
          Get FeedLogs 
        </button>
        <button style={{marginTop: 16, marginBottom: 16}} onClick={getFeedLogsGzip}>
          Get FeedLogs Gzip
        </button>
        <button style={{marginTop: 16, marginBottom: 16}} onClick={getFeedLogsMsgpack}>
          Get FeedLogs Msgpack
        </button>
      </header>
    </div>
  )
}

function hexStringToByte(str: String) {
  if (!str) {
    return new Uint8Array()
  }
  
  let a = []
  for (let i = 0, len = str.length; i < len; i += 2) {
    a.push(parseInt(str.substr(i,2),16))
  }
  
  return new Uint8Array(a)
}

export default App
