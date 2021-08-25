import facebook from "./facebook";
import facebookpixel from "./facebookpixel";
import googletagmanager from "./googletagmanager";
import gtag from "./gtag";
import matomo from "./matomo";
import twitter from "./twitter";
import vimeo from "./vimeo";
import youtube from "./youtube";

export default {
	getServices: (GDPRConsentUser) => {
		return {
			facebook: facebook(GDPRConsentUser),
			facebookpixel: facebookpixel(GDPRConsentUser),
			googletagmanager: googletagmanager(GDPRConsentUser),
			gtag: gtag(GDPRConsentUser),
			matomo: matomo(GDPRConsentUser),
			twitter: twitter(GDPRConsentUser),
			vimeo: vimeo(GDPRConsentUser),
			youtube: youtube(GDPRConsentUser),
		};
	}
};