import "./App.css";
import { useState, useEffect } from "react";
import logo from "./assets/logo.png";
import {
  MdKeyboardVoice,
  MdDesignServices,
  MdOutlineEmail,
} from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  IoCalendar,
  IoCartOutline,
  IoHomeOutline,
  IoBookOutline,
  IoSettingsOutline,
  IoCameraOutline,
} from "react-icons/io5";
import { TbInputAi } from "react-icons/tb";
import { FaBowlFood, FaRobot, FaClipboardCheck } from "react-icons/fa6";
import { FaShoppingCart, FaCheck } from "react-icons/fa";
import { RiHealthBookFill } from "react-icons/ri";
import { IoIosInfinite } from "react-icons/io";
import { AiOutlineFieldTime } from "react-icons/ai";
import { LuBrainCircuit, LuClipboardPlus } from "react-icons/lu";

function App() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [language, setLanguage] = useState(false);
  const [email, setEmail] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Check if the page was loaded with Spanish HTML
    const rootElement = document.getElementById("root");
    const pageLang = rootElement?.getAttribute("data-lang");

    if (pageLang === "es") {
      setLanguage(true);
    } else {
      // Fallback to browser language detection
      let browserLanguage = window.navigator.language || navigator.language;
      if (browserLanguage && browserLanguage.startsWith("es")) {
        setLanguage(true);
      }
    }
  }, []);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const joinWaitlist = async () => {
    try {
      const response = await fetch("/emailwaitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          locale: language ? "es" : "en",
          email: email,
        }),
      });
      const data = await response.json();

      if (response.status === 201 || (response.ok && data.success)) {
        showNotification(
          language
            ? "¡Correo añadido exitosamente!"
            : "Email added successfully!",
          "success",
        );
        setEmail("");
      } else if (response.status === 409) {
        // Email already exists
        showNotification(
          language
            ? "Este correo ya está en nuestra lista de espera"
            : "This email is already on our waitlist",
          "error",
        );
      } else if (response.status === 400) {
        // Invalid email format
        showNotification(
          language ? "Formato de correo inválido" : "Invalid email format",
          "error",
        );
      } else {
        // Generic error
        showNotification(
          language
            ? "Error al añadir el correo. Por favor, inténtalo de nuevo."
            : "Error adding email. Please try again.",
          "error",
        );
      }
      return data;
    } catch (error) {
      console.error("Error joining waitlist:", error);
      showNotification(
        language
          ? "Error al conectar con el servidor. Por favor, inténtalo de nuevo."
          : "Error connecting to server. Please try again.",
        "error",
      );
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const switchMode = () => {
    setDark(!dark);
  };

  const switchLanguage = () => {
    setLanguage(!language);
  };

  useEffect(() => {
    const storedDark = localStorage.getItem("darkMode");
    const storedLanguage = localStorage.getItem("language");

    if (storedDark === "true") {
      setDark(true);
    }

    if (storedLanguage === "true") {
      setLanguage(true);
    }
  }, []);

  useEffect(() => {
    if (dark) {
      localStorage.setItem("darkMode", "true");
    } else {
      localStorage.removeItem("darkMode");
    }
  }, [dark]);

  useEffect(() => {
    if (language) {
      localStorage.setItem("language", "true");
    } else {
      localStorage.removeItem("language");
    }
  }, [language]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 765px)");

    const handleChange = (e) => {
      if (e.matches) {
        setOpen(false);
      }
    };

    handleChange(mediaQuery);
    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const toggleMenu = () => setOpen(!open);

  return (
    <div
      className={`${dark ? "dark" : ""} flex flex-col justify-center w-full overflow-x-hidden dark:bg-(--background-dark-green)`}
    >
      {notification && (
        <div
          className={`fixed top-24 right-4 md:right-8 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out ${
            notification.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          } animate-slide-in`}
        >
          <div className="flex items-center gap-3">
            {notification.type === "success" ? (
              <FaCheck className="text-xl" />
            ) : (
              <span className="text-xl font-bold">⚠</span>
            )}
            <p className="font-medium">{notification.message}</p>
            <button
              onClick={() => setNotification(null)}
              className="ml-2 text-white hover:text-gray-200 transition-colors"
              aria-label="Close notification"
            >
              <span className="text-xl font-bold">✕</span>
            </button>
          </div>
        </div>
      )}
      <div className="fixed top-0 left-0 right-0 flex flex-row items-center justify-between w-full h-20 bg-white dark:bg-(--dark-green) shadow-md z-10">
        <a href={"/"} className="flex flex-row h-full items-center m-2 gap-2">
          <img
            src={logo}
            alt="Seveneat Logo"
            className="w-auto h-8/10 aspect-square"
          />
          <p className="text-2xl font-bold text-(--red)">Seveneat</p>
        </a>
        <GiHamburgerMenu
          className={`text-2xl text-(--red) mt-1 mr-8 transform transition duration-400 ${open ? "-rotate-90" : ""} hover: cursor-pointer md:hidden`}
          onClick={toggleMenu}
          aria-label={
            language ? "Abrir menú de navegación" : "Open navigation menu"
          }
          aria-expanded={open}
          role="button"
          tabIndex={0}
        />
        <div className="hidden md:flex flex-row gap-4 items-center mr-8">
          <a href={"#waitlist"}>
            <button className="p-3 bg-(--red) border-2 border-(--red) rounded-md text-(--white) font-bold button-animate dark:bg-(--green) dark:border-(--green)">
              {language ? "Quiero probarlo" : "I want to try it"}
            </button>
          </a>
          <a href={"#learn-more"}>
            <button className="p-3 border-2 border-(--red) rounded-md text-(--red) button-animate dark:border-(--green) dark:text-(--green)">
              {language ? "Conocer más" : "Learn more"}
            </button>
          </a>
          <p
            className="text-(--red) text-md dark:text-(--green) language font-bold"
            onClick={switchLanguage}
            aria-label={
              language
                ? "Cambiar idioma a inglés"
                : "Switch language to Spanish"
            }
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && switchLanguage()}
          >
            {language ? "EN" : "ES"}
          </p>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              className="sr-only peer"
              type="checkbox"
              checked={dark}
              onClick={switchMode}
              aria-label={
                language
                  ? dark
                    ? "Cambiar a modo claro"
                    : "Cambiar a modo oscuro"
                  : dark
                    ? "Switch to light mode"
                    : "Switch to dark mode"
              }
            />
            <div className="w-20 h-10 rounded-full bg-gradient-to-r from-(--red) to-(--dark-red) peer-checked:from-(--background-dark-green) peer-checked:to-(--green) transition-all duration-500 after:content-['☀️'] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-8 after:w-8 after:flex after:items-center after:justify-center after:transition-all after:duration-500 peer-checked:after:translate-x-10 peer-checked:after:content-['🌙'] after:shadow-md after:text-lg"></div>
          </label>
        </div>
      </div>
      {open && (
        <div className="min-w-50 fixed flex flex-col items-center p-3 right-2 top-21 bg-white rounded-md mr-3 mt-3 gap-2 shadow-lg md:hidden z-13 dark:bg-(--dark-green) dark:border-(--green) dark:border-3">
          <a href={"#waitlist"} className={"w-full"}>
            <button className="w-full p-3 bg-(--red) border-2 border-(--red) rounded-md text-(--white) font-bold button-animate dark:bg-(--green) dark:border-(--green)">
              {language ? "Quiero probarlo" : "I want to try it"}
            </button>
          </a>
          <a href={"#learn-more"} className={"w-full"}>
            <button className="w-full p-3 bg-(--white) border-2 border-(--red) rounded-md text-(--red) font-bold button-animate dark:bg-(--dark-green) dark:border-(--green) dark:text-(--green)">
              {language ? "Conocer más" : "Learn more"}
            </button>
          </a>
          <div className="flex flex-row align-center justify-between w-9/10 items-center mt-2">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                className="sr-only peer"
                type="checkbox"
                checked={dark}
                onClick={switchMode}
                aria-label={
                  language
                    ? dark
                      ? "Cambiar a modo claro"
                      : "Cambiar a modo oscuro"
                    : dark
                      ? "Switch to light mode"
                      : "Switch to dark mode"
                }
              />
              <div className="w-20 h-10 rounded-full bg-gradient-to-r from-(--red) to-(--dark-red) peer-checked:from-(--background-dark-green) peer-checked:to-(--green) transition-all duration-500 after:content-['☀️'] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-8 after:w-8 after:flex after:items-center after:justify-center after:transition-all after:duration-500 peer-checked:after:translate-x-10 peer-checked:after:content-['🌙'] after:shadow-md after:text-lg"></div>
            </label>
            <p
              className="text-(--red) text-md dark:text-(--green) language font-bold"
              onClick={switchLanguage}
              aria-label={
                language
                  ? "Cambiar idioma a inglés"
                  : "Switch language to Spanish"
              }
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && switchLanguage()}
            >
              {language ? "EN" : "ES"}
            </p>
          </div>
        </div>
      )}
      <div className="grid md:grid-cols-2 items-center max-w-7xl self-center p-5 pt-27 gap-6">
        <div className="flex flex-col w-fit gap-6 bg-gradient-to-r from-green-600 via-red-400 to-red-700 bg-clip-text">
          <div className="text-5xl md:text-6xl font-bold text-(--dark-green) text-center md:text-start h-fit w-fit dark:text-white">
            {language
              ? "Deja de pensar qué cocinar."
              : "Stop thinking about what to cook."}
            <div className="text-transparent leading-none">
              {language ? "Empieza a disfrutarlo." : "Start enjoying it."}
            </div>
          </div>
          <div className="text-lg md:text-xl text-gray-500 text-center md:text-start fadeInFromUp md:fadeInFromLeft dark:text-white">
            {language
              ? "Ya sabes cocinar. Ya tienes tus comidas. Solo necesitas que alguien decida por ti. Nosotros lo hacemos. Tú solo cocinas lo que ya sabes hacer."
              : "You already know how to cook. You already have your meals. You just need someone to decide for you. We do that. You just cook what you already know how to make."}
          </div>
          <div className="flex flex-row gap-3 justify-center md:justify-start fadeInFromUp md:fadeInFromLeft">
            <a href={"#waitlist"}>
              <button className="p-4 bg-(--red) border-2 border-(--red) rounded-md text-(--white) font-bold text-lg button-animate">
                {language ? "Quiero probarlo" : "I want to try it"}
              </button>
            </a>
            <a href={"#learn-more"}>
              <button className="p-4 border-2 border-(--red) rounded-md text-(--red) text-lg items-center md:justify-items-start button-animate">
                {language ? "Conocer más" : "Learn more"}
              </button>
            </a>
          </div>
        </div>
        <div className="flex items-center justify-center fadeInFromDown md:fadeInFromRight">
          <div className="bg-gray-800 w-80 h-160 rounded-[40px] m-4 p-[20px] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.4)]">
            <div className="flex flex-col bg-white w-full h-full rounded-[20px] dark:bg-(--app-background-dark-mode)">
              <div className="flex bg-(--green) h-1/10 w-full rounded-t-[20px] items-end justify-between">
                <p className="m-3 text-lg text-(--white) font-bold">
                  {language ? "Plan de hoy" : "Today's plan"}
                </p>
                <div className="m-2.5 bg-(--red) p-2 text-white font-bold rounded-xl text-xs">
                  {language ? "Semanal" : "Weekly"}
                </div>
              </div>
              <div className="flex flex-row w-full h-8/10">
                <div className="flex flex-col w-2/10 gap-[16px] align-middle items-center mt-7 dark:text-(--light-grey)">
                  <p>{language ? "9:00" : "9 AM"}</p>
                  <p>{language ? "10:00" : "10 AM"}</p>
                  <p>{language ? "11:00" : "11 AM"}</p>
                  <p>{language ? "12:00" : "12 AM"}</p>
                  <p>{language ? "13:00" : "1 PM"}</p>
                  <p>{language ? "14:00" : "2 PM"}</p>
                  <p>{language ? "15:00" : "3 PM"}</p>
                  <p>{language ? "16:00" : "4 PM"}</p>
                  <p>{language ? "17:00" : "5 PM"}</p>
                  <p>{language ? "18:00" : "6 PM"}</p>
                  <p>{language ? "19:00" : "7 PM"}</p>
                  <p>{language ? "20:00" : "8 PM"}</p>
                </div>
                <div className="flex flex-col items-center bg-[repeating-linear-gradient(0deg,var(--grey)_0px,var(--grey)_2px,var(--white)_2px,var(--white)_40px)] h-full w-8/10 dark:bg-[repeating-linear-gradient(0deg,var(--grey)_0px,var(--grey)_2px,var(--app-background-dark-mode)_2px,var(--app-background-dark-mode)_40px)]">
                  <div className="flex flex-col w-9/10 h-3/20 bg-(--light-grey) p-2 rounded-xl mt-2">
                    <p className="text-(--red) font-bold text-md">
                      {language ? "Tostadas de aguacate" : "Avocado toasts"}
                    </p>
                    <div className="flex flex-row gap-2 items-center">
                      <p className="text-(--dark-green) text-sm">
                        {language ? "Salubridad:" : "Healthiness:"}
                      </p>
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
                    <p className="text-(--red) font-bold text-md">
                      {language ? "Pollo con patatas" : "Chicken with potatoes"}
                    </p>
                    <div className="flex flex-row gap-2 items-center">
                      <p className="text-(--dark-green) text-sm">
                        {language ? "Salubridad:" : "Healthiness:"}
                      </p>
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
                    <p className="text-(--red) font-bold text-md">
                      {language ? "Tortitas de avena" : "Oatmeal pancakes"}
                    </p>
                    <div className="flex flex-row gap-2 items-center">
                      <p className="text-(--dark-green) text-sm">
                        {language ? "Salubridad:" : "Healthiness:"}
                      </p>
                      <div className="flex flex-row justify-between gap-1">
                        <p className="mt-0.5 w-3 h-3 bg-(--green) rounded-4xl"></p>
                        <p className="mt-0.5 w-3 h-3 bg-(--green) rounded-4xl"></p>
                        <p className="mt-0.5 w-3 h-3 bg-(--green) rounded-4xl"></p>
                        <p className="mt-0.5 w-3 h-3 bg-(--green) rounded-4xl"></p>
                        <p className="mt-0.5 w-3 h-3 bg-(--grey) rounded-4xl"></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row bg-(--red) h-1/10 w-full rounded-b-[20px] items-center justify-around text-2xl text-white dark:text-(--dark-green)">
                <IoCalendar />
                <IoCartOutline />
                <IoHomeOutline />
                <IoBookOutline />
                <IoSettingsOutline />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col h-fit items-center text-center mt-16 mb-10 p-5">
        <div className="text-2xl md:text-3xl font-bold text-(--dark-green) w-9/10 max-w-4xl dark:text-white">
          {language
            ? "¿Cansado de recetas que nunca harás? Organiza las que ya haces."
            : "Tired of recipes you'll never make? Organize the ones you already do."}
        </div>
      </div>
      <div className="flex flex-col bg-(--background-dark-green) h-fit items-center text-center mt-10 pb-8 dark:bg-(--dark-green)">
        <div
          id="learn-more"
          className="scroll-mt-40 mt-13 text-3xl font-bold md:text-4xl w-9/10 text-white"
        >
          {language
            ? "Tres cosas que hace por ti"
            : "Three things it does for you"}
        </div>
        <div className="mt-5 text-md md:text-lg w-9/10 text-white">
          {language
            ? "Simple. Rápido. Sin complicaciones."
            : "Simple. Fast. No complications."}
        </div>
        <div className="grid md:grid-cols-2 h-fit gap-4 items-center mt-7 w-9/10 justify-between max-w-330">
          <div className="h-full w-full flex flex-col items-start border-1 bg-white min-w-40 p-5 rounded-2xl gap-4 dark:bg-(--background-dark-green) dark:border-(--background-dark-green)">
            <FaBowlFood className="text-(--red) text-5xl drop-shadow-lg z-0"></FaBowlFood>
            <div className="bg-gray-100 w-full h-[2px] rounded-4xl" />
            <div className="text-(--dark-green) text-xl font-bold dark:text-white">
              {language
                ? "Tu Biblioteca Personal de Comidas"
                : "Your Personal Meal Library"}
            </div>
            <div className="text-(--grey) text-md text-start">
              {language
                ? "Dile qué comiste hoy, sácale una foto al plato, o escríbelo rápido. Como prefieras. Así de simple."
                : "Tell it what you ate today, snap a photo of your plate, or just type it quickly. However you prefer. That simple."}
            </div>
            <div
              className={
                "flex flex-col self-start text-start text-md ml-2 gap-2.5"
              }
            >
              <div className="flex flex-row items-start gap-2 text-gray-600 dark:text-white">
                <MdKeyboardVoice
                  className={"mt-0.5 min-w-5 min-h-5 text-(--red)"}
                ></MdKeyboardVoice>
                {language ? "Dilo en voz alta" : "Say it out loud"}
              </div>
              <div className="flex flex-row items-start gap-2 text-gray-600 dark:text-white">
                <IoCameraOutline
                  className={"mt-0.5 min-w-5 min-h-5 text-(--red)"}
                ></IoCameraOutline>
                {language ? "Foto del plato" : "Snap a photo"}
              </div>
              <div className="flex flex-row items-start gap-2 text-gray-600 dark:text-white">
                <TbInputAi
                  className={"mt-0.5 min-w-5 min-h-5 text-(--red)"}
                ></TbInputAi>
                {language ? "Escríbelo" : "Type it out"}
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full items-start border-1 bg-white min-w-40 p-5 rounded-2xl gap-4 h-full dark:bg-(--background-dark-green) dark:border-(--background-dark-green)">
            <FaRobot className="text-(--red) text-5xl drop-shadow-lg z-0"></FaRobot>
            <div className="bg-gray-100 w-full h-[2px] rounded-4xl" />
            <div className="text-(--dark-green) text-xl font-bold dark:text-white">
              {language
                ? "Planes Semanales Inteligentes"
                : "Smart Weekly Plans"}
            </div>
            <div className="text-(--grey) text-md text-start">
              {language
                ? "Aprende qué te gusta comer y cuándo. Sabe qué comiste ayer. Balancea tu semana automáticamente. Cada semana mejora porque te conoce mejor."
                : "Learns what you like to eat and when. Knows what you ate yesterday. Balances your week automatically. Gets better each week because it knows you better."}
            </div>
            <div
              className={
                "flex flex-col self-start text-start text-md ml-2 gap-2.5"
              }
            >
              <div className="flex flex-row items-start gap-2 text-gray-600 dark:text-white">
                <FaCheck
                  className={"mt-1.5 min-w-4 min-h-4 text-(--red)"}
                ></FaCheck>
                {language
                  ? "Aprende tus preferencias de sabor"
                  : "Learns your taste preferences"}
              </div>
              <div className="flex flex-row items-start gap-2 text-gray-600 dark:text-white">
                <FaCheck
                  className={"mt-1.5 min-w-4 min-h-4 text-(--red)"}
                ></FaCheck>
                {language
                  ? "Considera tus objetivos de salud"
                  : "Considers your health goals"}
              </div>
              <div className="flex flex-row items-start gap-2 text-gray-600 dark:text-white">
                <FaCheck
                  className={"mt-1.5 min-w-4 min-h-4 text-(--red)"}
                ></FaCheck>
                {language
                  ? "Equilibra la nutrición automáticamente"
                  : "Balances nutrition automatically"}
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full items-start border-1 bg-white min-w-40 p-5 rounded-2xl gap-4 h-full dark:bg-(--background-dark-green) dark:border-(--background-dark-green)">
            <FaShoppingCart className="text-(--red) text-5xl drop-shadow-lg z-0"></FaShoppingCart>
            <div className="bg-gray-100 w-full h-[2px] rounded-4xl" />
            <div className="text-(--dark-green) text-xl font-bold dark:text-white">
              {language
                ? "Listas de Compra Automáticas"
                : "Automatic Shopping Lists"}
            </div>
            <div className="text-(--grey) text-md text-start">
              {language
                ? "Una vez que tu plan semanal esté listo, obtén una lista de compra completa con todos los ingredientes organizados por categoría para viajes eficientes al supermercado."
                : "Once your weekly plan is ready, get a comprehensive shopping list with all ingredients organized by category for efficient grocery trips."}
            </div>
            <div
              className={
                "flex flex-col self-start text-start text-md ml-2 gap-2.5"
              }
            >
              <div className="flex flex-row items-start gap-2 text-gray-600 dark:text-white">
                <FaCheck
                  className={"mt-1.5 min-w-4 min-h-4 text-(--red)"}
                ></FaCheck>
                {language
                  ? "Consolidación de ingredientes"
                  : "Ingredient consolidation"}
              </div>
              <div className="flex flex-row items-start gap-2 text-gray-600 dark:text-white">
                <FaCheck
                  className={"mt-1.5 min-w-4 min-h-4 text-(--red)"}
                ></FaCheck>
                {language
                  ? "Organización por categorías"
                  : "Category organization"}
              </div>
              <div className="flex flex-row items-start gap-2 text-gray-600 dark:text-white">
                <FaCheck
                  className={"mt-1.5 min-w-4 min-h-4 text-(--red)"}
                ></FaCheck>
                {language
                  ? "Optimización de cantidades"
                  : "Quantity optimization"}
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full items-start border-1 bg-white min-w-40 p-5 rounded-2xl gap-4 h-full dark:bg-(--background-dark-green) dark:border-(--background-dark-green)">
            <RiHealthBookFill className="text-(--red) text-5xl drop-shadow-lg z-0"></RiHealthBookFill>
            <div className="bg-gray-100 w-full h-[2px] rounded-4xl" />
            <div className="text-(--dark-green) text-xl font-bold dark:text-white">
              {language ? "Inteligencia Nutricional" : "Nutrition Intelligence"}
            </div>
            <div className="text-(--grey) text-md text-start">
              {language
                ? "Rastrea calorías e ingesta de proteínas sin esfuerzo. Califica tus comidas por sabor y salud, y nuestra IA optimizará las recomendaciones futuras."
                : "Track calories and protein intake effortlessly. Rate your meals for taste and health, and our AI will optimize future recommendations."}
            </div>
            <div
              className={
                "flex flex-col self-start text-start text-md ml-2 gap-2.5"
              }
            >
              <div className="flex flex-row items-start gap-2 text-gray-600 dark:text-white">
                <FaCheck
                  className={"mt-1.5 min-w-4 min-h-4 text-(--red)"}
                ></FaCheck>
                {language
                  ? "Seguimiento diario de calorías"
                  : "Daily calorie tracking"}
              </div>
              <div className="flex flex-row items-start gap-2 text-gray-600 dark:text-white">
                <FaCheck
                  className={"mt-1.5 min-w-4 min-h-4 text-(--red)"}
                ></FaCheck>
                {language
                  ? "Monitoreo de ingesta de proteínas"
                  : "Protein intake monitoring"}
              </div>
              <div className="flex flex-row items-start gap-2 text-gray-600 dark:text-white">
                <FaCheck
                  className={"mt-1.5 min-w-4 min-h-4 text-(--red)"}
                ></FaCheck>
                {language
                  ? "Puntuación de salud personalizada"
                  : "Personalized health scoring"}
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            "flex flex-col p-1.5 h-fit w-9/10 rounded-2xl self-center items-center bg-gray-100 m-5 max-w-330 card"
          }
        >
          <div
            className={
              "flex flex-col w-full h-fit items-center p-7 self-center rounded-2xl bg-gradient-to-r from-green-500 to-red-500 backdrop-blur-md"
            }
          >
            <div className="text-3xl font-bold md:text-4xl w-9/10 text-(--white) text-center flex items-center justify-center gap-3">
              <span>Seveneat</span>
              <span className="inline-flex items-center bg-white px-2 py-1 rounded-xl shadow-lg">
                <span className="inline-flex items-center justify-center bg-(--red) dark:bg-[#FF6E5B] text-white font-bold rounded-full w-6 h-6 text-lg leading-none">
                  +
                </span>
                <span className="text-(--red) dark:text-[#FF6E5B] font-bold text-lg ml-1">
                  Plus
                </span>
              </span>
            </div>
            <div className="mt-5 text-md md:text-lg w-9/10 text-white text-center">
              {language
                ? "Usa la IA sin límites. Mejores planes. Todo lo que saquemos nuevo."
                : "Use AI without limits. Better plans. Everything new we release."}
            </div>
            <div
              className={
                "grid grid-cols-2 md:grid-cols-4 w-9/10 mt-10 max-w-300 gap-10 h-fit gap-x-0 md:gap-x-10"
              }
            >
              <div className={"flex flex-col h-full items-center gap-2"}>
                <IoIosInfinite
                  className={
                    "text-7xl md:text-8xl aspect-square text-white drop-shadow-md"
                  }
                ></IoIosInfinite>
                <div
                  className={
                    "text-md md:text-lg text-center text-white drop-shadow-xl"
                  }
                >
                  {language ? "Uso ilimitado de IA" : "Unlimited AI use"}
                </div>
              </div>
              <div className={"flex flex-col h-full items-center gap-2"}>
                <LuClipboardPlus
                  className={
                    "text-7xl md:text-8xl aspect-square text-white drop-shadow-md"
                  }
                ></LuClipboardPlus>
                <div
                  className={
                    "text-md md:text-lg text-center text-white drop-shadow-xl"
                  }
                >
                  {language ? "Planificación avanzada" : "Advanced planning"}
                </div>
              </div>
              <div className={"flex flex-col h-full items-center gap-2"}>
                <LuBrainCircuit
                  className={
                    "text-6xl md:text-8xl aspect-square text-white drop-shadow-md"
                  }
                ></LuBrainCircuit>
                <div
                  className={
                    "text-md md:text-lg text-center text-white drop-shadow-xl"
                  }
                >
                  {language ? "Mejor modelo de IA" : "Better AI model"}
                </div>
              </div>
              <div className={"flex flex-col h-full items-center gap-2"}>
                <AiOutlineFieldTime
                  className={
                    "text-6xl md:text-8xl aspect-square text-white drop-shadow-md"
                  }
                ></AiOutlineFieldTime>
                <div
                  className={
                    "text-md md:text-lg text-center text-white drop-shadow-xl"
                  }
                >
                  {language
                    ? "Acceso temprano a nuevas funciones"
                    : "Early access to new features"}
                </div>
              </div>
            </div>
            <div className={"flex flex-col h-fit mt-10"}>
              <div className={"flex flex-row items-end"}>
                <div className="w-9/10 text-center text-5xl font-bold text-white drop-shadow-xl">
                  $3.99
                </div>
                <div className={"text-white"}>{language ? "/mes" : "/mo"}</div>
              </div>
              <div className={"flex flex-row items-center justify-center mt-2"}>
                <div className="text-s text-white">
                  {language ? "$37.99/año" : "$37.99/year"}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            "flex flex-col justify-center self-center items-center gap-2"
          }
        >
          <div className="flex flex-col mt-5 text-3xl font-bold md:text-4xl w-9/10 text-(--white) justify-center items-center gap-2">
            <MdDesignServices
              className={"mt-1 text-5xl text-(--red)"}
            ></MdDesignServices>
            {language
              ? "Y muchas mas funciones estan aún por llegar..."
              : "And even more new features are yet to come..."}
          </div>
          <div className="mt-5 text-md md:text-lg w-9/10 text-white">
            {language
              ? "Trabajamos constantemente en nuevas funciones emocionantes para hacer tu planificación de comidas aún mejor. ¡Sé el primero en probarlas!"
              : "We're constantly working on exciting new features to make your meal planning even better. Be the first to try them!"}
          </div>
          <div className="grid md:grid-cols-[auto_auto_auto] mt-5 mb-3 gap-8 w-fit place-items-center justify-between">
            <div className="flex flex-row w-fit gap-2 text-white items-center">
              <FaClipboardCheck className="text-xl text-(--red)" />
              {language
                ? "Recomendaciones de recetas"
                : "Recipe recommendations"}
            </div>
            <div className="flex flex-row w-fit gap-2 text-white items-center">
              <FaClipboardCheck className="text-xl text-(--red)" />
              {language
                ? "Programación de preparación de comidas"
                : "Meal prep scheduling"}
            </div>
            <div className="flex flex-row w-fit gap-2 text-white items-center">
              <FaClipboardCheck className="text-xl text-(--red)" />
              {language
                ? "Compartir comidas socialmente"
                : "Social meal sharing"}
            </div>
          </div>
        </div>
      </div>
      <div
        id={"learn-more"}
        className="flex flex-col h-fit items-center text-center pb-14"
      >
        <div className="mt-13 text-3xl font-bold md:text-4xl w-9/10 text-(--dark-green) dark:text-white">
          {language ? "Tres pasos. Eso es todo." : "Three steps. That's it."}
        </div>
        <div className="mt-5 text-md md:text-lg w-9/10 text-(--dark-green) dark:text-white">
          {language
            ? "Nada complicado. Nada técnico. Solo sentido común."
            : "Nothing complicated. Nothing technical. Just common sense."}
        </div>
        <div className="grid md:grid-cols-3 w-9/10 mt-10 gap-15 md:gap-3">
          <div className={"flex flex-col items-center gap-5 h-auto"}>
            <div
              className={
                "bg-(--green) w-fit aspect-square rounded-full text-2xl p-4 font-bold text-white drop-shadow-lg dark:text-white"
              }
            >
              1
            </div>
            <div
              className={
                "text-(--dark-green) text-center text-2xl font-bold dark:text-white"
              }
            >
              {language
                ? "Añade tus Comidas Favoritas"
                : "Add Your Favorite Meals"}
            </div>
            <div
              className={
                "text-(--dark-green) text-center text-md w-8/10 dark:text-white"
              }
            >
              {language
                ? "Comienza añadiendo tus comidas favoritas usando voz, fotos o texto. Mientras más añadas, mejor entenderá nuestra IA tus preferencias."
                : "Start by adding your go-to meals using voice, photos, or text. The more you add, the better our AI understands your preferences."}
            </div>
          </div>
          <div className={"flex flex-col items-center gap-5 h-auto"}>
            <div
              className={
                "bg-(--green) w-fit aspect-square rounded-full text-2xl p-4 font-bold text-white drop-shadow-lg dark:text-white"
              }
            >
              2
            </div>
            <div
              className={
                "text-(--dark-green) text-center text-2xl font-bold dark:text-white"
              }
            >
              {language ? "Califica y Personaliza" : "Rate & Customize"}
            </div>
            <div
              className={
                "text-(--dark-green) text-center text-md w-8/10 dark:text-white"
              }
            >
              {language
                ? "Califica las comidas por sabor y saludabilidad. Establece tus objetivos de salud para que la IA aprenda qué comidas priorizar en tus planes."
                : "Rate meals for taste and healthiness. Set your health goals so AI learns which meals to prioritize in your plans."}
            </div>
          </div>
          <div className={"flex flex-col items-center gap-5 h-auto"}>
            <div
              className={
                "bg-(--green) w-fit aspect-square rounded-full text-2xl p-4 font-bold text-white drop-shadow-lg dark:text-white"
              }
            >
              3
            </div>
            <div
              className={
                "text-(--dark-green) text-center text-2xl font-bold dark:text-white"
              }
            >
              {language ? "Obtén tu plan semanal" : "Get Your Weekly Plan"}
            </div>
            <div
              className={
                "text-(--dark-green) text-center text-md w-8/10 dark:text-white"
              }
            >
              {language
                ? "Recibe un calendario semanal de comidas perfectamente equilibrado con listas de compra automáticas. Modifica según necesites y disfruta de una planificación de comidas sin estrés."
                : "Receive a perfectly balanced weekly meal calendar with automatic shopping lists. Modify as needed and enjoy stress-free meal planning."}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col h-fit items-center text-center pt-15 pb-15 p-5">
        <div className="text-3xl md:text-4xl font-bold text-(--dark-green) w-9/10 max-w-7xl dark:text-white mb-8">
          {language ? "¿Esto es para ti?" : "Is this for you?"}
        </div>
        <div className="grid md:grid-cols-3 w-9/10 max-w-7xl gap-8 mt-8">
          <div className="flex flex-col items-center text-center gap-4 p-6 bg-white dark:bg-(--background-dark-green) rounded-2xl shadow-lg">
            <FaBowlFood className="text-(--red) text-5xl" />
            <div className="text-(--dark-green) text-xl font-bold dark:text-white">
              {language ? "Ya sabes cocinar" : "You already know how to cook"}
            </div>
            <div className="text-(--grey) text-md">
              {language
                ? "Tienes tus 15-20 comidas de siempre. Las haces con los ojos cerrados. Solo te falta saber cuándo hacer cada una. Eso lo hacemos nosotros."
                : "You have your usual 15-20 meals. You can make them with your eyes closed. You just need to know when to make each one. We handle that."}
            </div>
          </div>
          <div className="flex flex-col items-center text-center gap-4 p-6 bg-white dark:bg-(--background-dark-green) rounded-2xl shadow-lg">
            <IoHomeOutline className="text-(--red) text-5xl" />
            <div className="text-(--dark-green) text-xl font-bold dark:text-white">
              {language ? "Tienes familia" : "You have a family"}
            </div>
            <div className="text-(--grey) text-md">
              {language
                ? "A tu hijo no le gustan los pimientos. Tu pareja es intolerante a la lactosa. Tú odias el pescado. Sabemos. Y planificamos para todos."
                : "Your kid hates peppers. Your partner is lactose intolerant. You can't stand fish. We know. And we plan for everyone."}
            </div>
          </div>
          <div className="flex flex-col items-center text-center gap-4 p-6 bg-white dark:bg-(--background-dark-green) rounded-2xl shadow-lg">
            <IoCalendar className="text-(--red) text-5xl" />
            <div className="text-(--dark-green) text-xl font-bold dark:text-white">
              {language ? "Odias decidir" : "You hate deciding"}
            </div>
            <div className="text-(--grey) text-md">
              {language
                ? 'Son las 6pm. Llegas cansado. "¿Qué hacemos de comer?" Ya no tienes que pensarlo. Nosotros ya decidimos. Solo cocina y disfruta.'
                : "It's 6pm. You're tired. \"What's for dinner?\" You don't have to think about it anymore. We already decided. Just cook and enjoy."}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-(--background-dark-green) h-fit items-center text-center pt-15 pb-15 p-5 dark:bg-(--dark-green)">
        <div className="text-3xl md:text-4xl font-bold text-white w-9/10 max-w-7xl mb-12">
          {language ? "Preguntas frecuentes" : "Frequently asked questions"}
        </div>
        <div className="w-9/10 max-w-4xl grid gap-6">
          <div className="text-left bg-white dark:bg-(--background-dark-green) p-6 rounded-2xl">
            <div className="text-(--dark-green) dark:text-white text-xl font-bold mb-3">
              {language
                ? "¿Funciona con restricciones dietéticas?"
                : "Does it work with dietary restrictions?"}
            </div>
            <div className="text-(--grey)">
              {language
                ? "Sí. Solo planifica con TU comida. Si eres vegetariano, solo añades comidas vegetarianas. Si no puedes comer gluten, no añades nada con gluten. Así de simple."
                : "Yes. It only plans with YOUR food. If you're vegetarian, you only add vegetarian meals. If you can't eat gluten, you don't add anything with gluten. That simple."}
            </div>
          </div>
          <div className="text-left bg-white dark:bg-(--background-dark-green) p-6 rounded-2xl">
            <div className="text-(--dark-green) dark:text-white text-xl font-bold mb-3">
              {language ? "¿Mis datos son privados?" : "Is my data private?"}
            </div>
            <div className="text-(--grey)">
              {language
                ? "100%. Tus comidas son tuyas. Punto. No las compartimos, no las vendemos, no las tocamos. Nunca."
                : "100%. Your meals are yours. Period. We don't share them, don't sell them, don't touch them. Ever."}
            </div>
          </div>
          <div className="text-left bg-white dark:bg-(--background-dark-green) p-6 rounded-2xl">
            <div className="text-(--dark-green) dark:text-white text-xl font-bold mb-3">
              {language ? "¿Hay versión gratuita?" : "Is there a free version?"}
            </div>
            <div className="text-(--grey)">
              {language
                ? "Sí. Habrá versión gratis para empezar. Seveneat Plus son $3.99/mes y te da IA ilimitada, mejores planes, y acceso a todo lo nuevo que saquemos."
                : "Yes. There'll be a free version to start. Seveneat Plus is $3.99/mo and gives you unlimited AI, better plans, and access to everything new we release."}
            </div>
          </div>
          <div className="text-left bg-white dark:bg-(--background-dark-green) p-6 rounded-2xl">
            <div className="text-(--dark-green) dark:text-white text-xl font-bold mb-3">
              {language
                ? "¿Cuándo estará disponible?"
                : "When will it be available?"}
            </div>
            <div className="text-(--grey)">
              {language
                ? "Pronto. Estamos en beta ahora. Si te unes a la lista, eres de los primeros en probarlo. Te avisamos por email cuando esté listo."
                : "Soon. We're in beta now. If you join the list, you're among the first to try it. We'll email you when it's ready."}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-(--red) h-fit items-center text-center pt-15 pb-8">
        <div
          id="waitlist"
          className="scroll-mt-40 text-3xl font-bold md:text-4xl w-9/10 text-white"
        >
          {language
            ? "Avísame cuando esté listo"
            : "Let me know when it's ready"}
        </div>
        <div className="mt-5 text-md md:text-lg w-9/10 text-white">
          {language
            ? "Deja tu email. Serás de los primeros en probarlo."
            : "Leave your email. You'll be among the first to try it."}
        </div>
        <div className={"flex flex-col md:flex-row gap-5 items-center mt-12"}>
          <input
            type="email"
            value={email}
            onChange={handleChange}
            id="email"
            name="email"
            placeholder={language ? "Correo electrónico" : "Email address"}
            required
            aria-describedby="email-description"
            className={"w-60 md:w-80 h-8 md:h-14 bg-white rounded-md p-2 pl-4"}
          ></input>
          <button
            onClick={joinWaitlist}
            className="h-fit md:h-fit p-3 md:p-4 w-fit bg-(--green) border-2 border-(--green) rounded-md text-(--white) font-bold text-md button-animate red-shadow"
          >
            {language ? "Avísame" : "Notify me"}
          </button>
        </div>
        <div className="mt-8 text-md md:text-lg w-9/10 text-white">
          {language
            ? "Te avisamos por email cuando esté listo"
            : "We'll email you when it's ready"}
        </div>
        <div
          className={"flex flex-row text-white items-center text-sm gap-1 mt-1"}
        >
          <MdOutlineEmail></MdOutlineEmail>
          {language
            ? "Notificación de lanzamiento por correo"
            : "Launch notification via email"}
        </div>
      </div>
      <div className="flex flex-col bg-(--dark-green) h-fit items-center">
        <div
          className={
            "flex flex-col md:flex-row md:items-center gap-8 h-auto justify-between w-9/10 mt-14"
          }
        >
          <div className={"flex flex-col gap-2 self-star"}>
            <div
              className={
                "flex flex-row items-center gap-2 text-white font-bold text-2xl"
              }
            >
              <img
                src={logo}
                alt="logo"
                className="w-10 h-8/10 aspect-square"
              />
              Seveneat
            </div>
            <div className={"text-white text-md"}>
              {language
                ? "Las comidas que ya haces, planificadas automáticamente"
                : "The meals you already make, automatically planned"}
            </div>
          </div>
          <div className={"flex flex-col items-center gap-2"}>
            <div className={"text-white font-bold text-md"}>Links</div>
            <div className={"flex flex-row items-center gap-6 text-white"}>
              <a
                href={"https://seveneat.com/documents/privacyPolicy.html"}
                target="_blank"
                rel="noopener noreferrer"
              >
                {language ? "Política de Privacidad" : "Privacy Policy"}
              </a>
              <a
                href={"https://x.com/gonzalinux00"}
                target="_blank"
                rel="noopener noreferrer"
              >
                X (Twitter)
              </a>
              <a
                href={"https://github.com/gonzalinux"}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
        <div
          className={
            "flex flex-col gap-2 text-gray-500 text-lg mt-10 mb-10 text-center"
          }
        >
          <div>
            {language
              ? "© 2025 Seveneat. Todos los derechos reservados."
              : "© 2025 Seveneat. All rights reserved."}
          </div>
          <div className="text-sm">
            {language ? "Landing page creada por " : "Landing page created by "}
            <a
              href="https://github.com/daniherurb"
              target="_blank"
              className="text-gray-400 hover:text-gray-300 transition-colors"
            >
              daniherurb
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
