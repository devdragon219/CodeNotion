using Bogus;
using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using RealGimm.Infrastructure;

namespace RealGimm.Infrastructure.Asst.Data.Fakers;

public sealed class CatalogueSubCategoryFaker : BaseSeededFaker<CatalogueSubCategory>
{
  public CatalogueSubCategoryFaker()
  {
    CustomInstantiator(faker =>
    {
      var subCategory = new CatalogueSubCategory();
      subCategory.SetName(GenerateName(faker));
      subCategory.SetInternalCode(GenerateName(faker));

      return subCategory;
    });

    FinishWith((_, subCategory) =>
    {
      var validationErrors = subCategory.Validate().ToList();
      if (validationErrors.Count > 0)
      {
        var errorMessages = string.Join(", ", validationErrors.Select(error => error.ErrorMessage));
        throw new InvalidOperationException($"Invalid {nameof(CatalogueSubCategory)} entity! Errors: {errorMessages}");
      }
    });
  }

  public static string GenerateName(Faker faker) => faker.Lorem.Word();

  public static string GenerateInternalCode(Faker faker) => faker.Random.AlphaNumeric(10);
}
