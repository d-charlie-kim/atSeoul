import { Outlet, createBrowserRouter } from "react-router-dom";
import App from "App";
import Landing from "Pages/Landing";
import Home from "Pages/Home";
import Info from "Pages/Info";
import Search from "Pages/Search";
import Chat from "Pages/Chat";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Landing />,
      },
      {
        path: "chat",
        element: <Chat />,
      },
      {
        path: "Home",
        element: <Home />,
      },
      {
        path: "Info",
        element: <Info />,
      },
      {
        path: "Search",
        element: <Search />,
      },
    ],
  },
]);

export default router;

/*

Outlet이 무엇이냐

top navi에 들어갈 것
문화행사 정보
검색

*/
