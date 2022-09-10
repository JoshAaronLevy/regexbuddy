import * as expressions from "../lib/expressions.mjs";

const renderError = (errorMsg) => {
	return console.error(`RegexBuddy: ` + errorMsg);
}

const validateEmail = (emailAddress) => {
	let emailValid = false;
	if (!emailAddress || emailAddress === undefined) renderError(`No email address provided`);
	if (emailAddress.constructor.name !== 'String') renderError(`Invalid input type for email. Expected a string, but got ${emailAddress.constructor.name}`);
	!expressions.baseEmail.exec(emailAddress) ? renderError(`Invalid email address: ${emailAddress}`) : emailValid = true;
	return emailValid;
}

export const email = (emailAddress) => {
	return {
		validate: () => validateEmail(emailAddress)
	};
}