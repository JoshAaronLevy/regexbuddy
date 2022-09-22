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

Default requirements are that a password must contain:

1. At least one uppercase letter
2. At least one lowercase letter
3. At least one number
4. At least one special character
5. A minimum of 5 characters

The default requirements can be overwritten by passing in your requirements in the validate function like this:

```javascript
regexBuddy.password(input).validate({ minlength: 8, requireNumber: false });
```

**NOTE:** Options that are ignored will still have their default values used. So in the example above, a password must have at least 8 characters and does not need to have a number. But it must also still include an uppercase letter, lowercase letter, and a special character.