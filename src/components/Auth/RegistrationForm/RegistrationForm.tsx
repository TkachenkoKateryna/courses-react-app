import { FC, SyntheticEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import agent from '../../../api/agent';
import Button from '../../../common/Button/Button';
import Input from '../../../common/Input/Input';

interface Props {
	className?: string;
}

const RegistrationForm: FC<Props> = ({ className }) => {
	const navigate = useNavigate();

	const [registrationForm, setRegistrationForm] = useState<AuthFormValues>({
		name: '',
		email: '',
		password: '',
	});

	const [registrationErrors, setRegistrationFormErrors] =
		useState<AuthFormErrors>({
			name: 'Name is required',
			email: 'Email is required',
			password: 'Password is required',
		});

	const [hasError, setHasError] = useState(false);

	const isValid = !Object.values(registrationErrors).some((field) => field);

	const onChangeHandler = (name: string, value: string) => {
		setRegistrationFormErrors((prevState) => ({
			...prevState,
			[name]: value ? '' : `${name} is required`,
		}));

		setRegistrationForm((prevState) => ({ ...prevState, [name]: value }));
	};

	const submitHandler = async (event: SyntheticEvent) => {
		event.preventDefault();

		if (!isValid) {
			setHasError(true);
			return;
		}

		const { successful, errors } = await agent.Auth.register(registrationForm);

		if (successful) {
			navigate('/auth/login');
		}

		errors.forEach((err) => {
			const name = err.substr(0, err.indexOf(' ')).replaceAll("'", '');
			setRegistrationFormErrors((prevState) => ({
				...prevState,
				[name]: err,
			}));
		});
		setHasError(true);
	};

	return (
		<div className={className}>
			<form onSubmit={submitHandler}>
				<Input
					name='name'
					label='Name'
					placeholder='Enter name'
					value={registrationForm.name}
					onChange={onChangeHandler}
					errorText={registrationErrors.name}
					hasError={hasError}
				/>
				<Input
					name='email'
					label='Email'
					placeholder='Enter email'
					value={registrationForm.email}
					onChange={onChangeHandler}
					errorText={registrationErrors.email}
					hasError={hasError}
				/>
				<Input
					name='password'
					label='Password'
					placeholder='Enter password'
					value={registrationForm.password}
					onChange={onChangeHandler}
					errorText={registrationErrors.password}
					hasError={hasError}
				/>
				<Button buttonText='Registration' />
			</form>
			<p>
				If you have an account you can <Link to='/auth/login'>login</Link>
			</p>
		</div>
	);
};

export default styled(RegistrationForm)`
	display: flex;
	align-items: center;
	flex-direction: column;

	form {
		width: 50%;
	}
`;
