const baseURL = 'http://localhost:4000';

const Auth = {
	register: async (user: AuthFormValues): Promise<RegisterResponse> => {
		const response = await fetch(`${baseURL}/register`, {
			method: 'POST',
			body: JSON.stringify(user),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return response.json();
	},
	login: async (user: AuthFormValues): Promise<LoginResponse> => {
		const response = await fetch(`${baseURL}/login`, {
			method: 'POST',
			body: JSON.stringify(user),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return response.json();
	},
};

const agent = {
	Auth,
};

export default agent;
