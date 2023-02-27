import { FC, SyntheticEvent, useState } from 'react';
import styled from 'styled-components';

import Button from '../../../../common/Button/Button';
import Input from '../../../../common/Input/Input';

interface Props {
	addAuthor: (newAuthor: CreateAuthorFormValues) => void;
}

const CreateAuthorForm: FC<Props> = ({ addAuthor }) => {
	const [author, setAuthor] = useState<CreateAuthorFormValues>({ name: '' });

	const onChangeHandler = (name: string, value: string) => {
		setAuthor((prevState) => ({ ...prevState, [name]: value }));
	};

	const onSubmitHandler = (event: SyntheticEvent) => {
		event.preventDefault();

		addAuthor(author);
		setAuthor({ name: '' });
	};

	return (
		<Form onSubmit={onSubmitHandler}>
			<Input
				type='text'
				label='Author name'
				name='name'
				value={author.name}
				onChange={onChangeHandler}
				placeholder='Set author name'
			/>
			<Button>Submit</Button>
		</Form>
	);
};

export default CreateAuthorForm;

const Form = styled.form`
	display: flex;
	justify-content: space-between;
	height: 100%;

	div {
		margin-right: 10px;
	}

	button {
		align-self: end;
		margin-bottom: 10px;
	}
`;
