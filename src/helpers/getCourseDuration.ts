export const getCourseDuration = (duration: number): string => {
	const hh: number = Math.floor(duration / 60);
	const mm: number = duration % 60;
	let resultStr = '';

	resultStr += hh < 10 ? `0${hh}:` : `${hh}:`;
	resultStr += mm < 10 ? `0${mm} ` : `${mm} `;
	resultStr +=
		hh === 1
			? 'hour'
			: hh === 0 && mm === 1
			? 'minute'
			: hh === 0 && mm > 1
			? 'minutes'
			: 'hours';

	return resultStr;
};
