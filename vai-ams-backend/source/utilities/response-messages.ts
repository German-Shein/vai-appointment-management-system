export const responseMessages = 
{
	ERROR:
	{
		UNKNOWN_ERROR: 'Unknown error has occurred',
		UNAUTHENTICATED: 'The user is not authenticated',
		UNAUTHORIZED: 'Unauthorized access',
		FORBIDDEN: 'Forbidden access',
		VALIDATION_ERROR: 'Invalid or missing parameters',
		APPOINTMENT: 
		{
			APPOINTMENT_CREATION_ERROR: 'Appointment had an error during the creation',
			APPOINTMENT_DELETION_ERROR: 'Appointment had an error during the deletion',
			APPOINTMENT_DUPLICATED: 'Appointment already exists',
			APPOINTMENT_NOT_FOUND: 'Appointment was not found',
			APPOINTMENT_RETRIEVAL_ERROR: 'Appointment had an error during the retrieval',
			APPOINTMENT_UPDATE_ERROR: 'Appointment had an error during the update'
		},
		AUTHENTICATION:
		{
			USER_REGISTRATION_ERROR: 'User had an error during the registration',
            USER_DUPLICATED: 'User already exists',
			USER_NOT_FOUND: 'User was not found',
			USER_AUTHENTICATION_ERROR: 'User could not be authenticated',
		}
	},
	SUCCESS:
	{
		APPOINTMENT:
		{
			APPOINTMENT_CREATED: 'Appointment is created successfully',
			APPOINTMENT_DELETED: 'Appointment is deleted successfully',
			APPOINTMENT_RETRIEVED: 'Appointment is retrieved successfully',
			APPOINTMENT_UPDATED: 'Appointment is updated successfully'
		},
		AUTHENTICATION:
		{
			USER_REGISTERED: 'User is registered successfully',
			USER_LOGGED_IN: 'User is logged in successfully',
		}
	}
}