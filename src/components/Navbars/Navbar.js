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
	// asignar las variables que se le pasaron al componente (props)
	// funcion que corre cuando se llama el componente
	constructor(props) {
		// define los props (son constantes que se le pasan al componente)
		super(props);

		// define el estado (variables del componente que definimos nosotros)
		this.state = {
			collapseOpen: false,
			modalSearch: false,
			color: "navbar-transparent",
		};
	}

	// funcion que corre al momento de mostrar el component
	componentDidMount() {
		// event listener para saber cuando cambia el tamaño de la ventana
		window.addEventListener("resize", this.updateColor);
	}

	// funcion que corre antes del momento de mostrar el component
	componentWillUnmount() {
		// event listener para saber cuando cambia el tamaño de la ventana
		window.removeEventListener("resize", this.updateColor);
	}

	// funcion que actualiza el color del componente dependiendo del tamaño de la ventana y si esta expandido
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

	// funcion para controlar si el navbar esta expandido o no
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

	// funcion que determina que es lo que se va a mostrar en el componente - lo visual.
	// aca se usan los imports de reactstrap
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
