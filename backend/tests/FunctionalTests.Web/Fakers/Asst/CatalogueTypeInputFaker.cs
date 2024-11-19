using Bogus;
using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Infrastructure;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using RealGimm.Web.Asst.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Asst;

public sealed class CatalogueTypeInputFaker : BaseSeededFaker<CatalogueTypeInput>
{
  public ICollection<CatalogueCategory> Categories { get; private set; } = Array.Empty<CatalogueCategory>();
  public ICollection<EstateUsageType> UsageTypes { get; private set; } = Array.Empty<EstateUsageType>();
  public CatalogueTypeActivityInputFaker ActivityInputFaker { get; private set; } = new();
  public CatalogueTypeFieldInputFaker FieldInputFaker { get; private set; } = new();

  public CatalogueTypeInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var (category, subCategory) = CatalogueTypeFaker.PickCategory(faker, Categories);

      var input = new CatalogueTypeInput()
      {
        Name = CatalogueTypeFaker.GenerateName(faker),
        InternalCode = CatalogueTypeFaker.GenerateInternalCode(faker),
        Notes = CatalogueTypeFaker.GenerateNotes(faker),
        UsageTypeIds = faker.PickRandom(UsageTypes, 2).Select(ut => ut.Id).ToArray(),
        Activities = ActivityInputFaker.Generate(5).ToArray(),
        CategoryId = category.Id,
        SubCategoryId = subCategory?.Id,
        Fields = Enumerable.Range(1, 3).Select(row => FieldInputFaker.GenerateBetween(1, 4).ToArray()).ToArray()
      };

      return input;
    });
  }

  public CatalogueTypeInputFaker UseCategories(ICollection<CatalogueCategory> categories)
  {
    Categories = categories ?? throw new ArgumentNullException(nameof(categories));

    return this;
  }

  public CatalogueTypeInputFaker UseUsageTypes(ICollection<EstateUsageType> usageTypes)
  {
    UsageTypes = usageTypes ?? throw new ArgumentNullException(nameof(usageTypes));

    return this;
  }

  public CatalogueTypeInputFaker UseCategories(params CatalogueCategory[] categories)
    => UseCategories(categories as ICollection<CatalogueCategory>);

  public CatalogueTypeInputFaker UseActivityInputFaker(CatalogueTypeActivityInputFaker activityInputFaker)
  {
    ActivityInputFaker = activityInputFaker ?? throw new ArgumentNullException(nameof(activityInputFaker));

    return this;
  }

  public CatalogueTypeInputFaker UseFieldInputFaker(CatalogueTypeFieldInputFaker fieldInputFaker)
  {
    FieldInputFaker = fieldInputFaker ?? throw new ArgumentNullException(nameof(fieldInputFaker));

    return this;
  }
}
