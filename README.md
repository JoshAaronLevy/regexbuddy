<div align="center">
  <p>Implement common regex functionality in your code with a simplified syntax</p>
  <a href="https://github.com/joshaaronlevy/regexbuddy/actions"><img src="https://github.com/joshaaronlevy/regexbuddy/workflows/CI/badge.svg?branch=main" alt="Build status"></a>
  <a href="https://coveralls.io/github/joshaaronlevy/regexbuddy"><img src="https://img.shields.io/coveralls/github/joshaaronlevy/regexbuddy" alt="Coverage status"></a>
  <a href="https://packagephobia.now.sh/result?p=regexbuddy"><img src="https://badgen.net/packagephobia/install/regexbuddy" alt="Current version"></a>
  <a href="https://www.npmjs.com/package/regexbuddy"><img src="https://img.shields.io/npm/v/regexbuddy" alt="Install size"></a>
</div>

---

# RegexBuddy

regexbuddy allows you to implement common regex functionality in your code, using a simplified syntax. Currently, regexbuddy has functions for regex-based password validation, as well as array duplicate functions. The array functions - along with other features - are being added, and a new version is released weekly.

## Features

#### 1. Email Validation

#### 2. Password Validation

#### 3. Case Conversion

#### 4. Array De-Duplication

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

### Email Validation

For email validation, you can simply use:

```javascript
regexBuddy.email(input).validate();
```

This runs a regex function to ensure the input is a valid email address. The return value from the above method is:

```javascript
{
  valid: Boolean
  message: `Error message` || null
}
```

#### Email Validation Options

You can also customize validation criteria with `permitted` and `restricted` values.

For instance, if you wanted to only allow email addresses with a `@yourcompanyname` email address, you would do the following:

```javascript
regexBuddy.email(input).validate({ permitted: "yourcompanyname" });
```

You can do the same with email domains you explicitly do not want to permit, like this:

```javascript
regexBuddy.email(input).validate({ restricted: "aol" });
```

The `permitted` and `restricted` values let you pass in either a String or Array. So you can also do this:

```javascript
regexBuddy.email(input).validate({ restricted: ["aol", "hotmail"] });
```

### Password Validation

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
regexBuddy.password(input).validate({ minLength: 8, requireSpecialCharacter: false });
```

**NOTE:** Options that are ignored will still have their default values used. So in the example above, a password must have at least 8 characters and does not need to have a number. But it must also still include an uppercase letter, lowercase letter, and a special character.

**NOTE:** The password validation method returns an object structured like this:

```javascript
{
  valid: Boolean,
  errors: [ validationErrors ] || null
}
```

This gives you the option of serving the client an array of the criteria not met when creating a password, or simply using the password validation method in a conditional expression. And the `valid` property was added for those who prefer using explicit conditional evaluation over implicit "truthy" methods for something like a password.

An example of how to use this in your code would be:

```javascript
const passwordCheck = regexBuddy.password(input).validate({ minlength: 8, requireSpecialCharacter: false });
```

This would let you reference the `passwordCheck` variable in a simple way, like these examples:

```javascript
// If a password is invalid
if (passwordCheck.errors) {
  // You can then map the array of errors in passwordCheck.errors to a DOM object, like a toast, modal, etc.
  ...
}
```

Or implement as a simple, explicit conditional in your corresponding template file, like this example, where a submit button is disabled when there are any errors with the user's input value:

```html
<button type="submit" disabled={!passwordCheck.valid}>Submit</button>
```

You can also ensure strict password matching when requiring someone to re-enter their password with the `matches()` method, like this:

```javascript
regexBuddy.password(password1).matches(password2);
```

This simply returns `true` or `false`.

### Case Conversion

With regexbuddy, you can convert any string into either pascal, camel, kebab, snake, or sql case. You can do this with the following method:

```javascript
regexBuddy.convertCase("your String goes Here")
```

Using the base syntax returns an object that looks like this:

```javascript
{
  original: 'your String goes Here',
  camel: 'yourStringGoesHere',
  kebab: 'your-string-goes-here',
  pascal: 'Your String Goes Here',
  snake: 'your_string_goes_here',
  sql: 'YOUR_STRING_GOES_HERE'
}
```

If you need to use different cases for a value throughout your code, you can utilize case conversion like this:

```javascript
const dName = regexBuddy.convertCase(displayName)
```

And wherever you use the `dName` variable, you can specifiy the case like this:

```html
<h2 className="card-header">{dName.pascal}</h2>
```

The case converter also accepts a designated case as an option. You can do so like this:

```javascript
regexBuddy.convertCase("your String goes Here", { case: 'camel' })
```

The return value of this is simply the string converted into the desired case.

**NOTE:** This is a much more performant way to utilize the case converter, and is recommended, when you can.
