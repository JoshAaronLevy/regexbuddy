export const filterValues = (...input) => {
	if (input.length < 2) input.push(/[a-cA-c]+/);
	console.log("input:", input);
	const myRe = new RegExp(input[1]);
	if (typeof input[0] !== 'string') input = input[0];
	const regexBuddyResult = input.filter(item => {
		if (myRe.test(item)) return item;
	});
	console.log("regexBuddyResult:", regexBuddyResult);
	return regexBuddyResult;
}