using Bogus;
using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;

namespace RealGimm.Infrastructure.Asst.Data.Fakers;

public sealed class CatalogueTypeFaker : BaseSeededFaker<CatalogueType>
{
  public IEnumerable<CatalogueCategory> Categories { get; private set; } = Array.Empty<CatalogueCategory>();
  public IEnumerable<EstateUsageType> EstateUsageTypes { get; private set; } = Array.Empty<EstateUsageType>();
  public CatalogueTypeActivityFaker ActivityFaker { get; private set; } = new();
  public CatalogueTypeFieldFaker FieldFaker { get; private set; } = new();

  public CatalogueTypeFaker()
  {
    CustomInstantiator(faker =>
    {
      var type = new CatalogueType();
      type.SetName(GenerateName(faker));
      type.SetInternalCode(GenerateInternalCode(faker));
      type.SetNotes(GenerateNotes(faker));
      type.SetUsageTypes(faker.PickRandom(EstateUsageTypes, 1));
      type.Activities.AddRange(ActivityFaker.Generate(5));

      var (category, subCategory) = PickCategory(faker, Categories);
      type.SetCategory(category, subCategory);      

      var fields = Enumerable.Range(1, 3).Select(row => FieldFaker.GenerateBetween(1, 4).ToArray()).ToArray();
      type.SetFields(fields);

      return type;
    });

    FinishWith((_, type) =>
    {
      var validationErrors = type.Validate().ToList();
      if (validationErrors.Count > 0)
      {
        var errorMessages = string.Join(", ", validationErrors.Select(error => error.ErrorMessage));
        throw new InvalidOperationException($"Invalid {nameof(CatalogueType)} entity! Errors: {errorMessages}");
      }
    });
  }

  public static string GenerateName(Faker faker) => faker.Lorem.Word();

  public static string GenerateInternalCode(Faker faker) => faker.Random.AlphaNumeric(10);
  
  public static string GenerateNotes(Faker faker) => faker.Lorem.Sentence(10, faker.Random.Int(0, 2));

  public static (CatalogueCategory Category, CatalogueSubCategory? SubCategory) PickCategory(
    Faker faker,
    IEnumerable<CatalogueCategory> categories)
  {
    var category = faker.PickRandom(categories);

    if (!category.SubCategories.Any())
    {
      return (category, null);
    }
    
    var subCategory = faker.PickRandom<CatalogueSubCategory>(category.SubCategories).OrNull(faker, nullWeight: 0.2f);
    return (category, subCategory);
  }

  public CatalogueTypeFaker UseCategories(IEnumerable<CatalogueCategory> categories)
  {
    Categories = categories ?? throw new ArgumentNullException(nameof(categories));

    return this;
  }

  public CatalogueTypeFaker UseEstateUsageTypes(IEnumerable<EstateUsageType> usageTypes)
  {
    EstateUsageTypes = usageTypes ?? throw new ArgumentNullException(nameof(usageTypes));

    return this;
  }

  public CatalogueTypeFaker UseCategories(params CatalogueCategory[] categories)
    => UseCategories(categories as ICollection<CatalogueCategory>);

  public CatalogueTypeFaker UseActivityFaker(CatalogueTypeActivityFaker activityFaker)
  {
    ActivityFaker = activityFaker ?? throw new ArgumentNullException(nameof(activityFaker));

    return this;
  }
  
  public CatalogueTypeFaker UseFieldFaker(CatalogueTypeFieldFaker fieldFaker)
  {
    FieldFaker = fieldFaker ?? throw new ArgumentNullException(nameof(fieldFaker));

    return this;
  }
}
