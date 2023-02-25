import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'
import store from './redux/store'
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('app')).render(
  //  <React>
        <ChakraProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </ChakraProvider>
 //   </React>
)
