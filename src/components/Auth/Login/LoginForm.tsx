import { FC, SyntheticEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import agent from '../../../api/agent';
import Button from '../../../common/Button/Button';
import Input from '../../../common/Input/Input';
import { getFieldName } from '../../../helpers/common';
import { loginActionCreator } from '../../../store/user/user.actions';

interface Props {
	className?: string;
}

const LoginForm: FC<Props> = ({ className }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [loginForm, setLoginForm] = useState<AuthFormValues>({
		name: '',
		email: '',
		password: '',
	});

	const [loginFormErrors, setLoginFormErrors] = useState<AuthFormErrors>({
		name: 'Name is required',
		email: 'Email is required',
		password: 'Password is required',
	});

	const [hasError, setHasError] = useState(false);

	const isValid = !Object.values(loginFormErrors).some((field) => field);

	const onChangeHandler = (name: string, value: string) => {
		setLoginFormErrors((prevState) => ({
			...prevState,
			[name]: value ? '' : `${name} is required`,
		}));

		setLoginForm((prevState) => ({ ...prevState, [name]: value }));
	};

	const loginHandler = async (values: AuthFormValues) => {
		const data = await agent.Auth.login(values);

		if (data.successful) {
			dispatch(loginActionCreator(data));
			localStorage.setItem('jwt', data.result);
			navigate('/');
		}

		if (data.errors) {
			data.errors.forEach((err) => {
				const name = getFieldName(err);
				setLoginFormErrors((prevState) => ({
					...prevState,
					[name]: err,
				}));
			});
		}

		setHasError(true);
	};

	const submitHandler = async (event: SyntheticEvent) => {
		event.preventDefault();

		if (!isValid) {
			setHasError(true);
			return;
		}

		await loginHandler(loginForm);
	};

	return (
		<div className={className}>
			<form onSubmit={submitHandler}>
				<Input
					name='name'
					label='Name'
					placeholder='Enter name'
					value={loginForm.name}
					onChange={onChangeHandler}
					errorText={loginFormErrors.name}
					hasError={hasError}
				/>
				<Input
					name='email'
					label='Email'
					placeholder='Enter email'
					value={loginForm.email}
					onChange={onChangeHandler}
					errorText={loginFormErrors.email}
					hasError={hasError}
				/>
				<Input
					name='password'
					label='Password'
					placeholder='Enter password'
					value={loginForm.password}
					onChange={onChangeHandler}
					errorText={loginFormErrors.password}
					hasError={hasError}
				/>
				<Button>Login</Button>
			</form>
			<p>
				If you have an account you can <Link to='/auth/register'>register</Link>
			</p>
		</div>
	);
};

export default styled(LoginForm)`
	display: flex;
	align-items: center;
	flex-direction: column;

	form {
		width: 50%;
	}
`;
