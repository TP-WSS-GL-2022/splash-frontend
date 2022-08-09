import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import {
    ChakraProvider,
    extendTheme,
    theme as chakraTheme,
    ThemeConfig,
} from "@chakra-ui/react";

import App from "./App";

const fonts = {
    ...chakraTheme.fonts,
    body: "Inter, sans-serif",
    heading: "Inter, sans-serif",
};

const themeConfig: ThemeConfig & Record<string, any> = {
    initialColorMode: "dark",
    useSystemColorMode: false,
    fonts,
};

const theme = extendTheme(themeConfig);

localStorage.setItem("chakra-ui-color-mode", "dark");

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ChakraProvider>
    </React.StrictMode>
);
