import "./App.css";
import { useState, useEffect } from "react";
import logo from "./assets/logo.png";
import screenshot from "./assets/screenshot.png";
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
            ? "¡Correo añadido!"
            : "Email added!",
          "success",
        );
        setEmail("");
      } else if (response.status === 409) {
        // Email already exists
        showNotification(
          language
            ? "Este correo ya estaba registrado"
            : "This email was already registered",
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
            language ? "Abrir menú" : "Open menu"
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
              ? "¿Es difícil saber qué vas a comer?"
              : "Is it hard to know what to eat?"}
            <div className="text-transparent leading-none">
              {language ? "Esta es la solucion." : "This is the answer."}
            </div>
          </div>
          <div className="text-lg md:text-xl text-gray-500 text-center md:text-start fadeInFromUp md:fadeInFromLeft dark:text-white">
            {language
              ? "Ya sabes lo que sueles comer, pero a veces es complicado elegir y recordar cada una de esas comidas. Seveneat te permite registrar tus comidas del día a día y genera planes adaptados a tí."
              : "You know what you usually eat, but sometimes it is hard to chose or even remember some of those meals. Seveneat allows you to register your day to day meals and it generates plans adapted to you."}
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
            <img
              src={screenshot}
              alt="Seveneat App Screenshot"
              className="w-full h-full object-cover rounded-[20px]"
            />
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
            ? "Pero, ¿por qué Seveneat y no una de las otras apps de planificación de comidas?"
            : "But, why Seveneat and not one of the other meal planning apps?"}
        </div>
        <div className="mt-5 text-md md:text-lg w-9/10 text-white">
          {language
            ? "Porque aquí mandas tú:"
            : "Because you are the boss here:"}
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
                ? "Si tuvieras que registrar las comidas una por una incluyendo todos sus ingredientes tardarías siglos. Aquí lo hacemos fácil:"
                : "If you had to register all the meals one by one inluding every ingredient... It might take centuries. So we make it easy:"}
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
                {language ? "Usa tu voz para describir el plato" : "Say the name or a description out loud"}
              </div>
              <div className="flex flex-row items-start gap-2 text-gray-600 dark:text-white">
                <IoCameraOutline
                  className={"mt-0.5 min-w-5 min-h-5 text-(--red)"}
                ></IoCameraOutline>
                {language ? "Saca una foto del plato" : "Snap a photo of the meal"}
              </div>
              <div className="flex flex-row items-start gap-2 text-gray-600 dark:text-white">
                <TbInputAi
                  className={"mt-0.5 min-w-5 min-h-5 text-(--red)"}
                ></TbInputAi>
                {language ? "Escribe el nombre o una descripción del plato" : "Type the name or a description of the meal"}
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
                ? "Aprende qué te gusta comer y cuándo. Cada cambio se registra en el algoritmo para mejorar la proxima planificación."
                : "Learns what you like to eat and when. Each change is registered in the algorithm to improve the next planning."}
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
                  ? "Si sueles quitar una comida, te la sugerirá menos."
                  : "If you usually remove a meal, it will suggest it less."}
              </div>
              <div className="flex flex-row items-start gap-2 text-gray-600 dark:text-white">
                <FaCheck
                  className={"mt-1.5 min-w-4 min-h-4 text-(--red)"}
                ></FaCheck>
                {language
                  ? "Si una comida es saludable, te será recomendada a menudo."
                  : "If a meal is healthy, it will be sugested more often."}
              </div>
              <div className="flex flex-row items-start gap-2 text-gray-600 dark:text-white">
                <FaCheck
                  className={"mt-1.5 min-w-4 min-h-4 text-(--red)"}
                ></FaCheck>
                {language
                  ? "Si tienes una nueva comida favorita, no faltará en tu plan."
                  : "If you have a new favourite meal, you will not miss it in your plan."}
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full items-start border-1 bg-white min-w-40 p-5 rounded-2xl gap-4 h-full dark:bg-(--background-dark-green) dark:border-(--background-dark-green)">
            <FaShoppingCart className="text-(--red) text-5xl drop-shadow-lg z-0"></FaShoppingCart>
            <div className="bg-gray-100 w-full h-[2px] rounded-4xl" />
            <div className="text-(--dark-green) text-xl font-bold dark:text-white">
              {language
                ? "Lista de la Compra Automáticas"
                : "Automatic Shopping List"}
            </div>
            <div className="text-(--grey) text-md text-start">
              {language
                ? "Una vez que tu plan semanal esté listo, obtendrás una lista de compra completa con todos los ingredientes necesarios para la semana. Nos guardamos lo que tienes en la despensa para que solo compres lo que necesites."
                : "Once your weekly plan is ready, get a comprehensive shopping list with all ingredients needed for the week. We store everything you have in your pantry so that you only buy what you really need."}
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
                  ? "Registra los ingredientes que ya tienes con una foto."
                  : "Register the ingredients you already have with a foto."}
              </div>
              <div className="flex flex-row items-start gap-2 text-gray-600 dark:text-white">
                <FaCheck
                  className={"mt-1.5 min-w-4 min-h-4 text-(--red)"}
                ></FaCheck>
                {language
                  ? "La lista de la compra solo tendrá lo que te falta para tu plan."
                  : "The shopping list will only have what you need for your plan."}
              </div>
              <div className="flex flex-row items-start gap-2 text-gray-600 dark:text-white">
                <FaCheck
                  className={"mt-1.5 min-w-4 min-h-4 text-(--red)"}
                ></FaCheck>
                {language
                  ? "Con una foto del ticket se tacharán los ingredientes de la lista."
                  : "With a photo of the bill the inredients will be crossed out."}
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
                ? "Rastrea calorías e ingesta de proteínas sin esfuerzo. Califica tus comidas por sabor y salud, asi ajustaremos tus planes."
                : "Track calories and protein intake effortlessly. Rate your meals for taste and healthiness, and we will adjust your plans on it"}
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
                  ? "Seguimiento diario de calorías y proteínas."
                  : "Daily calorie and proteine tracking"}
              </div>
              <div className="flex flex-row items-start gap-2 text-gray-600 dark:text-white">
                <FaCheck
                  className={"mt-1.5 min-w-4 min-h-4 text-(--red)"}
                ></FaCheck>
                {language
                  ? "Podrás establecer tus propios objetivos nutritivos."
                  : "You will be able to stablish nutrition objectives."}
              </div>
              <div className="flex flex-row items-start gap-2 text-gray-600 dark:text-white">
                <FaCheck
                  className={"mt-1.5 min-w-4 min-h-4 text-(--red)"}
                ></FaCheck>
                {language
                  ? "Tendrás estadísticas diarias y mensuales."
                  : "You will have montly and daily statistics."}
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
                ? "Si los limites de la versión gratuita se te quedan cortos o si quieres más opciones:"
                : "If the free limits are too short for you or if you want more features:"}
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
                  {language ? "Más opciones para planes" : "More planning options"}
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
                    ? "Acceso anticipado a nuevas funciones"
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
              ? "Y estamos trabajando en muchas más funciones..."
              : "And we are working and many new functions..."}
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
                ? "Importar comidas de recetas de tus redes sociales"
                : "Import meals from social media recipees"}
            </div>
            <div className="flex flex-row w-fit gap-2 text-white items-center">
              <FaClipboardCheck className="text-xl text-(--red)" />
              {language
                ? "Interfaz de chat para que puedas hablar con tu plan"
                : "Chat interface to talk with your plan"}
            </div>
            <div className="flex flex-row w-fit gap-2 text-white items-center">
              <FaClipboardCheck className="text-xl text-(--red)" />
              {language
                ? "Compartir comidas y estadísticas con tus amigos y familia"
                : "Share meals and stats with your friends and family"}
            </div>
          </div>
        </div>
      </div>
      <div
        id={"learn-more"}
        className="flex flex-col h-fit items-center text-center pb-14"
      >
        <div className="mt-13 text-3xl font-bold md:text-4xl w-9/10 text-(--dark-green) dark:text-white">
          {language ? "¿Cómo funciona?" : "¿How does it work?"}
        </div>
        <div className="mt-5 text-md md:text-lg w-9/10 text-(--dark-green) dark:text-white">
          {language
            ? "Con estos tres simples pasos generar planes será un paseo."
            : "With this simple three steps you will generate plans with ease"}
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
                ? "Añade tus Comidas Habituales"
                : "Add Your Usual Meals"}
            </div>
            <div
              className={
                "text-(--dark-green) text-center text-md w-8/10 dark:text-white"
              }
            >
              {language
                ? "Comienza registrando tus comidas haciendole una foto o escribiendo su nombre. Cuantas más añadas, mejores los planes."
                : "Start by adding your meals taking a photo or writing the name. The more you add, the beter the plans you will get."}
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
              {language ? "Personaliza tus preferencias" : "Customize your preferences"}
            </div>
            <div
              className={
                "text-(--dark-green) text-center text-md w-8/10 dark:text-white"
              }
            >
              {language
                ? "Elige que valoras a la hora de generar un plan: Variedad, Gustos o Saludable. Ajusta tus horarios de comida."
                : "Chose what you value when generating a plan: Variety, Preferences or Healthiness. Adjust your meal schedules."}
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
              {language ? "Genera tu Plan Semanal" : "Generate your Weekly Plan"}
            </div>
            <div
              className={
                "text-(--dark-green) text-center text-md w-8/10 dark:text-white"
              }
            >
              {language
                ? "Tus comidas planificadas en el desayuno, comida, merienda y cena. Modifícalo según necesites y aprovecha la lista de la compra automática."
                : "Your meals planned for breakfast, lunch, snack and dinner. Modify it for your needs, and take advantage of the automatic shopping list."}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col h-fit items-center text-center pt-15 pb-15 p-5">
        <div className="text-3xl md:text-4xl font-bold text-(--dark-green) w-9/10 max-w-7xl dark:text-white mb-8">
          {language ? "¿Seveneat es para tí?" : "Is Seveneat for you?"}
        </div>
        <div className="grid md:grid-cols-3 w-9/10 max-w-7xl gap-8 mt-8">
          <div className="flex flex-col items-center text-center gap-4 p-6 bg-white dark:bg-(--background-dark-green) rounded-2xl shadow-lg">
            <FaBowlFood className="text-(--red) text-5xl" />
            <div className="text-(--dark-green) text-xl font-bold dark:text-white">
              {language ? "Ya sabes cocinar" : "You already know how to cook"}
            </div>
            <div className="text-(--grey) text-md">
              {language
                ? "Ya tienes una lista de comidas que sueles hacer, pero te es dificil recordarlas y elegir entre todas ellas. Déjaselo a Seveneat."
                : "You already have a list of meals you usually make, but it is hard to remember them or to chose between them. Leave it to Seveneat."}
            </div>
          </div>
          <div className="flex flex-col items-center text-center gap-4 p-6 bg-white dark:bg-(--background-dark-green) rounded-2xl shadow-lg">
            <IoHomeOutline className="text-(--red) text-5xl" />
            <div className="text-(--dark-green) text-xl font-bold dark:text-white">
              {language ? "Cocinas para varias personas" : "You cook for multiple people."}
            </div>
            <div className="text-(--grey) text-md">
              {language
                ? "A tu hijo no le gustan los pimientos. Tu pareja es intolerante a la lactosa. Tú odias el pescado. Eso queda registrado y aplicado cada semana. Tus planes, tus reglas."
                : "Your kid hates peppers. Your partner is lactose intolerant. You can't stand fish. Everything is registered and applied each week. Your plans, your rules."}
            </div>
          </div>
          <div className="flex flex-col items-center text-center gap-4 p-6 bg-white dark:bg-(--background-dark-green) rounded-2xl shadow-lg">
            <IoCalendar className="text-(--red) text-5xl" />
            <div className="text-(--dark-green) text-xl font-bold dark:text-white">
              {language ? "Odias elegir" : "You hate choosing"}
            </div>
            <div className="text-(--grey) text-md">
              {language
                ? 'Son las 9pm. Llegas cansado. "¿Qué hacemos de comer?" Ya no tienes que pensarlo. Solo cocina y disfruta.'
                : "It's 6pm. You're tired. \"What's for dinner?\" You don't have to think about it anymore. Just cook and enjoy."}
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
                ? "Sí. Habrá versión gratis. Seveneat Plus son $3.99/mes y te da IA ilimitada, mejores planes, y acceso a todo lo nuevo que saquemos."
                : "Yes. There'll be a free version. Seveneat Plus is $3.99/mo and gives you unlimited AI, better plans, and access to everything new we release."}
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
                ? "Pronto. Estamos en beta ahora. Si te unes a la lista, serás de los primeros en probarla. Te avisamos por email cuando esté lista."
                : "Soon. We're in beta now. If you join the list, you'll be among the first to try it. We'll email you when it's ready."}
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
            ? "Avísame cuando se publique"
            : "Let me know when it is published"}
        </div>
        <div className="mt-5 text-md md:text-lg w-9/10 text-white">
          {language
            ? "Deja tu email. Serás de los primeros en probarla."
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
              ? "© 2026 Seveneat. Todos los derechos reservados."
              : "© 2026 Seveneat. All rights reserved."}
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
