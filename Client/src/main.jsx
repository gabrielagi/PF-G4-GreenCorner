import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './Redux/store'
import {Auth0Provider} from '@auth0/auth0-react';


const domain = "dev-7l6jrzcc2edzpfrf.us.auth0.com";
const clientId = "adRFtne9oxBuocgJ0OR6ZdQNDLIWFg4L";


ReactDOM.createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
      <Auth0Provider domain={domain} clientId={clientId} redirectUri={window.location.origin}>
      <BrowserRouter>
       <App />
      </BrowserRouter>
      </Auth0Provider>
    </Provider>,
)
