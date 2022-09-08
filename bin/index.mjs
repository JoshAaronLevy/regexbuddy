export const email = (emailAddress) => {
	return {
		validate: () => validateEmail(emailAddress)
	};
}

export const validateEmail = (emailAddress) => {
	if (emailAddress.constructor.name !== 'String') {
		console.error(`Invalid input type for email. Expected a string, but got ${emailAddress.constructor.name}`);
		return false;
	} else {
		const myRe = new RegExp(/^[^@ ]+@[^@ ]+\.[^@ \.]{2,}$/);
		if (!myRe.exec(emailAddress)) {
			console.error(`Invalid email address: ${emailAddress}`);
			return false;
		} else {
			return true;
		}
	}
}