const { parseDocument, DomUtils: DOM } = require("htmlparser2");
const fetch = require("node-fetch");
const { parsePhoneNumber, PhoneNumber } = require("libphonenumber-js");
/**
 * @function addDashes Add dashes to phone number. adapted from https://stackoverflow.com/a/13093249
 * @param {String} num Phone number as string
 * @returns {String} Phone number with dashes
 */
const addDashes = (num) => {
    num = num.replace(/[^0-9]/g, "");
    num = num.slice(0, 3) + "-" + num.slice(3, 6) + "-" + num.slice(6);
    return num;
};
/**
 * @async
 * @function getPhoneInfo Get information about a phone number using RevealName.
 * @param {PhoneNumber | String} number Phone number to search. Either an instance of PhoneNumber from libphonenumber-js, or a string with any format recognized by libphonenumber-js [requires country].
 * @param {String} [country=US] Default country [if not provided in number] to be passed to libphonenumber-js. Defaults to US.
 * @returns {Promise<PhoneNumber>} PhoneNumber class from libphonenumber-js, with ownerName and carrier populated [if provided by RevealName].
 */
module.exports = async (number, country = "US") => {
    if (typeof number == "string") number = parsePhoneNumber(number, country);
    let res = parseDocument(await (await fetch(`https://revealname.com/${addDashes(number.nationalNumber)}`)).text());
    // let object = {...number}
    let labels = DOM.find((elem) => {
        if (elem.tagName == "label") {
            return true;
        } else {
            return false;
        }
    }, res.children, true);
    for (let i of labels) {
        if (DOM.innerText(i).toLowerCase().trim().replace(/[^a-z]/gi, "") == "ownername") {
            number.ownerName = DOM.innerText(i.next.next).trim();
        } else if (DOM.innerText(i).toLowerCase().trim().replace(/[^a-z]/gi, "") == "carrier") {
            number.carrier = DOM.innerText(i.next).trim();
        }
    }
    return number;
};