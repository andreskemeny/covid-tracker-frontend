// imports de react para definir el componente
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// componente de layout, para estructurar los componentes dentro de este
import TrackerLayout from "layouts/Tracker/Tracker.js";

// stylesheets para darle estilo a la pagina
import "assets/css/nucleo-icons.css";
import "react-notification-alert/dist/animate.css";
import "assets/scss/main-scss.scss?v=1.1.0";

// llamamos una funcion para crear el historial para poder manejarlo con react
const hist = createBrowserHistory();

ReactDOM.render(
	<Router history={hist}>
		<Switch>
			<Route path="/tracker" render={(props) => <TrackerLayout {...props} />} />
			<Redirect from="/" to="/tracker/dashboard" />
		</Switch>
	</Router>,
	document.getElementById("root")
);
