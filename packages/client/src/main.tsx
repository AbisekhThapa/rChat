import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeScript } from "@chakra-ui/react";
import theme, { config } from "./theme";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <ColorModeScript initialColorMode={config.initialColorMode} />
      <ChakraProvider theme={theme}>
           <App />
      </ChakraProvider>
    </BrowserRouter>
);
