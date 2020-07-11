import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { VectorMap } from "react-jvectormap";
import axios from "axios";
import ReactPlayer from "react-player";

import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	CardTitle,
	Table,
	Row,
	Col,
} from "reactstrap";

class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			confirmedPerMillion: 0,
			totalCases: 0,
			fatalityRate: 0,
			fechas: [],
			casos: [],
			muertes: [],
		};

		this.createTableData();
	}

	async createTableData() {
		await axios
			.get("http://127.0.0.1:8000/covid-stats/chile_communes")
			.then((res) => {
				const data = res.data;

				let tableRows = [];
				let auxState = "";
				for (let i = 0; i < data.communes.length; i++) {
					if (data.states[i] === "Si") {
						auxState = "En cuarentena";
					} else {
						auxState = "Sin cuarentena";
					}

					tableRows.push(
						<tr key={i}>
							<td>{data.communes[i]}</td>
							<td>{auxState}</td>
						</tr>
					);
				}

				this.setState({ tableData: tableRows });
			})
			.catch((err) => console.log(err));
	}

	componentWillMount = () => {
		axios
			.all([
				axios.get("http://127.0.0.1:8000/covid-stats/chile"),
				axios.get("http://127.0.0.1:8000/covid-stats/world"),
			])
			.then(
				axios.spread((res, res1) => {
					let tableRows = [];
					for (let i = 0; i < res1.data.top_6.length; i++) {
						tableRows.push(
							<tr>
								<td>
									<div className="flag">
										<img
											alt={res1.data.top_6[i].country}
											src={res1.data.top_6[i].flag}
											style={{ height: "20px", width: "30px" }}
										/>
									</div>
								</td>
								<td>{res1.data.top_6[i].country}</td>
								<td className="text-right">{res1.data.top_6[i].cases}</td>
								<td className="text-right">
									{res1.data.top_6[i].percentOfTotal}%
								</td>
							</tr>
						);
					}

					this.setState({
						casos: res.data.casos,
						fechas: res.data.fechas,
						muertes: res.data.muertes,
						confirmedPerMillion: res.data.confirmed_per_million,
						fatalityRate: res.data.fatality_rate,
						totalCases: res.data.total_cases,

						mapData: res1.data.map_data,
						top6TableData: tableRows,
						recoveryRate: res1.data.recuperation_percentage_cl,
					});
				})
			)
			.catch((err) => {
				console.log(err);
			});
	};

	render() {
		return (
			<>
				<div
					style={{ marginTop: "80px", marginLeft: "50px", marginRight: "50px" }}
				>
					<Row>
						<Col xs="12">
							<Card className="card-chart">
								<CardHeader>
									<Row>
										<Col className="text-left" sm="6">
											<h5 className="card-category">Ultimos 2 meses</h5>
											<CardTitle tag="h2">Casos confirmados en Chile</CardTitle>
										</Col>
									</Row>
								</CardHeader>
								<CardBody>
									<div className="chart-area">
										<Line
											data={{
												labels: this.state.fechas,
												datasets: [
													{
														label: "Casos confirmados acumulados",
														fill: true,
														backgroundColor: ["rgba(29,140,248,0.04)"],
														borderColor: "#1f8ef1",
														borderWidth: 2,
														borderDash: [],
														borderDashOffset: 0.0,
														pointBackgroundColor: "#1f8ef1",
														pointBorderColor: "rgba(255,255,255,0)",
														pointHoverBackgroundColor: "#1f8ef1",
														pointBorderWidth: 20,
														pointHoverRadius: 4,
														pointHoverBorderWidth: 15,
														pointRadius: 3,
														data: this.state.casos,
													},
												],
											}}
											options={{
												maintainAspectRatio: false,
												legend: {
													display: false,
												},
												tooltips: {
													backgroundColor: "#f5f5f5",
													titleFontColor: "#333",
													bodyFontColor: "#666",
													bodySpacing: 4,
													xPadding: 12,
													mode: "nearest",
													intersect: 0,
													position: "nearest",
												},
												responsive: true,
												scales: {
													yAxes: [
														{
															barPercentage: 1.6,
															gridLines: {
																drawBorder: false,
																color: "rgba(29,140,248,0.0)",
																zeroLineColor: "transparent",
															},
															ticks: {
																padding: 0,
																fontColor: "#9a9a9a",
																stepSize: 50000,
															},
														},
													],
													xAxes: [
														{
															barPercentage: 1.6,
															gridLines: {
																drawBorder: false,
																color: "rgba(29,140,248,0.1)",
																zeroLineColor: "transparent",
															},
															ticks: {
																padding: 10,
																fontColor: "#9a9a9a",
																stepSize: 2,
															},
														},
													],
												},
											}}
										/>
									</div>
								</CardBody>
							</Card>
						</Col>
						<Col lg="3" md="6">
							<Card className="card-stats">
								<CardBody>
									<Row>
										<Col xs="5">
											<div className="info-icon text-center icon-warning">
												<i className="tim-icons icon-molecule-40" />
											</div>
										</Col>
										<Col xs="7">
											<div className="numbers">
												<p className="card-category">CASOS TOTALES</p>
												<CardTitle tag="h3">{this.state.totalCases}</CardTitle>
											</div>
										</Col>
									</Row>
								</CardBody>
								<CardFooter>
									<hr />
									<div className="stats" style={{ textAlign: "right" }}>
										Confirmados
									</div>
								</CardFooter>
							</Card>
						</Col>
						<Col lg="3" md="6">
							<Card className="card-stats">
								<CardBody>
									<Row>
										<Col xs="5">
											<div className="info-icon text-center icon-primary">
												<i className="tim-icons icon-single-02" />
											</div>
										</Col>
										<Col xs="7">
											<div className="numbers">
												<p className="card-category">
													CASOS DIARIOS CONFIRMADOS
												</p>
												<CardTitle tag="h3">
													{this.state.confirmedPerMillion}
												</CardTitle>
											</div>
										</Col>
									</Row>
								</CardBody>
								<CardFooter>
									<hr />
									<div className="stats" style={{ textAlign: "right" }}>
										Por millón de la población
									</div>
								</CardFooter>
							</Card>
						</Col>
						<Col lg="3" md="6">
							<Card className="card-stats">
								<CardBody>
									<Row>
										<Col xs="5">
											<div className="info-icon text-center icon-success">
												<i className="tim-icons icon-check-2" />
											</div>
										</Col>
										<Col xs="7">
											<div className="numbers">
												<p className="card-category">INDICE DE RECUPERACION</p>
												<CardTitle tag="h3">
													{this.state.recoveryRate}%
												</CardTitle>
											</div>
										</Col>
									</Row>
								</CardBody>
								<CardFooter>
									<hr />
									<div className="stats" style={{ textAlign: "right" }}>
										De casos totales
									</div>
								</CardFooter>
							</Card>
						</Col>
						<Col lg="3" md="6">
							<Card className="card-stats">
								<CardBody>
									<Row>
										<Col xs="5">
											<div className="info-icon text-center icon-danger">
												<i className="tim-icons icon-alert-circle-exc" />
											</div>
										</Col>
										<Col xs="7">
											<div className="numbers">
												<p className="card-category">TASA DE FATALIDAD</p>
												<CardTitle tag="h3">
													{this.state.fatalityRate}%
												</CardTitle>
											</div>
										</Col>
									</Row>
								</CardBody>
								<CardFooter>
									<hr />
									<div className="stats" style={{ textAlign: "right" }}>
										De casos totales
									</div>
								</CardFooter>
							</Card>
						</Col>
					</Row>

					<Row>
						<Col lg="3">
							<Card style={{ height: "800px", overflowY: "auto" }}>
								<CardHeader>
									<CardTitle tag="h3">Estado de cuarentenas en la RM</CardTitle>
								</CardHeader>
								<CardBody>
									<Table responsive>
										<thead className="text-primary">
											<tr>
												<th>Comuna</th>
												<th>Estado de Cuarentena</th>
											</tr>
										</thead>
										<tbody>{this.state.tableData}</tbody>
									</Table>
								</CardBody>
							</Card>
						</Col>

						<Col lg="9">
							<Card style={{ height: "800px" }}>
								<CardBody style={{ padding: 0 }}>
									<ReactPlayer
										style={{ padding: 0, borderRadius: "10px" }}
										width="100%"
										height="100%"
										url="https://youtu.be/XBoFJp_rbYQ"
									/>
								</CardBody>
							</Card>
						</Col>

						<Col lg="12">
							<Card>
								<CardHeader>
									<CardTitle tag="h3">Paises más afectados</CardTitle>
									<p className="card-category">
										Casos confirmados y porcentaje de casos del mundo
									</p>
								</CardHeader>
								<CardBody>
									<Row>
										<Col md="6">
											<Table responsive>
												<thead className="text-primary">
													<tr>
														<th></th>
														<th>País</th>
														<th className="text-right">Casos</th>
														<th className="text-right">% de casos del mundo</th>
													</tr>
												</thead>
												<tbody>{this.state.top6TableData}</tbody>
											</Table>
										</Col>
										<Col className="ml-auto mr-auto" md="6">
											<VectorMap
												map={"world_mill"}
												backgroundColor="transparent"
												zoomOnScroll={false}
												containerStyle={{
													width: "100%",
													height: "300px",
												}}
												regionStyle={{
													initial: {
														fill: "#e4e4e4",
														"fill-opacity": 0.9,
														stroke: "none",
														"stroke-width": 0,
														"stroke-opacity": 0,
													},
												}}
												series={{
													regions: [
														{
															values: this.state.mapData,
															scale: ["#FFFFFF", "#FF0000"],
															normalizeFunction: "polynomial",
														},
													],
												}}
											/>
										</Col>
									</Row>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</div>
			</>
		);
	}
}

export default Dashboard;
