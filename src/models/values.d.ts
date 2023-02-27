interface CreateCourseFormValues {
	title: string;
	duration: number;
	description: string;
	authors: string[];
}

interface CreateCourseFormErrors {
	title: string;
	duration: string;
	description: string;
	authors: string;
}

interface CreateAuthorFormValues {
	name: string;
}

interface AuthFormValues {
	name: string;
	email: string;
	password: string;
}

interface AuthFormErrors {
	name: string;
	email: string;
	password: string;
}
