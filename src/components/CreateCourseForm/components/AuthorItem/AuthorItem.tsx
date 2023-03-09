import { FC } from 'react';
import styled from 'styled-components';
import Button from '../../../../common/Button/Button';

interface Props {
	author: Author;
	addAuthorToCourse: (authorId: string) => void;
	className?: string;
	isInCourse?: boolean;
}

const AuthorItem: FC<Props> = ({
	author,
	addAuthorToCourse,
	className,
	isInCourse,
}) => {
	return (
		<div className={className} data-testid='author-listItem'>
			<p>{author.name}</p>
			<Button
				onClick={() => {
					addAuthorToCourse(author.id);
				}}
			>
				{isInCourse ? '-' : '+'}
			</Button>
		</div>
	);
};

export default styled(AuthorItem)`
	width: 100%;
	display: flex;
	max-width: 275px;

	p {
		margin-right: 10px;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		flex: 2;
	}

	button {
		flex: 1;
	}
`;
