import { AUTHENTICATION_FORM } from '../../configuration/constants';
import { Form, Grid, Input, Button, Select, } from '@arco-design/web-react';
import { useEffect, useState } from 'react';
import { USER_TYPE } from '../../configuration/constants';
import { authenticationAPI } from '../../api/authentication';
import { UserContext } from '../../contexts/user';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
//import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';

const Row = Grid.Row;
const Col = Grid.Col;
const FormItem = Form.Item;
const Option = Select.Option;

const Authentication = () => 
{
	const [authenticationForm, setAuthenticationForm] = useState(AUTHENTICATION_FORM.LOG_IN);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [userType, setUserType] = useState('');
	const { user, setUser } = useContext(UserContext);
	const navigate = useNavigate();

	useEffect(() => {
		//loadCaptchaEnginge(5);
	}, [])

	const logIn = async () =>
	{
		if (email === '' || password === '')
		{
			return;
		}
		const response = (await authenticationAPI.logIn({email, password})).data;
		if (response.status !== 200)
		{
			return;
		}
		setUser({id: response.data.user._id, email: response.data.user.email, token: response.data.token, userType: response.data.user.userType});
		if (response.status === 200)
		{
			navigate('/profile');
		}
	}

	const register = async () =>
	{
		if (email === '' || password === '' || userType === '')
		{
			return;
		}
		const response = (await authenticationAPI.register({email, password, userType})).data;
		if (response.status !== 201)
		{
			return;
		}
		setUser({id: response.data.user._id, email: response.data.user.email, token: response.data.token, userType: response.data.user.userType});
		if (response.status === 201)
		{
			navigate('/profile');
		}
	}

	return (
		<Row align='center' style={{height: '100vh'}}>
			<Col span={6}></Col>
			<Col span={12}>
				<Form autoComplete='off'>
					<FormItem label='Email'>
						<Input onChange={(value: string) => setEmail(value)} />
					</FormItem>
					<FormItem label='Password'>
						<Input.Password onChange={(value: string) => setPassword(value)} />
					</FormItem>
					{
						authenticationForm === AUTHENTICATION_FORM.REGISTRATION && 
						<FormItem label='User Type'>
							<Select placeholder='What is your role?'>
								{Object.keys(USER_TYPE).map((type: string) => <Option key={type} onClick={() => setUserType(type)} value={type}>{type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}</Option>)}
							</Select>
						</FormItem>
					}
					<FormItem>
						<Button type='text' onClick={() => setAuthenticationForm(authenticationForm === AUTHENTICATION_FORM.LOG_IN ? AUTHENTICATION_FORM.REGISTRATION : AUTHENTICATION_FORM.LOG_IN)}>{authenticationForm === AUTHENTICATION_FORM.LOG_IN ? 'Don\'t have an account? Register here!' : 'Already registered? Log in here!'}</Button>
					</FormItem>
					{
						/*authenticationForm === AUTHENTICATION_FORM.LOG_IN &&
						<LoadCanvasTemplate></LoadCanvasTemplate>*/
					}
					<FormItem>
						<Button type='primary' onClick={authenticationForm === AUTHENTICATION_FORM.LOG_IN ? logIn : register}>{authenticationForm === AUTHENTICATION_FORM.LOG_IN ? 'Log In' : 'Register'}</Button>
					</FormItem>
				</Form>
			</Col>
			<Col span={6}></Col>
		</Row>
	);
}

  
export default Authentication;