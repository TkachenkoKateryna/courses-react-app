export const getFieldName = (err: string) => {
	return err.substr(0, err.indexOf(' ')).replaceAll("'", '');
};
