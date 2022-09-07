// ...input accepts the input from the user at index 0, and the desired expression at index 1
export const filterValues = (...input) => {
	// Next line is a default expression to test the function and condition for missing expression in the arguments passed in
	if (input.length < 2) input.push(/[a-cA-c]+/);
	const myRe = new RegExp(input[1]);
	if (typeof input[0] !== 'string') input = input[0];
	return input.filter(item => {
		if (myRe.test(item)) return item;
	});
}