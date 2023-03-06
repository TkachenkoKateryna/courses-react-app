import { FC, SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Button from '../../../../common/Button/Button';
import Input from '../../../../common/Input/Input';
import { getIsAuthorLoading } from '../../../../store/authors/authors.selectors';
import { addAuthorThunk } from '../../../../store/authors/authors.thunks';

const CreateAuthorForm: FC = () => {
	const [author, setAuthor] = useState<CreateAuthorFormValues>({ name: '' });
	const dispatch = useDispatch();
	const isLoading = useSelector(getIsAuthorLoading);

	const onChangeHandler = (name: string, value: string) => {
		setAuthor((prevState) => ({ ...prevState, [name]: value }));
	};

	const onSubmitHandler = (event: SyntheticEvent) => {
		event.preventDefault();

		dispatch(addAuthorThunk(author));
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
			<Button isLoading={isLoading}>'Submit'</Button>
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
