// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "stream-chat-react/dist/css/v2/index.css";
// import "./index.css";
// import App from "./App.jsx";
// import { AppProvider } from "./context/AppContext.jsx";

// import { BrowserRouter } from "react-router";

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// const queryClient = new QueryClient();

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <BrowserRouter>
//       <QueryClientProvider client={queryClient}>
//         <AppProvider>
//           <App />
//         </AppProvider>
//       </QueryClientProvider>
//     </BrowserRouter>
//   </StrictMode>
// );


import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "stream-chat-react/dist/css/v2/index.css";
import "./index.css";

import App from "./App.jsx";
import { AppProvider } from "./context/AppContext.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <App />
        </AppProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
