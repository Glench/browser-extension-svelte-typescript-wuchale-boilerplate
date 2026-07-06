import {locales} from './locales/data.js';

export function get_locale() {
    const browser_locale = chrome.i18n.getUILanguage();
    // first try the browser UI's locale
    if (locales.includes(browser_locale)) {
        return browser_locale;
    }
    // if that's not supported, try removing any regional suffixes like 'US' in 'en-US'
    // and see if that's supported
    let locale = browser_locale.split('-')[0];
    if (locales.includes(locale)) {
        return locale;
    }

    // otherwise choose the first language in the supported languages list
    return locales[0];
}
