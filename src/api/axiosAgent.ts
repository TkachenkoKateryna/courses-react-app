import axios, { AxiosHeaders, AxiosResponse } from 'axios';
import { store } from '../store/store';

axios.defaults.baseURL = 'http://localhost:4000';

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use((config) => {
	const token = store.getState().userReducer.token;
	if (token && config.headers) {
		(config.headers as AxiosHeaders).set('Authorization', token);
	}
	return config;
});

const requests = {
	get: <T>(url: string) => axios.get<T>(url).then(responseBody),
	post: <T>(url: string, body: object) =>
		axios.post<T>(url, body).then(responseBody),
	put: <T>(url: string, body: object) =>
		axios.put<T>(url, body).then(responseBody),
	del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Authors = {
	get: () => requests.get<ApiResponse<Author[]>>('/authors/all'),
	add: (author: CreateAuthorFormValues) =>
		requests.post<ApiResponse<Author>>('/authors/add', author),
};

const Courses = {
	get: () => requests.get<ApiResponse<Course[]>>('/courses/all'),
	getById: (id: string) => requests.get<ApiResponse<Course>>(`/courses/${id}`),
	add: (course: CreateCourseFormValues) =>
		requests.post<ApiResponse<Course>>('/courses/add', course),
	remove: (id: string) => requests.del<SuccessResponse>(`/courses/${id}`),
	update: (course: CreateCourseFormValues, id: string) =>
		requests.put<ApiResponse<Course>>(`/courses/${id}`, course),
};

const Auth = {
	register: (user: AuthFormValues) =>
		requests.post<RegisterResponse>('/register', user),
	login: (user: AuthFormValues) => requests.post<LoginResponse>('/login', user),
	getCurrentUser: () => {
		return requests.get<ApiResponse<User>>('/users/me');
	},
	logout: () => requests.del<SuccessResponse>('/logout'),
};

const axiosAgent = {
	Authors,
	Courses,
	Auth,
};

export default axiosAgent;
