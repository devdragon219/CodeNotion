import { FacilityCatalogueTypeFragment } from '../../gql/RealGimm.Web.CatalogueType.fragment';
import { CatalogueTypeRow } from '../../interfaces/FormInputs/CatalogueType';

export const groupCatalogueTypes = (catalogueTypes: FacilityCatalogueTypeFragment[]) =>
  catalogueTypes.reduce<CatalogueTypeRow[]>((acc, it) => {
    const category = acc.find(({ category: { id } }) => id === it.category.id);
    if (!category) {
      return [
        ...acc,
        {
          category: it.category,
          id: `CO_${it.category.id}`,
          name: '',
          subCategory: null,
          subRows: [
            {
              category: it.category,
              id: `SC_${it.subCategory?.id ?? 'unknown'}`,
              name: '',
              subCategory: it.subCategory,
              subRows: [it],
            },
          ],
        },
      ];
    }

    const subcategory = category.subRows?.find(({ subCategory }) => subCategory?.id === it.subCategory?.id) ?? {
      category: it.category,
      id: `SC_${it.subCategory?.id ?? 'unknown'}`,
      name: '',
      subCategory: it.subCategory,
      subRows: [],
    };
    return [
      ...acc.filter(({ id }) => id !== category.id),
      {
        ...category,
        subRows: [
          ...(category.subRows ?? []).filter(({ id }) => id !== subcategory.id),
          {
            ...subcategory,
            subRows: [...(subcategory.subRows ?? []), it],
          },
        ],
      },
    ];
  }, []);
