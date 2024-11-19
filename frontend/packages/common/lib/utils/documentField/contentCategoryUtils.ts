import { ContentCategoryDomain, ContentCategoryGroup } from '../../enums/ContentCategory';
import { ContentCategory } from '../../gql/types';

export const getContentCategoryGroup = (contentCategory: ContentCategory): ContentCategoryGroup => {
  const contentCategoryGroups = Object.values(ContentCategoryGroup);

  return contentCategoryGroups.find((group) => contentCategory.startsWith(group)) ?? ContentCategoryGroup.Generic;
};

export const getContentCategoryGroupOptions = (
  contentCategoryDomain: ContentCategoryDomain,
): ContentCategoryGroup[] => {
  const categoryGroups = Object.values(ContentCategoryGroup).filter((categoryGroup) =>
    categoryGroup.startsWith(contentCategoryDomain),
  );

  if (categoryGroups.length > 0) return categoryGroups;

  return [ContentCategoryGroup.Generic];
};

export const getContentCategoryOptions = (
  contentCategoryGroup: ContentCategoryGroup,
  exclude: ContentCategory[] = [],
): ContentCategory[] => {
  const categories = Object.values(ContentCategory).filter(
    (category) => category.startsWith(contentCategoryGroup) && !exclude.includes(category),
  );

  if (categories.length > 0) return categories;

  return [ContentCategory.Generic];
};
