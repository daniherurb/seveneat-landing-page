import './App.css'
import { useState } from 'react'
import logo from './assets/logo.png'
import { MdModeNight } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCalendar, IoCartOutline, IoHomeOutline, IoBookOutline, IoSettingsOutline} from "react-icons/io5";

function App() {
    const [open, setOpen] = useState(false);

    const toggleMenu = () => setOpen(!open);
  return (
      <div className="flex flex-col">
      <div className="sticky top-0 flex flex-row items-center justify-center w-full h-21 bg-white shadow-md ">
          <div className="flex flex-row items-center justify-between h-full w-full max-w-7xl">
              <div className="flex flex-row h-full items-center m-2 gap-2">
                  <img src={logo} alt="logo" className="w-auto h-8/10 aspect-square"/>
                  <p className="text-3xl font-bold text-(--red)"> Seveneat</p>
              </div>
              <GiHamburgerMenu className={`text-2xl text-(--red) mt-1 mr-4 transform transition duration-400 ${open ? '-rotate-90' : ''} hover: cursor-pointer md:hidden`} onClick={toggleMenu}/>
              <div className="hidden md:flex flex-row gap-4 items-center mr-4">
                  <button className="p-3 bg-(--green) border-2 border-(--green) rounded-md text-(--white) font-bold">Join waitlist!</button>
                  <button className="p-3 border-2 border-(--green) rounded-md text-(--green)">Learn more</button>
                  <p className="text-(--red) text-md">ES</p>
                  <MdModeNight className="text-(--red) text-md rotate-150 mt-0.5"></MdModeNight>
              </div>
          </div>
      </div>
      {open &&
          <div className = "fixed flex flex-col items-center p-3 right-2 top-21 bg-white rounded-md mr-3 mt-3 gap-2 shadow-lg md:hidden">
              <button className="p-3 bg-(--green) border-2 border-(--green) rounded-md text-(--white) font-bold">Join waitlist now!</button>
              <button className="p-3 bg-(--white) border-2 border-(--green) rounded-md text-(--green) font-bold w-full">Learn more</button>
              <div className="flex flex-row align-center justify-around w-9/10">
                  <MdModeNight className="text-xl text-(--red) rotate-150 mt-1.5"></MdModeNight>
                  <p className="text-xl text-(--red)">ES</p>
              </div>
          </div>
      }
      <div className="flex flex-row self-center w-8/10 justify-between mt-12">
          <div className="w-5/10">Transform Your Meal Planning with AI-Powered Intelligence</div>
        <div className="w-fit">
      <div className = "bg-gray-800 w-90 h-160 rounded-[40px] m-4 p-[20px]">
            <div className = "flex flex-col bg-white w-full h-full rounded-[20px]">
                <div className = "flex bg-(--green) h-1/10 w-full rounded-t-[20px] items-end justify-between">
                    <p className = "m-3 text-lg text-(--white) font-bold">Today's plan</p>
                    <div className = "m-2.5 bg-(--red) p-2 text-white font-bold rounded-xl text-xs">Weekly</div>
                </div>
                <div className="flex flex-row w-full h-8/10">
                    <div className="flex flex-col w-2/10 gap-[16px] align-middle items-center mt-7">
                        <p>9:00</p>
                        <p>10:00</p>
                        <p>11:00</p>
                        <p>12:00</p>
                        <p>13:00</p>
                        <p>14:00</p>
                        <p>15:00</p>
                        <p>16:00</p>
                        <p>17:00</p>
                        <p>18:00</p>
                        <p>19:00</p>
                        <p>20:00</p>
                    </div>
                    <div className="flex flex-col items-center bg-[repeating-linear-gradient(0deg,var(--grey)_0px,var(--grey)_2px,var(--white)_2px,var(--white)_40px)] h-full w-8/10">
                        <div className="flex flex-col w-9/10 h-3/20 bg-(--light-grey) p-2 rounded-xl mt-2">
                            <p className="text-(--red) font-bold text-lg">Avocado toasts</p>
                            <div className="flex flex-row gap-2 items-center">
                                <p className="text-(--dark-green) text-md">Healthiness:</p>
                                <div className="flex flex-row justify-between gap-1">
                                    <p className="mt-0.5 w-3 h-3 bg-(--green) rounded-4xl"></p>
                                    <p className="mt-0.5 w-3 h-3 bg-(--green) rounded-4xl"></p>
                                    <p className="mt-0.5 w-3 h-3 bg-(--green) rounded-4xl"></p>
                                    <p className="mt-0.5 w-3 h-3 bg-(--green) rounded-4xl"></p>
                                    <p className="mt-0.5 w-3 h-3 bg-(--green) rounded-4xl"></p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col w-9/10 h-3/20 bg-(--light-grey) p-2 rounded-xl mt-30">
                            <p className="text-(--red) font-bold text-lg">Chicken with potatoes</p>
                            <div className="flex flex-row gap-2 items-center">
                                <p className="text-(--dark-green) text-md">Healthiness:</p>
                                <div className="flex flex-row justify-between gap-1">
                                    <p className="mt-0.5 w-3 h-3 bg-(--green) rounded-4xl"></p>
                                    <p className="mt-0.5 w-3 h-3 bg-(--green) rounded-4xl"></p>
                                    <p className="mt-0.5 w-3 h-3 bg-(--green) rounded-4xl"></p>
                                    <p className="mt-0.5 w-3 h-3 bg-(--grey) rounded-4xl"></p>
                                    <p className="mt-0.5 w-3 h-3 bg-(--grey) rounded-4xl"></p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col w-9/10 h-3/20 bg-(--light-grey) p-2 rounded-xl mt-30">
                            <p className="text-(--red) font-bold text-lg">Fruit salad with yogurt</p>
                            <div className="flex flex-row gap-2 items-center">
                                <p className="text-(--dark-green) text-md">Healthiness:</p>
                                <div className="flex flex-row justify-between gap-1">
                                    <p className="mt-0.5 w-3 h-3 bg-(--green) rounded-4xl"></p>
                                    <p className="mt-0.5 w-3 h-3 bg-(--green) rounded-4xl"></p>
                                    <p className="mt-0.5 w-3 h-3 bg-(--green) rounded-4xl"></p>
                                    <p className="mt-0.5 w-3 h-3 bg-(--green) rounded-4xl"></p>
                                    <p className="mt-0.5 w-3 h-3 bg-(--green) rounded-4xl"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className = "flex flex-row bg-(--red) h-1/10 w-full rounded-b-[20px] items-center justify-around text-2xl text-white">
                    <IoCalendar/>
                    <IoCartOutline/>
                    <IoHomeOutline/>
                    <IoBookOutline/>
                    <IoSettingsOutline/>
                </div>
            </div>
      </div>
        </div>
      </div>
      </div>
  )
}

export default App
