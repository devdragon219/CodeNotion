import { CatalogueItemFieldValue } from '../../interfaces/FieldValues/CatalogueItem';
import { CatalogueItemRow } from '../../interfaces/FormInputs/CatalogueItem';

export const groupCatalogueItems = (catalogueItems: CatalogueItemFieldValue[]) =>
  catalogueItems.reduce<CatalogueItemRow[]>((acc, it) => {
    const category = acc.find(
      ({
        catalogueType: {
          category: { id },
        },
      }) => id === it.catalogueType.category.id,
    );
    if (!category) {
      return [
        ...acc,
        {
          catalogueType: it.catalogueType,
          id: `CO_${it.catalogueType.category.id}`,
          internalCode: '',
          subRows: [
            {
              catalogueType: it.catalogueType,
              id: `SC_${it.catalogueType.subCategory?.id ?? 'unknown'}`,
              internalCode: '',
              subRows: [
                {
                  catalogueType: it.catalogueType,
                  id: `TO_${it.catalogueType.id}`,
                  internalCode: '',
                  subRows: [it],
                },
              ],
            },
          ],
        },
      ];
    }

    const subcategory = category.subRows?.find(
      ({ catalogueType: { subCategory } }) => subCategory?.id === it.catalogueType.subCategory?.id,
    );
    if (!subcategory) {
      return [
        ...acc.filter(({ id }) => id !== category.id),
        {
          ...category,
          subRows: [
            ...(category.subRows ?? []),
            {
              catalogueType: it.catalogueType,
              id: `SC_${it.catalogueType.subCategory?.id ?? 'unknown'}`,
              internalCode: '',
              subRows: [
                {
                  catalogueType: it.catalogueType,
                  id: `TO_${it.catalogueType.id}`,
                  internalCode: '',
                  subRows: [it],
                },
              ],
            },
          ],
        },
      ];
    }

    const type = subcategory.subRows?.find(({ catalogueType }) => catalogueType.id === it.catalogueType.id) ?? {
      catalogueType: it.catalogueType,
      id: `TO_${it.catalogueType.id}`,
      internalCode: '',
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
            subRows: [
              ...(subcategory.subRows ?? []).filter(({ id }) => id !== type.id),
              {
                ...type,
                subRows: [...(type.subRows ?? []), it],
              },
            ],
          },
        ],
      },
    ];
  }, []);
