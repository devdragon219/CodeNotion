using Bogus;
using RealGimm.Core.Asst.CatalogueCategoryAggregate;

namespace RealGimm.Infrastructure.Asst.Data.Fakers;

public sealed class CatalogueCategoryFaker : BaseSeededFaker<CatalogueCategory>
{
  public CatalogueSubCategoryFaker SubCategoryFaker { get; private set; } = new();

  public CatalogueCategoryFaker()
  {
    CustomInstantiator(faker =>
    {
      var category = new CatalogueCategory();
      category.SetName(GenerateName(faker));
      category.SetInternalCode(GenerateName(faker));
      category.SubCategories.AddRange(SubCategoryFaker.GenerateBetween(1, 10));

      return category;
    });

    FinishWith((_, category) =>
    {
      var validationErrors = category.Validate().ToList();
      if (validationErrors.Count > 0)
      {
        var errorMessages = string.Join(", ", validationErrors.Select(error => error.ErrorMessage));
        throw new InvalidOperationException($"Invalid {nameof(CatalogueCategory)} entity! Errors: {errorMessages}");
      }
    });
  }

  public static string GenerateName(Faker faker) => faker.Lorem.Word();

  public static string GenerateInternalCode(Faker faker) => faker.Random.AlphaNumeric(10);

  public CatalogueCategoryFaker UseSubCategoryFaker(CatalogueSubCategoryFaker subCategoryFaker)
  {
    SubCategoryFaker = subCategoryFaker ?? throw new ArgumentNullException(nameof(subCategoryFaker));

    return this;
  }
}
