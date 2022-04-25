import { EntityCategory } from "../../Models/EntityCategory/EntityCategory";
import { translationProvider } from "../../Translations/TranslationProvider";
import { TRANSLATION_KEY } from "../../Translations/TranslationUtils";

import restaurantsImage from "../../Models/EntityCategory/EntityCategoryImages/restaurants.png"
import universitiesImage from "../../Models/EntityCategory/EntityCategoryImages/universities.png"
import governmentalOrganizationsImage from "../../Models/EntityCategory/EntityCategoryImages/governmental_organizations.png"
import storesImage from "../../Models/EntityCategory/EntityCategoryImages/stores.png"

class EntityService {

  public getEntityCategories() : EntityCategory[] {
    let RESTAURANTS = new EntityCategory (
      "RESTAURANTS",
      translationProvider.getTranslation(TRANSLATION_KEY.entity_category_restaurants),
      restaurantsImage
    )

    let UNIVERSITIES = new EntityCategory(
      "UNIVERSITIES",
      translationProvider.getTranslation(TRANSLATION_KEY.entity_category_universities),
      universitiesImage
    )

    let GOVERNMENTAL_ORGANIZATIONS = new EntityCategory (
      "GOVERNMENTAL_ORGANIZATIONS",
      translationProvider.getTranslation(TRANSLATION_KEY.entity_category_governmental_organizations),
      governmentalOrganizationsImage
    )

    let STORES = new EntityCategory (
      "STORES",
      translationProvider.getTranslation(TRANSLATION_KEY.entity_category_stores),
      storesImage
    )
    return [RESTAURANTS, UNIVERSITIES, GOVERNMENTAL_ORGANIZATIONS, STORES]
  }
}

export const entityService = new EntityService();