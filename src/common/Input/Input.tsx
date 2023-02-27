import { FC, SyntheticEvent } from 'react';
import styled from 'styled-components';
import Error from '../Error/Error';

interface Props {
	className?: string;
	iconName?: string;
	label?: string;
	type?: string;
	value: string | number;
	placeholder?: string;
	onChange?: (name: string, value: string) => void;
	onBlur?: () => void;
	hasError?: boolean;
	errorText?: string;
	name: string;
	min?: number;
}
const Input: FC<Props> = (props) => {
	const onChangeHandler = (event: SyntheticEvent) => {
		const value = (event.target as HTMLInputElement).value;
		const name = (event.target as HTMLInputElement).name;

		props.onChange?.(name, value);
	};

	return (
		<Root>
			{props.label && <label>{props.label}</label>}
			<Wrapper>
				{props.iconName && (
					<span className='material-icons'>{props.iconName}</span>
				)}
				<input
					type={props.type}
					id={props.type}
					value={props.value}
					onChange={onChangeHandler}
					onBlur={props.onBlur}
					placeholder={props.placeholder}
					name={props.name}
					min={props.min}
				/>
			</Wrapper>
			{!!props.hasError && <Error>{props.errorText}</Error>}
		</Root>
	);
};

export default Input;

const Root = styled.div`
	box-sizing: border-box;
	width: 100%;
	margin-bottom: 10px;

	label {
		color: #a0a0a0;
	}
`;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	box-sizing: border-box;
	border: 2px lightgrey solid;
	border-radius: 10px;

	input {
		box-sizing: border-box;
		padding: 10px 8px 10px 8px;
		border: none;
		width: 100%;
		border-radius: 10px;

		&::placeholder {
			font-size: 16px;
			color: #504d4d;
		}

		&:focus {
			outline: none;

			&::placeholder {
				color: transparent;
			}
		}
	}

	span {
		font-weight: 700;
	}
`;
