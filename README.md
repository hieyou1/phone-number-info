# phone-number-info
Get information on a phone number from [RevealName.com](https://revealname.com)

Just pass in a phone number, sit back & relax!

## Install
`npm i phone-number-info`

## Under the hood
We use [libphonenumber-js](https://gitlab.com/catamphetamine/libphonenumber-js#readme) to parse phone numbers. Please make sure any phone numbers you pass are compatible with their API, otherwise you might get an error.



## Usage
```js
const phoneNumberInfo = require("phone-number-info");
const phoneNumber = ""; // add your own!

(async () => {
    let number = await phoneNumberInfo(phoneNumber, "US" /* default country for libphonenumber-js */);

    console.log(number.ownerName);
    // your name

    console.log(number.carrier);
    // your phone's carrier

    // number is also a PhoneNumber from libphonenumber-js, so you can also use their API to convert it further
})();
```

## Morals & Disclaimer
**Please only use this on consenting users.** We aren't responsible for anything you do with this library. Again, **please be extremely careful to only use this on consenting users.** Thanks!