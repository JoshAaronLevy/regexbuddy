const validateEmail = (emailAddress) => {
	if (!emailAddress) {
		console.error(`No email address provided`);
		return false;
	}
	if (emailAddress = undefined) {
		console.error(`Invalid input for email. Expected a string, but got ${undefined}`);
		return false;
	}
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

export const email = (emailAddress) => {
	return {
		validate: () => validateEmail(emailAddress)
	};
}