import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import store from './redux/store'
import { Provider } from 'react-redux';
import customTheme from "./styles/theme.style";
// import { ColorModeScript } from "@chakra-ui/color-mode";

ReactDOM.createRoot(document.getElementById('app')).render(
    <>
        <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
        <ChakraProvider theme={customTheme}>
            <Provider store={store}>
                <App />
            </Provider>
        </ChakraProvider>
    </>
)
