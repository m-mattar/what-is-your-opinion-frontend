import { EntityCategory } from "../../Models/EntityCategory/EntityCategory";
import { translationProvider } from "../../Translations/TranslationProvider";
import { TRANSLATION_KEY } from "../../Translations/TranslationUtils";


const BASE_URL = "http://what-is-your-opinion.herokuapp.com";

class EntityService {

  public getEntityCategories() : EntityCategory[] {
    let RESTAURANTS = new EntityCategory (
      "RESTAURANTS",
      translationProvider.getTranslation(TRANSLATION_KEY.entity_category_restaurants),
      "restaurants.png"

    )

    let UNIVERSITIES = new EntityCategory(
      "UNIVERSITIES",
      translationProvider.getTranslation(TRANSLATION_KEY.entity_category_universities),
      "universities.png"
    )

    let GOVERNMENTAL_ORGANIZATIONS = new EntityCategory (
      "GOVERNMENTAL_ORGANIZATIONS",
      translationProvider.getTranslation(TRANSLATION_KEY.entity_category_governmental_organizations),
      "governmental_organizations.png"

    )

    let STORES = new EntityCategory (
      "STORES",
      translationProvider.getTranslation(TRANSLATION_KEY.entity_category_stores),
      "stores.png"

    )
    return [RESTAURANTS, UNIVERSITIES, GOVERNMENTAL_ORGANIZATIONS, STORES]
  }
}

export const entityService = new EntityService();