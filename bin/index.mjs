const renderError = (errorMsg) => {
	return console.error(`RegexBuddy: ` + errorMsg);
}

const validateEmail = (emailAddress) => {
	if (!emailAddress || emailAddress === undefined) {
		renderError(`No email address provided`);
		return false;
	} else {
		if (emailAddress.constructor.name !== 'String') {
			renderError(`Invalid input type for email. Expected a string, but got ${emailAddress.constructor.name}`);
			return false;
		} else {
			const myRe = new RegExp(/^[^@ ]+@[^@ ]+\.[^@ \.]{2,}$/);
			if (!myRe.exec(emailAddress)) {
				renderError(`Invalid email address: ${emailAddress}`);
				return false;
			} else {
				return true;
			}
		}
	}
}

export const email = (emailAddress) => {
	return {
		validate: () => validateEmail(emailAddress)
	};
}