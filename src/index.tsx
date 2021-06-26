import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import theme from "./theme";
import { ColorModeScript } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import "./assets/styles/global.scss";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
