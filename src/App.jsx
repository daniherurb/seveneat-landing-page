import './App.css'
import { useState } from 'react'
import logo from './assets/logo.png'
import { MdModeNight, MdKeyboardVoice } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCalendar, IoCartOutline, IoHomeOutline, IoBookOutline, IoSettingsOutline, IoCameraOutline} from "react-icons/io5";
import { TbInputAi } from "react-icons/tb";
import { FaBowlFood, FaRobot } from "react-icons/fa6";
import { FaShoppingCart, FaCheck } from "react-icons/fa";
import { RiHealthBookFill } from "react-icons/ri";
import { IoIosInfinite } from "react-icons/io";
import { AiOutlineFieldTime } from "react-icons/ai";
import { LuBrainCircuit, LuClipboardPlus } from "react-icons/lu";

function App() {
    const [open, setOpen] = useState(false);

    const toggleMenu = () => setOpen(!open);
  return (
      <div className="flex flex-col justify-center w-full overflow-x-hidden">
          <div className="fixed top-0 left-0 right-0 flex flex-row items-center justify-between w-full h-20 bg-white shadow-md">
              <div className="flex flex-row h-full items-center m-2 gap-2">
                  <img src={logo} alt="logo" className="w-auto h-8/10 aspect-square"/>
                  <p className="text-2xl font-bold text-(--red)"> Seveneat</p>
              </div>
              <GiHamburgerMenu className={`text-2xl text-(--red) mt-1 mr-8 transform transition duration-400 ${open ? '-rotate-90' : ''} hover: cursor-pointer md:hidden`} onClick={toggleMenu}/>
              <div className="hidden md:flex flex-row gap-4 items-center mr-8">
                  <button className="p-3 bg-(--green) border-2 border-(--green) rounded-md text-(--white) font-bold">Join waitlist!</button>
                  <button className="p-3 border-2 border-(--green) rounded-md text-(--green)">Learn more</button>
                  <p className="text-(--red) text-md">ES</p>
                  <MdModeNight className="text-(--red) text-md rotate-150 mt-0.5"></MdModeNight>
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
      <div className="grid md:grid-cols-2 items-center max-w-7xl self-center p-5 mt-27 gap-6">
          <div className="flex flex-col w-fit gap-6 bg-gradient-to-r from-green-600 via-red-400 to-red-700 bg-clip-text">
              <div className="text-5xl md:text-6xl font-bold text-(--dark-green) text-center md:text-start h-fit w-fit">Transform Your Meal Planning with
                  <div className = "text-transparent leading-none">AI-Powered Intelligence</div></div>
              <div className="text-lg md:text-xl text-gray-500 text-center md:text-start">Seveneat learns your eating habits and generates personalized weekly meal plans.
                  Add meals through voice, photos, or simple prompts, then let our AI create perfect weekly calendars with automatic shopping lists.</div>
              <div className="flex flex-row gap-3 justify-center md:justify-start">
                  <button className="p-4 bg-(--red) border-2 border-(--red) rounded-md text-(--white) font-bold text-l">Join waitlist now!</button>
                  <button className="p-4 border-2 border-(--red) rounded-md text-(--red) text-l items-center md:justify-items-start">Learn more</button>
              </div>
          </div>
        <div className="flex items-center justify-center">
      <div className = "bg-gray-800 w-80 h-160 rounded-[40px] m-4 p-[20px] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.4)]">
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
                            <p className="text-(--red) font-bold text-md">Avocado toasts</p>
                            <div className="flex flex-row gap-2 items-center">
                                <p className="text-(--dark-green) text-sm">Healthiness:</p>
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
                            <p className="text-(--red) font-bold text-md">Chicken with potatoes</p>
                            <div className="flex flex-row gap-2 items-center">
                                <p className="text-(--dark-green) text-sm">Healthiness:</p>
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
                            <p className="text-(--red) font-bold text-md">Fruit salad with yogurt</p>
                            <div className="flex flex-row gap-2 items-center">
                                <p className="text-(--dark-green) text-sm">Healthiness:</p>
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
          <div className="flex flex-col bg-(--dark-green) h-fit items-center text-center mt-10 pb-8">
              <div className="mt-13 text-3xl font-bold md:text-4xl w-9/10 text-white">Intelligent Meal Planning Made Simple</div>
              <div className="mt-5 text-md md:text-lg w-9/10 text-white">Discover how Seveneat revolutionizes the way you plan, shop, and enjoy your meals.</div>
              <div className="grid md:grid-cols-2 h-fit gap-4 items-center mt-7 w-9/10 justify-between max-w-330">
                        <div className="h-full w-full flex flex-col items-start border-1 bg-white min-w-40 p-5 rounded-2xl gap-4">
                            <FaBowlFood className="text-(--red) text-5xl"></FaBowlFood >
                            <div className="bg-gray-100 w-full h-[2px] rounded-4xl"/>
                            <div className="text-(--dark-green) text-xl font-bold">Add Meals Your Way</div>
                            <div className="text-(--grey) text-md text-start">Add new meals to your collection using voice commands,
                                photo recognition, or simple text prompts - whatever feels natural to you.</div>
                            <div className={"flex flex-col self-start text-start text-md ml-2 gap-2.5"}>
                                <div className="flex flex-row items-start gap-2 text-gray-600"><MdKeyboardVoice className={"mt-1 min-w-5 min-h-5 text-(--red)"}></MdKeyboardVoice>Voice dictation</div>
                                <div className="flex flex-row items-start gap-2 text-gray-600"><IoCameraOutline className={"mt-1 min-w-5 min-h-5 text-(--red)"}></IoCameraOutline>Photo meal detection</div>
                                <div className="flex flex-row items-start gap-2 text-gray-600"><TbInputAi className={"mt-1 min-w-5 min-h-5 text-(--red)"}></TbInputAi>AI text prompts</div>
                            </div>
                        </div>
                  <div className="flex flex-col w-full items-start border-1 bg-white min-w-40 p-5 rounded-2xl gap-4 h-full">
                      <FaRobot className="text-(--red) text-5xl"></FaRobot >
                      <div className="bg-gray-100 w-full h-[2px] rounded-4xl"/>
                      <div className="text-(--dark-green) text-xl font-bold">AI-Generated Weekly Plans</div>
                      <div className="text-(--grey) text-md text-start">Our intelligent algorithm analyzes your meal preferences, dietary restrictions, and eating patterns to create perfectly balanced weekly meal calendars.</div>
                      <div className={"flex flex-col self-start text-start text-md ml-2 gap-2.5"}>
                          <div className="flex flex-row items-start gap-2 text-gray-600"><FaCheck className={"mt-1.5 min-w-4 min-h-4 text-(--red)"}></FaCheck>Learns your taste preferences</div>
                          <div className="flex flex-row items-start gap-2 text-gray-600"><FaCheck className={"mt-1.5 min-w-4 min-h-4 text-(--red)"}></FaCheck>Considers your health goals</div>
                          <div className="flex flex-row items-start gap-2 text-gray-600"><FaCheck className={"mt-1.5 min-w-4 min-h-4 text-(--red)"}></FaCheck>Balances nutrition automatically</div>
                      </div>
                  </div>
                  <div className="flex flex-col w-full items-start border-1 bg-white min-w-40 p-5 rounded-2xl gap-4 h-full">
                      <FaShoppingCart className="text-(--red) text-5xl"></FaShoppingCart >
                      <div className="bg-gray-100 w-full h-[2px] rounded-4xl"/>
                      <div className="text-(--dark-green) text-xl font-bold">Automatic Shopping Lists</div>
                      <div className="text-(--grey) text-md text-start">Once your weekly plan is ready, get a comprehensive shopping list with all ingredients organized by category for efficient grocery trips.</div>
                      <div className={"flex flex-col self-start text-start text-md ml-2 gap-2.5"}>
                          <div className="flex flex-row items-start gap-2 text-gray-600"><FaCheck className={"mt-1.5 min-w-4 min-h-4 text-(--red)"}></FaCheck>Ingredient consolidation</div>
                          <div className="flex flex-row items-start gap-2 text-gray-600"><FaCheck className={"mt-1.5 min-w-4 min-h-4 text-(--red)"}></FaCheck>Category organization</div>
                          <div className="flex flex-row items-start gap-2 text-gray-600"><FaCheck className={"mt-1.5 min-w-4 min-h-4 text-(--red)"}></FaCheck>Quantity optimization</div>
                      </div>
                  </div>
                  <div className="flex flex-col w-full items-start border-1 bg-white min-w-40 p-5 rounded-2xl gap-4 h-full">
                      <RiHealthBookFill className="text-(--red) text-5xl"></RiHealthBookFill >
                      <div className="bg-gray-100 w-full h-[2px] rounded-4xl"/>
                      <div className="text-(--dark-green) text-xl font-bold">Nutrition Intelligence</div>
                      <div className="text-(--grey) text-md text-start">Track calories and protein intake effortlessly. Rate your meals for taste and health, and our AI will optimize future recommendations.</div>
                      <div className={"flex flex-col self-start text-start text-md ml-2 gap-2.5"}>
                          <div className="flex flex-row items-start gap-2 text-gray-600"><FaCheck className={"mt-1.5 min-w-4 min-h-4 text-(--red)"}></FaCheck>Daily calorie tracking</div>
                          <div className="flex flex-row items-start gap-2 text-gray-600"><FaCheck className={"mt-1.5 min-w-4 min-h-4 text-(--red)"}></FaCheck>Protein intake monitoring</div>
                          <div className="flex flex-row items-start gap-2 text-gray-600"><FaCheck className={"mt-1.5 min-w-4 min-h-4 text-(--red)"}></FaCheck>Personalized health scoring</div>
                      </div>
                  </div>
              </div>
          </div>
          <div className={"flex flex-col w-9/10 mt-10 h-fit items-center p-7 self-center rounded-2xl mb-4 bg-gradient-to-r from-green-500 to-red-500 max-w-330 backdrop-blur-md"}>
              <div className="text-3xl font-bold md:text-4xl w-9/10 text-(--white) text-center">Take Meal Planning to the Next Level</div>
              <div className="mt-5 text-md md:text-lg w-9/10 text-white text-center">Discover how Seveneat revolutionizes the way you plan, shop, and enjoy your meals.</div>
              <div className={"grid grid-cols-2 md:grid-cols-4 w-9/10 mt-10 max-w-300 gap-10 h-fit gap-x-0 md:gap-x-10"}>
                  <div className={"flex flex-col h-full items-center gap-2"}>
                      <IoIosInfinite className={"text-7xl md:text-8xl aspect-square text-white drop-shadow-md"}></IoIosInfinite>
                      <div className={"text-md md:text-lg text-center text-white"}>Unlimited AI use</div>
                  </div>
                  <div className={"flex flex-col h-full items-center gap-2"}>
                      <LuClipboardPlus  className={"text-7xl md:text-8xl aspect-square text-white drop-shadow-md"}></LuClipboardPlus >
                      <div className={"text-md md:text-lg text-center text-white"}>Advanced planning</div>
                  </div>
                  <div className={"flex flex-col h-full items-center gap-2"}>
                      <LuBrainCircuit className={"text-6xl md:text-8xl aspect-square text-white drop-shadow-md"}></LuBrainCircuit>
                      <div className={"text-md md:text-lg text-center text-white"}>Better AI model</div>
                  </div>
                  <div className={"flex flex-col h-full items-center gap-2"}>
                      <AiOutlineFieldTime className={"text-6xl md:text-8xl aspect-square text-white drop-shadow-md"}></AiOutlineFieldTime>
                      <div className={"text-md md:text-lg text-center text-white"}>Early access to new features</div>
                  </div>
              </div>
              <div className={"flex flex-col h-fit mt-15"}>
                  <div className={"flex flex-row items-end"}>
                      <div className="w-9/10 text-center text-5xl font-bold text-white drop-shadow-xl">$3.99</div><div className={"text-white"}>/mo</div>
                  </div>
                  <div className={"flex flex-row items-center justify-center mt-2"}>
                      <div className="text-s text-white">$37.99/year</div>
                  </div>
              </div>

          </div>
      </div>
  )
}

export default App
