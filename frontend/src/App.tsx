import { useState, createContext, useEffect, useLayoutEffect, useMemo } from "react";
import { useRoutes } from "react-router";
import "./App.css";
import "./Button.css";
import routes from "./Routes/routes";
import { useDispatch } from "react-redux";
import type { T_FormValues, T_SwitchThem, T_Theme } from "./Types/type";
import type { I_errorMessagesContext } from "./Types/interface";
import Loading from "./Components/Loading/Loading";
import { login } from "./Redux/slices/authInfosSlice";
import "swiper/css";
import "swiper/css/pagination";

export const errorMessagesContext = createContext<I_errorMessagesContext>({
  errorMessages: undefined,
  setErrorMessages: undefined,
});

export const themContext: React.Context<(T_SwitchThem)> = createContext({})

function App() {
  
  const [errorMessages, setErrorMessages] = useState<T_FormValues>({});
  
  const [flage, setFlage] = useState(true);
  
  const router = useRoutes(routes);
  
  const dispatch = useDispatch();
  
  const userInfosHandler = async () => {
    const userDatas = JSON.parse(localStorage.getItem("user") as string);
    if (userDatas) {
      try {
        const userInfos = await (
          await fetch("http://localhost:4000/v1/auth/me", {
            headers: {
              Authorization: `Bearer ${userDatas.token}`,
            },
          })
          ).json();
          dispatch(login({ token: userDatas.token, user: userInfos }));
        } 
        catch (error) {
          throw new Error(`${error}`);
        }
      }
    flage && setFlage(false);
  };
  
  useEffect(() => {
    userInfosHandler();
  }, [flage, localStorage.getItem('user')]);

  // theme handling
  const [theme, setTheme] = useState<T_Theme>(localStorage.getItem("themPage") ? (localStorage.getItem("themPage") as T_Theme) : "light")

  useLayoutEffect(() => {
    const root = document.documentElement;
    if(theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light')
      root.classList.remove('dark')
    }
    localStorage.setItem('themPage', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === "dark" ? "light" : "dark")
  }

  const themContextValue = useMemo(() => ({
    theme,
    toggleTheme,
    isDark: theme === 'dark'
  }), [theme])

  return (
    <themContext.Provider value={themContextValue}>
      <errorMessagesContext.Provider value={{ errorMessages, setErrorMessages }}>
        {!flage ? (
          <div>
            <div className="dark:text-neut-prim text-d-neut-seco bg-neut-seco dark:bg-d-neut-seco">
              <div>{router}</div>
            </div>
          </div>
        ): (
          <Loading />
        )}
      </errorMessagesContext.Provider>
    </themContext.Provider>
  );
}

export default App;
