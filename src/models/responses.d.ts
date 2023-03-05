interface LoginResponse {
	result: string;
	user: User;
	successful: boolean;
	errors?: string[];
}

interface RegisterResponse {
	successful: string;
	errors: string[];
}

interface SuccessResponse {
	successful: boolean;
}
