const isEmpty = (string) => {
	return string.trim() === '';
};

const isEmail = (email) => {
	const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	return email.match(regEx);
};

exports.validateSignupData = (data) => {
	let errors = {};

	// validating data
	if (isEmpty(data.email)) errors.email = 'Must not be empty';
	else if (!isEmail(data.email)) errors.email = 'Must be a valid email address';

	if (isEmpty(data.password)) errors.password = 'Must not be empty';

	if (data.password !== data.confirmPassword) errors.confirmPassword = 'Passwords must be the same';

	if (isEmpty(data.handle)) errors.handle = 'Must not be empty';

	return {
		errors,
		valid: Object.keys(errors).length === 0,
	};
};

exports.validateLoginData = (data) => {
	let errors = {};

	if (isEmpty(data.email)) errors.email = 'Must not be empty';
	else if (!isEmail(data.email)) errors.email = 'Must be a valid email address';

	if (isEmpty(data.password)) errors.password = 'Must not be empty';

	return {
		errors,
		valid: Object.keys(errors).length === 0,
	};
};

exports.reduceUserDetails = (data) => {
	let userDetails = {};

	if (!isEmpty(data.bio.trim())) {
		userDetails.bio = data.bio;
	}

	if (!isEmpty(data.website.trim())) {
		userDetails.website = data.website.trim().substring(0, 4) !== 'http' ? 'http://' + data.website : data.website;
	}

	if (!isEmpty(data.location.trim())) {
		userDetails.location = data.location;
	}

	return userDetails;
};
