const availableLanguages = "de,en,fr",
	defaultLanguage = "en";

export function getLanguage(languageDetectionMode) {
	"use strict";

	let lang;

	if ('document' === languageDetectionMode) {
		lang = document.documentElement.lang;
	} else if (!navigator) {
		return "en";
	} else {
		lang = navigator.language || navigator.browserLanguage || navigator.systemLanguage || navigator.userLang || null;
	}

	let userLanguage = lang ? lang.substr(0, 2) : null;

	if (availableLanguages.indexOf(userLanguage) === -1) {
		return defaultLanguage;
	}
	return userLanguage;
}

export function getLocale() {
	"use strict";
	if (!navigator) { return "en_US"; }

	let lang = navigator.language || navigator.browserLanguage ||
		navigator.systemLanguage || navigator.userLang || null,
		userLanguage = lang ? lang.substr(0, 2) : null;

	switch (userLanguage) {
		case "de":
			return "de_DE";
		case "fr":
			return "fr_FR";
		default:
			return "en_US";
	}
}
