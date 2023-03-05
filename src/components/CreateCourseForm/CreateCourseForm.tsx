import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../../common/Button/Button';
import Error from '../../common/Error/Error';
import Input from '../../common/Input/Input';
import { getCourseDuration } from '../../helpers/getCourseDuration';
import {
	getAuthors,
	getIsAuthorLoaded,
} from '../../store/authors/authors.selectors';
import { fetchAuthorsThunk } from '../../store/authors/authors.thunks';
import {
	getCourseById,
	getCourseItem,
} from '../../store/courses/courses.selectors';
import {
	addCourseThunk,
	editCourseThunk,
	fetchCourseByIdThunk,
} from '../../store/courses/courses.thunks';
import AuthorItem from './components/AuthorItem/AuthorItem';
import CreateAuthorForm from './components/CreateAuthorForm/CreateAuthorForm';
import { getIsCourseLoaded } from './../../store/courses/courses.selectors';

const CreateCourse: FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { courseId } = useParams();
	const authors = useSelector(getAuthors);
	const isLoaded = useSelector(getIsCourseLoaded);
	const areAuthorsLoaded = useSelector(getIsAuthorLoaded);
	const courseItem = isLoaded
		? useSelector(getCourseById(courseId as string))
		: useSelector(getCourseItem);

	const isEdit = !!courseId;

	const [courseForm, setCourseForm] = useState<CreateCourseFormValues>({
		title: '',
		description: '',
		duration: 1,
		authors: [],
	});

	const [courseFormErrors, setCourseFormErrors] =
		useState<CreateCourseFormErrors>({
			title: 'Title is required',
			description: 'Description is required',
			duration: '',
			authors: 'Should be at least 1 author',
		});

	const [hasError, setHasError] = useState(false);

	useEffect(() => {
		if (!isLoaded && courseId) {
			dispatch(fetchCourseByIdThunk(courseId));
		}
	}, [courseId, isLoaded]);

	useEffect(() => {
		if (!areAuthorsLoaded) {
			dispatch(fetchAuthorsThunk());
		}
	}, [areAuthorsLoaded]);

	useEffect(() => {
		if (isEdit) {
			setCourseForm(courseItem as Course);
			setCourseFormErrors((prevState) => ({
				...prevState,
				title: '',
				description: '',
				authors: '',
			}));
		}
	}, [courseItem, isEdit]);

	const isValid = !Object.values(courseFormErrors).some((course) => course);

	const submitHandler = (event: SyntheticEvent) => {
		event.preventDefault();

		if (!isValid) {
			setHasError(true);
			return;
		}

		isEdit
			? dispatch(editCourseThunk(courseForm, courseId))
			: dispatch(addCourseThunk(courseForm));

		navigate('/courses');
	};

	const onChangeHandler = (name: string, value: string) => {
		const newValue = name === 'duration' ? +value : value;

		if (value === '') {
			setCourseFormErrors((prevState) => ({
				...prevState,
				[name]: `${name} is required`,
			}));
		} else if (value.length < 2 && name !== 'duration') {
			setCourseFormErrors((prevState) => ({
				...prevState,
				[name]: `${name} should be more than two symbols`,
			}));
		} else {
			setCourseFormErrors((prevState) => ({
				...prevState,
				[name]: '',
			}));
		}

		setCourseForm((oldCourseForm) => ({ ...oldCourseForm, [name]: newValue }));
	};

	const addAuthorToCourseHandler = (authorId: string) => {
		if (courseForm.authors.length === 0) {
			setCourseFormErrors((prevState) => ({
				...prevState,
				authors: '',
			}));
		}
		setCourseForm((prevState) => ({
			...prevState,
			authors: [...prevState.authors, authorId],
		}));
	};

	const removeAuthorFromCourseHandler = (authorId: string) => {
		if (courseForm.authors.length === 1) {
			setCourseFormErrors((prevState) => ({
				...prevState,
				authors: 'Should be at least 1 author',
			}));
		}
		setCourseForm((prevState) => ({
			...prevState,
			authors: prevState.authors.filter((a) => a !== authorId),
		}));
	};

	return (
		<Root>
			<div className='navigation'>
				<Link to='/'>
					<Button>Return to Courses page</Button>
				</Link>
			</div>
			<div className='course-form-wrapper'>
				<h2>Create Course</h2>
				<form onSubmit={submitHandler} className='course-form'>
					<div className='main-info'>
						<Input
							type='text'
							label='Title'
							name='title'
							value={courseForm.title}
							onChange={onChangeHandler}
							placeholder='Title'
							errorText={courseFormErrors.title}
							hasError={hasError}
						/>
						<div className='duration-wrapper'>
							<Input
								type='number'
								label='Duration'
								name='duration'
								value={courseForm.duration}
								onChange={onChangeHandler}
								placeholder='Duration'
								min={1}
								errorText={courseFormErrors.duration}
								hasError={hasError}
							/>
							<p> {getCourseDuration(courseForm.duration)}</p>
						</div>
						<Input
							type='text'
							label='Description'
							name='description'
							value={courseForm.description}
							onChange={onChangeHandler}
							placeholder='Description'
							errorText={courseFormErrors.description}
							hasError={hasError}
						/>
					</div>
					<div className='authors-info'>
						<div className='all-authors'>
							<h3>Authors</h3>
							{authors
								.filter(
									(author) => !courseForm.authors.some((a) => a == author.id)
								)
								.map((author) => (
									<AuthorItem
										key={author.id}
										author={author}
										addAuthorToCourse={addAuthorToCourseHandler}
									/>
								))}
						</div>
						<div className='course-authors'>
							<h3>Course Authors</h3>
							{!!hasError && <Error>{courseFormErrors.authors}</Error>}
							{courseForm.authors.length === 0 && !hasError && (
								<p>No authors attached to the course</p>
							)}
							{authors
								.filter((author) =>
									courseForm.authors.some((a) => a === author.id)
								)
								.map((author) => (
									<AuthorItem
										key={author.id}
										author={author}
										isInCourse={true}
										addAuthorToCourse={removeAuthorFromCourseHandler}
									/>
								))}
						</div>
					</div>
					<Button disabled={hasError && !isValid}>Submit</Button>
				</form>
			</div>
			<div className='author-form-wrapper'>
				<h2>Create Author</h2>
				<CreateAuthorForm />
			</div>
		</Root>
	);
};

export default CreateCourse;

const Root = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20px;
	box-sizing: border-box;
	flex-wrap: wrap;

	.navigation {
		width: 100%;
	}

	.course-form-wrapper {
		width: calc(60%-100px);
		margin-right: 100px;
		box-sizing: border-box;

		.course-form {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100%;

			.main-info {
				width: 100%;

				.duration-wrapper {
					display: flex;

					p {
						align-self: end;
						flex: 1;
						margin-left: 10px;
					}

					div {
						flex: 2;
					}
				}
			}
		}
	}

	.author-form-wrapper {
		width: 40%;
		align-self: start;
	}

	.authors-info {
		width: 100%;
		display: flex;
		margin-bottom: 20px;

		.all-authors {
			margin-right: 20px;
			width: 50%;
		}

		.course-authors {
			width: 50%;
		}
	}
`;
