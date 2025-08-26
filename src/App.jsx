import { useState } from 'react'
import './App.css'
import logo from './assets/logo.png'
import { MdModeNight } from "react-icons/md";

function App() {

  return (
      <div className="flex flex-row items-center justify-between w-dvw h-21 shadow-xl ">
          <img src={logo} alt="logo" className="w-auto h-8/10 pl-2"/>
          <div className="flex flex-row gap-4 pr-4 items-center">
              <button className="p-3 bg-green-600 rounded-md text-amber-50">Join waitlist!</button>
              <button className="p-3 border-2 border-green-600 rounded-md text-green-600">Learn more</button>
              <p className="text-green-600 text-md">ES</p>
              <MdModeNight className="text-green-700 text-md"></MdModeNight>
          </div>
      </div>
  )
}

export default App
