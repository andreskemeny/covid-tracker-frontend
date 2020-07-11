import React, { Component } from "react";
import classNames from "classnames";

import {
	Button,
	Collapse,
	NavbarBrand,
	Navbar,
	NavItem,
	NavLink,
	Nav,
	Container,
} from "reactstrap";

class TrackerNavbar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			collapseOpen: false,
			modalSearch: false,
			color: "navbar-transparent",
		};
	}

	componentDidMount() {
		window.addEventListener("resize", this.updateColor);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateColor);
	}

	updateColor = () => {
		if (window.innerWidth < 993 && this.state.collapseOpen) {
			this.setState({
				color: "bg-white",
			});
		} else {
			this.setState({
				color: "navbar-transparent",
			});
		}
	};

	toggleCollapse = () => {
		if (this.state.collapseOpen) {
			this.setState({
				color: "navbar-transparent",
			});
		} else {
			this.setState({
				color: "bg-white",
			});
		}
		this.setState({
			collapseOpen: !this.state.collapseOpen,
		});
	};

	render() {
		return (
			<>
				<Navbar
					className={classNames("navbar-absolute", {
						[this.state.color]:
							this.props.location.pathname.indexOf("full-screen-map") === -1,
					})}
					expand="lg"
				>
					<Container fluid>
						<div className="navbar-wrapper">
							<NavbarBrand
								onClick={(e) => e.preventDefault()}
								style={{ fontSize: "36px", color: "white" }}
							>
								{this.props.brandText}
							</NavbarBrand>
						</div>
						<button
							className="navbar-toggler"
							type="button"
							data-toggle="collapse"
							data-target="#navigation"
							aria-expanded="false"
							aria-label="Toggle navigation"
							onClick={this.toggleCollapse}
						>
							<span className="navbar-toggler-bar navbar-kebab" />
							<span className="navbar-toggler-bar navbar-kebab" />
							<span className="navbar-toggler-bar navbar-kebab" />
						</button>
						<Collapse navbar isOpen={this.state.collapseOpen}>
							<Nav className="ml-auto" navbar>
								<NavItem active>
									<NavLink>
										<Button
											className="animation-on-hover"
											color="info"
											size="lg"
											href="https://comisariavirtual.cl/"
											target="_blank"
										>
											Comisaria Virtual
										</Button>
									</NavLink>
								</NavItem>
								<li className="separator d-lg-none" />
							</Nav>
						</Collapse>
					</Container>
				</Navbar>
			</>
		);
	}
}

// exportamos el componente (clase) para usarlo en otros archivos
export default TrackerNavbar;
