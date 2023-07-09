import './application.css';
import "@arco-design/web-react/dist/css/arco.css";
import Authentication from './pages/authentication/authentication';
import { NotFound } from './pages/not-found/not-found';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from './routes/private-route';
import RestrictedRoute from './routes/restricted-route';
import UserProvider from './contexts/user';
import { Profile } from './pages/profile/profile';

const Application = () => (
	<Router basename="/" key="routerKey">
		<UserProvider>
			<Routes key="routesKey">
				<Route
					key="authenticationRouteKey"
					path="/authentication"
					element={<RestrictedRoute><Authentication /></RestrictedRoute>}
				/>
				<Route
					key="profileRouteKey"
					path="/profile"
					element={<PrivateRoute><Profile /></PrivateRoute>}
				/>
				<Route key="notFoundRouteKey" path="/*" element={<NotFound />} />
			</Routes>
		</UserProvider>
	</Router>
);

export default Application;