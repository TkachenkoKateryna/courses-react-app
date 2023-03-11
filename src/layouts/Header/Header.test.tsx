import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { customRender } from '../../helpers/test.utils';
import Header from './Header';

describe('Test Header', () => {
	test('Contains logo', () => {
		customRender(<Header />);

		const logo = screen.getByText('logo.svg');

		expect(logo).toBeInTheDocument();
	});

	test('Redirects to Login', () => {
		customRender(<Header />);

		const buttonElement = screen.getByRole('button');
		userEvent.click(buttonElement);

		expect(window.location.pathname).toBe('/auth/login');
	});
});
