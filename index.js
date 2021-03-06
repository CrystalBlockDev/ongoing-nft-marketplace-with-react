import React from 'react';
import ReactDOM from 'react-dom';
import "./assets/animated.css";
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import '../node_modules/elegant-icons/style.css';
import '../node_modules/et-line/style.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';
import './assets/style.scss';
import './assets/style_grey.scss';
import App from './components/app';
import * as serviceWorker from './serviceWorker';
import isEmpty from "./validation/isEmpty";
import jwt_decode from "jwt-decode";

//redux store
import { Provider } from 'react-redux'
import store from './store';
import { cleanCurrentUser, setCurrentUserAction } from './store/actions/thunks';

if(!isEmpty(localStorage.jwtToken))
{
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUserAction(decoded));
  const currTime = Date.now() / 1000;
  if(decoded.app < currTime)
  {
	  store.dispatch(cleanCurrentUser());
	  localStorage.removeItem("jwtToken");
  }
}

ReactDOM.render(

	<Provider store={store}>
		<App />
	</Provider>, 
	document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();