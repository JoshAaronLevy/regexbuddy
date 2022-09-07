export const filterValues = async (...input) => {
	if (input.length < 2) input.push(/[a-cA-c]+/);
	console.log("input:", input);
	const myRe = new RegExp(input[1]);
	if (typeof input[0] !== 'string') input = input[0];
	const regexBuddyResult = await input.filter(item => {
		if (myRe.test(item)) {
			console.log("item:", item);
			return item;
		};
	});
	return regexBuddyResult;
}