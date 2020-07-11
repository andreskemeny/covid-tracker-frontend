import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import Navbar from "components/Navbars/Navbar.js";

import routes from "routes.js";

var ps;

class Tracker extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeColor: "blue",
		};
	}

	componentDidMount() {
		if (navigator.platform.indexOf("Win") > -1) {
			document.documentElement.classList.add("perfect-scrollbar-on");
			document.documentElement.classList.remove("perfect-scrollbar-off");
			ps = new PerfectScrollbar(this.refs.mainPanel);
			this.refs.mainPanel.addEventListener(
				"ps-scroll-y",
				this.showNavbarButton
			);
			let tables = document.querySelectorAll(".table-responsive");
			for (let i = 0; i < tables.length; i++) {
				ps = new PerfectScrollbar(tables[i]);
			}
		}

		window.addEventListener("scroll", this.showNavbarButton);
	}

	componentWillUnmount() {
		if (navigator.platform.indexOf("Win") > -1) {
			ps.destroy();
			document.documentElement.className.add("perfect-scrollbar-off");
			document.documentElement.classList.remove("perfect-scrollbar-on");
			this.refs.mainPanel.removeEventListener(
				"ps-scroll-y",
				this.showNavbarButton
			);
		}

		window.removeEventListener("scroll", this.showNavbarButton);
	}

	componentDidUpdate(e) {
		if (e.location.pathname !== e.history.location.pathname) {
			if (navigator.platform.indexOf("Win") > -1) {
				let tables = document.querySelectorAll(".table-responsive");
				for (let i = 0; i < tables.length; i++) {
					ps = new PerfectScrollbar(tables[i]);
				}
			}

			document.documentElement.scrollTop = 0;
			document.scrollingElement.scrollTop = 0;
			this.refs.mainPanel.scrollTop = 0;
		}
	}

	getRoutes = (routes) => {
		return routes.map((prop, key) => {
			if (prop.collapse) {
				return this.getRoutes(prop.views);
			}

			if (prop.layout === "/tracker") {
				return (
					<Route
						path={prop.layout + prop.path}
						component={prop.component}
						key={key}
					/>
				);
			} else {
				return null;
			}
		});
	};

	render() {
		return (
			<div className="wrapper">
				<div
					className="main-panel"
					ref="mainPanel"
					data={this.state.activeColor}
				>
					<Navbar
						{...this.props}
						handleMiniClick={this.handleMiniClick}
						brandText={"Covid Tracker"}
						sidebarOpened={this.state.sidebarOpened}
						toggleSidebar={this.toggleSidebar}
					/>

					<Switch>
						{this.getRoutes(routes)}
						<Redirect from="*" to="/tracker/dashboard" />
					</Switch>
				</div>
			</div>
		);
	}
}

export default Tracker;
