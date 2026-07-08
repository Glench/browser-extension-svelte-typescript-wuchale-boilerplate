import {locales} from './locales/data.js';

export async function get_locale() {
    const browser_locale = chrome.i18n.getUILanguage();
    // first try the browser UI's locale
    if (locales.includes(browser_locale)) {
        return browser_locale;
    }

    // if that's not supported, try removing any regional suffixes like 'US' in 'en-US'
    // and see if that's supported
    const locale = browser_locale.split('-')[0];
    if (locales.includes(locale)) {
        return locale;
    }

    // if that's not supported, try user's other acceptable languages
    const accepted_languages = await chrome.i18n.getAcceptLanguages()
    for (let i=0; i < accepted_languages.length; ++i) {
        const lang = accepted_languages[i];
        if (locales.includes(lang)) {
            return lang;
        } else if (locales.includes(lang.split('-')[0])) {
            return lang.split('-')[0];
        }
    }

    // otherwise choose the first language the extension supports
    return locales[0];
}
