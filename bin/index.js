export const filterValues = (...input) => {
	// In case an expression is not passed in, set a default one for the time being
	if (input.length < 2) input.push(/[a-cA-c]+/);
	const myRe = new RegExp(input[1]);
	if (typeof input[0] !== 'string') input = input[0];
	const regexBuddyResult = input.filter(item => {
		if (myRe.test(item)) return item;
	});
	console.log("regexBuddyResult:", regexBuddyResult);
	return regexBuddyResult;
}