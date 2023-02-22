interface Course {
	id: string;
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: string[];
}

interface CourseView extends Course {
	authors: string;
	duration: string;
}
