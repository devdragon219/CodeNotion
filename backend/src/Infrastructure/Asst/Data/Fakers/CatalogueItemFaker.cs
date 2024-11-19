using Bogus;
using RealGimm.Core.Asst.CatalogueItemAggregate;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Asst.EstateAggregate;

namespace RealGimm.Infrastructure.Asst.Data.Fakers;

public sealed class CatalogueItemFaker : BaseSeededFaker<CatalogueItem>
{
  public ICollection<Estate> Estates { get; private set; } = Array.Empty<Estate>();
  public ICollection<CatalogueType> Types { get; private set; } = Array.Empty<CatalogueType>();
  public CatalogueItemFieldFaker FieldFaker { get; private set; } = new();

  public CatalogueItemFaker()
  {
    CustomInstantiator(faker =>
    {
      var item = new CatalogueItem();
      item.SetEstate(PickEstate(faker, Estates));
      item.SetInternalCode(GenerateInternalCode(faker));
      item.SetActivationDate(GenerateActivationDate(faker));
      item.SetLastMaintenanceDate(GenerateLastMaintenanceDate(faker));
      item.SetType(PickType(faker, Types));

      var fields = new List<CatalogueItemField>();
      foreach (var row in item.CatalogueType!.Fields!)
      {
        foreach (var typeField in row)
        {
          var field = FieldFaker.UseTemplateTypeField(typeField).Generate();
          fields.Add(field);
        }
      }

      item.SetFields(fields.ToArray());

      var (status, decommissioningDate) = GenerateStatus(faker);
      item.SetStatus(status);
      item.SetDecommissioningDate(decommissioningDate);

      return item;
    });

    FinishWith((_, item) =>
    {
      var validationErrors = item.Validate().ToList();
      if (validationErrors.Count > 0)
      {
        var errorMessages = string.Join(", ", validationErrors.Select(error => error.ErrorMessage));
        throw new InvalidOperationException($"Invalid {nameof(CatalogueTypeActivity)} entity! Errors: {errorMessages}");
      }
    });
  }

  public static string GenerateInternalCode(Faker faker) => faker.Random.AlphaNumeric(10);
  
  public static Estate PickEstate(Faker faker, ICollection<Estate> estates) =>
    faker.PickRandom(estates);

  public static CatalogueType PickType(Faker faker, ICollection<CatalogueType> types) =>
    faker.PickRandom(types);

  public static DateOnly GenerateActivationDate(Faker faker)
    => faker.Date.PastDateOnly(refDate: new DateOnly(2023, 05, 01));

  public static DateOnly GenerateLastMaintenanceDate(Faker faker)
    => faker.Date.BetweenDateOnly(new DateOnly(2023, 05, 01), new DateOnly(2023, 08, 01));

  public static (EstateStatus Status, DateOnly? DecommissioningDate) GenerateStatus(Faker faker)
  {
    if (faker.Random.Bool(weight: 0.9f))
    {
      return (EstateStatus.Operational, null);
    }

    var decommissioningDate = faker.Date.BetweenDateOnly(new DateOnly(2023, 08, 01), new DateOnly(2023, 10, 01));

    return (EstateStatus.Decommissioned, decommissioningDate);
  }

  public CatalogueItemFaker UseEstates(ICollection<Estate> estates)
  {
    Estates = estates ?? throw new ArgumentNullException(nameof(estates));

    return this;
  }

  public CatalogueItemFaker UseEstates(params Estate[] estates) => UseEstates(estates as ICollection<Estate>);

  public CatalogueItemFaker UseTypes(ICollection<CatalogueType> types)
  {
    Types = types ?? throw new ArgumentNullException(nameof(types));

    return this;
  }

  public CatalogueItemFaker UseTypes(params CatalogueType[] types) => UseTypes(types as ICollection<CatalogueType>);

  public CatalogueItemFaker UseFieldFaker(CatalogueItemFieldFaker fieldFaker)
  {
    FieldFaker = fieldFaker ?? throw new ArgumentNullException(nameof(fieldFaker));

    return this;
  }
}
