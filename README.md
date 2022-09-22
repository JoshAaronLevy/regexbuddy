# RegexBuddy

regexbuddy allows you to implement common regex functionality in your code, using a simplified syntax. Currently, regexbuddy has functions for regex-based password validation, as well as array duplicate functions. The array functions - along with other features - are being added, and a new version is released weekly. 

## Installation

**Install in your project locally:**

```bash
npm install regexbuddy
```

## Implement into your project

> Step 1: Import into your project

**NOTE:** Since regexbuddy has function names that are considered generic (i.e. `password(input).validate()`), it's recommended to import it like this:

```javascript
import * as regexBuddy from "regexbuddy";
```

> Step 2: That way, you can use it in your code like this

```javascript
regexBuddy.password(input).validate();
```

**COMMENT:** While having generic-sounding function names is a (rightfully) contested topic, doing so makes the syntax feel more natural. And implementing it like the example above makes it easier to find where regexbuddy is used in your code, because the functions are prefixed with `regexBuddy`.

## Available Functions and Methods

### Password Validation

**NOTE:** The password validation method simply returns `true` or `false`.

For password validation, you can simply use:

```javascript
regexBuddy.password(input).validate();
```

This takes the `input` value you pass in as an argument, and validates against the default password requirements.

Default requirements are that a password must contain (with the option name and data type for overwriting defaults):

1. At least one uppercase letter (name: requireUpperCase, type: boolean)
2. At least one lowercase letter (name: requireLowerCase, type: boolean)
3. At least one number (name: requireNumber, type: boolean)
4. At least one special character (name: requireSpecialCharacter, type: boolean)
5. A minimum of 5 characters (name: minLength, type: number)

The default requirements can be overwritten by passing in your requirements in the validate function like this:

```javascript
regexBuddy.password(input).validate({ minlength: 8, requireSpecialCharacter: false });
```

**NOTE:** Options that are ignored will still have their default values used. So in the example above, a password must have at least 8 characters and does not need to have a number. But it must also still include an uppercase letter, lowercase letter, and a special character.

An example of how to use this in your code would be:

```javascript
const validPassword = regexBuddy.password(input).validate({ minlength: 8, requireSpecialCharacter: false });
```

This would let you reference the `validPassword` variable in a simple way, like this conditional statement:

```javascript
// If a password is valid
if (validPassword) {
  // Run this code
  ...
}
```

Or implement in your corresponding template file, like this:

```html
<button type="submit" disabled={!validPassword}>Submit</button>
```