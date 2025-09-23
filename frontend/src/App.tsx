
import { useRoutes } from "react-router";
import "./App.css";
import "./Button.css";
import routes from "./Routes/routes";
import "swiper/css";
import "swiper/css/pagination";
import AppContext from "./context/AppContext";

function App() {
  const router = useRoutes(routes);

  return (
    <AppContext>
      <div>
        <div className="dark:text-neut-prim text-d-neut-seco bg-neut-seco dark:bg-d-neut-seco">
          <div>{router}</div>
        </div>
      </div>
    </AppContext>
  );
}

export default App;
