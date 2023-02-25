import { FC, useState } from 'react';
import styled from 'styled-components';

import Button from '../../../../common/Button/Button';
import Input from '../../../../common/Input/Input';

interface Props {
	searchOnCourses: (searchText: string) => void;
	className?: string;
}

const SearchBar: FC<Props> = ({ searchOnCourses, className }) => {
	const [text, setText] = useState('');
	return (
		<div className={className}>
			<Input
				value={text}
				onChange={(name: string, value: string) => {
					setText(value);
				}}
				name='search'
				iconName='search'
			/>
			<div className='actions'>
				<Button
					buttonText='Cancel'
					onClick={() => {
						setText('');
						searchOnCourses('');
					}}
				/>
				<Button
					buttonText='Search'
					onClick={() => {
						searchOnCourses(text);
					}}
				/>
			</div>
		</div>
	);
};

export default styled(SearchBar)`
	display: flex;
	width: 100%;

	.actions {
		button:first-of-type {
			margin-right: 10px;
		}
	}
`;
