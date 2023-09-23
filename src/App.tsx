import { Outlet } from "react-router-dom";
import GlobalStyle from "GlobalStyle";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { StyleSheetManager } from "styled-components";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <StyleSheetManager shouldForwardProp={(prop) => prop !== "active"}>
        <GlobalStyle />
        <Outlet />
      </StyleSheetManager>
    </QueryClientProvider>
  );
}

export default App;

/*

StyleSheetManager 는 무엇인가

ReactQuery에 대한 이해
블로그 기술

*/
