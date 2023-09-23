import React from "react";
import { createRoot } from "react-dom/client";
import router from "Router/Router";
import { RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";

const container = document.getElementById("root") as Element | DocumentFragment;
const root = createRoot(container);
root.render(
  <RecoilRoot>
    <RouterProvider router={router} />
  </RecoilRoot>
);

/*
// TODO
RouterProvider
BrowserRouter
차이 확인 및 블로그 기술


// TODO
createRoot 는 무엇인가
*/
