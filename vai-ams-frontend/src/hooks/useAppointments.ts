import { AxiosResponse } from "axios";
import { appointmentAPI } from "../api/appointment";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/user";

export const useAppointments = () =>
{
    const [appointments, setAppointments] = useState<any>([]);
    const [failure, setFailure] = useState(false);
    const [loading, setLoading] = useState(false);
	const { user } = useContext(UserContext);
    
	const getAppointments = async () =>
	{
		try
		{
			setLoading(true);
			const response = await appointmentAPI.getAppointments({userID: user.id, userType: user.userType});
			setAppointments(response);
		}
		catch (errorObject)
		{
            setFailure(true);
		}
		finally
		{
			setLoading(false);
		}
	}

	useEffect(() => 
    {
        getAppointments();
    }, []);

	return { appointments, failure, loading, setAppointments };
}