/* globals gtag: true */
import { addScript } from "../utils/dom";

export default (GDPRConsentUser) => ({
	key: 'matomo',
	type: 'analytic',
	name: 'Matomo (privacy by design)',
	uri: 'https://matomo.org/faq/general/faq_146/',
	needConsent: true,
	cookies: ['_pk_ref', '_pk_cvar', '_pk_id', '_pk_ses', '_pk_hsr', 'piwik_ignore', '_pk_uid'],
	js: function () {
		'use strict';
		if (GDPRConsentUser.matomoId === undefined) {
			return;
		}

		window._paq = window._paq || [];
		window._paq.push(['setSiteId', GDPRConsentUser.matomoId]);
		window._paq.push(['setTrackerUrl', GDPRConsentUser.matomoHost + 'piwik.php']);
		window._paq.push(['setDoNotTrack', 1]);
		window._paq.push(['trackPageView']);
		window._paq.push(['setIgnoreClasses', ['no-tracking', 'colorbox']]);
		window._paq.push(['enableLinkTracking']);
		window._paq.push([function () {
			var self = this;

			function getOriginalVisitorCookieTimeout() {
				var now = new Date(),
					nowTs = Math.round(now.getTime() / 1000),
					visitorInfo = self.getVisitorInfo();
				var createTs = parseInt(visitorInfo[2]);
				var cookieTimeout = 33696000; // 13 mois en secondes
				var originalTimeout = createTs + cookieTimeout - nowTs;
				return originalTimeout;
			}

			this.setVisitorCookieTimeout(getOriginalVisitorCookieTimeout());
		}]);

		addScript(GDPRConsentUser.matomoHost + 'piwik.js', '', '', true, 'defer', true);

		// waiting for piwik to be ready to check first party cookies
		var interval = setInterval(function () {
			if (typeof Piwik === 'undefined') return;

			clearInterval(interval);

			// make piwik/matomo cookie accessible by getting tracker
			Piwik.getTracker();

			// looping throught cookies
			var theCookies = document.cookie.split(';');
			for (var i = 1; i <= theCookies.length; i++) {
				var cookie = theCookies[i - 1].split('=');
				var cookieName = cookie[0].trim();

				// if cookie starts like a piwik one, register it
				if (cookieName.indexOf('_pk_') === 0) {
					this.cookies.push(cookieName);
				}
			}
		}, 100);
	}
});
