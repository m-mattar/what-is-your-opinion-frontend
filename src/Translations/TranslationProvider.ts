import { LANGUAGES } from "./TranslationUtils";
const arabicTranslations = require("./translated-messages-ar.json")
const englishTranslations = require("./translated-messages-en.json");

type Translations = {
    [key: string]: string;
};

class TranslationProvider {
    private translations: Translations = {};


    public setTranslations(language: string): void {
        if (language === LANGUAGES.AR) {
            this.translations = {...arabicTranslations};
        } else {
            this.translations = {...englishTranslations};
        }
    }

    public getTranslation(key: string): string {
        return this.translations[key];
    }
};

export const translationProvider = new TranslationProvider();

