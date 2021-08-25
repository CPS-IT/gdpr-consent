import de from "./lang.de";
import fr from "./lang.fr";
import en from "./lang.en";
import { getLanguage } from "../utils/lang";

export default {
	getCurrent: () => {
		switch (getLanguage()) {
			case "de":
				return de;
			case "fr":
				return fr;
			default:
				return en;
		}
	}
};
