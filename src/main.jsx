import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import firebaseConfig from './firebase-config/firebaseConfig.js'
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux'
import stores from './store/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={stores}>
    <App />
  </Provider>,
)
