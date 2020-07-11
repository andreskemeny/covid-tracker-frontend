import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import TrackerLayout from "layouts/Tracker/Tracker.js";

import "assets/css/nucleo-icons.css";
import "react-notification-alert/dist/animate.css";
import "assets/scss/main-scss.scss?v=1.1.0";

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
