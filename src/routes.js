import Dashboard from "views/Dashboard.js";

const routes = [
	// lista de rutas
	{
		path: "/dashboard", // ruta
		name: "Dashboard", // nombre para que el desarrollador pueda identificar la ruta
		component: Dashboard, // componente que se hace display
		layout: "/tracker", // componente que estructura los componentes que contiene
	},
];

export default routes;
