import { AUTHENTICATION_FORM } from '../../configuration/constants';
import { Form, Input, Button, Select, } from '@arco-design/web-react';
import { useState } from 'react';
import { USER_TYPE } from '../../configuration/constants';
import { authenticationAPI } from '../../api/authentication';
import { UserContext } from '../../contexts/user';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const FormItem = Form.Item;
const Option = Select.Option;

const Authentication = () => 
{
	const [authenticationForm, setAuthenticationForm] = useState(AUTHENTICATION_FORM.LOG_IN);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [userType, setUserType] = useState('');
	const { user, setUser } = useContext(UserContext);
	const navigate = useNavigate()

	const logIn = async () =>
	{
		if (email === '' || password === '')
		{
			return;
		}
		const user = await authenticationAPI.logIn ({email, password});
		if (user.code !== 200)
		{
			return;
		}
		setUser(user.data);
		if (user.code === 200)
		{
			navigate('/profile');
		}
	}

	return (<Form autoComplete='off'>
		<FormItem label='Email'>
			<Input />
		</FormItem>
		<FormItem label='Password'>
			<Input.Password />
		</FormItem>
		{
			authenticationForm === AUTHENTICATION_FORM.REGISTRATION && 
			<FormItem label='User Type'>
				<Select placeholder='What is your role?'>
					{Object.keys(USER_TYPE).map((userType: string) => <Option key={userType} value={userType}>{userType.charAt(0).toUpperCase() + userType.slice(1).toLowerCase()}</Option>)}
				</Select>
			</FormItem>
		}
		<Button type='text' onClick={() => setAuthenticationForm(authenticationForm === AUTHENTICATION_FORM.LOG_IN ? AUTHENTICATION_FORM.REGISTRATION : AUTHENTICATION_FORM.LOG_IN)}>{authenticationForm === AUTHENTICATION_FORM.LOG_IN ? 'Don\'t have an account? Register here!' : 'Already registered? Log in here!'}</Button>
		<FormItem>
			<Button type='primary'>{authenticationForm === AUTHENTICATION_FORM.LOG_IN ? 'Log In' : 'Register'}</Button>
		</FormItem>
	</Form>);
}

  
export default Authentication;