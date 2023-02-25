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
