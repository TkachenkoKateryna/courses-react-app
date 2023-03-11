import { screen } from '@testing-library/react';

import { formatCreationDate } from '../../../../helpers/formatCreationDate';
import { getCourseDuration } from '../../../../helpers/getCourseDuration';
import { customRender } from '../../../../helpers/test.utils';
import { CourseCard } from './CourseCard';

const courseViewItem: CourseView = {
	id: '2f4c626d-1b35-4716-bc1c-6f5b8c416ac7',
	title: 'testCourse',
	description: 'testCourseDescription',
	duration: getCourseDuration(100),
	creationDate: formatCreationDate('22.11.2022'),
	authors: 'adam, lory',
};

describe('Test CourseCard', () => {
	test('Test render props at CourseCard', () => {
		customRender(<CourseCard course={courseViewItem} />);

		const title = screen.getByText(courseViewItem.title);
		const description = screen.getByText(courseViewItem.description);
		const duration = screen.getByText(courseViewItem.duration);
		const creationDate = screen.getByText(courseViewItem.creationDate);
		const authors = screen.getByText(courseViewItem.authors);

		expect(title).toBeInTheDocument();
		expect(description).toBeInTheDocument();
		expect(duration).toBeInTheDocument();
		expect(creationDate).toBeInTheDocument();
		expect(authors).toBeInTheDocument();
	});
});
