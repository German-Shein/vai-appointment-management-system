import { Navigate, Outlet } from 'react-router-dom';
import { ReactElement, useContext } from 'react';
import { UserContext } from '../contexts/user';

type Props = 
{
	children: ReactElement;
	redirectionPath?: string;
};

const PrivateRoute = ({ children, redirectionPath = '/authentication' }: Props): JSX.Element => 
{
	const userContext = useContext(UserContext);
	const user = userContext.user;
	if (!user.token || user.token === '')
	{
		return <Navigate to={redirectionPath} replace />;
	}
	return children ? children : <Outlet />;
};

export default PrivateRoute;