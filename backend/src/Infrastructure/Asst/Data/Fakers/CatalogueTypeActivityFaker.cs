using Bogus;
using RealGimm.Core.Asst.CatalogueTypeAggregate;

namespace RealGimm.Infrastructure.Asst.Data.Fakers;

public sealed class CatalogueTypeActivityFaker : BaseSeededFaker<CatalogueTypeActivity>
{
  public CatalogueTypeActivityFaker()
  {
    CustomInstantiator(faker =>
    {
      var activity = new CatalogueTypeActivity();
      activity.SetName(GenerateName(faker));
      activity.SetActivityType(PickActivityType(faker));
      activity.SetIsMandatoryByLaw(GenerateIsMandatoryByLaw(faker));

      return activity;
    });

    FinishWith((_, activity) =>
    {
      var validationErrors = activity.Validate().ToList();
      if (validationErrors.Count > 0)
      {
        var errorMessages = string.Join(", ", validationErrors.Select(error => error.ErrorMessage));
        throw new InvalidOperationException($"Invalid {nameof(CatalogueTypeActivity)} entity! Errors: {errorMessages}");
      }
    });
  }

  public static string GenerateName(Faker faker) => faker.Lorem.Word();

  public static CatalogueTypeActivityType PickActivityType(Faker faker) => faker.PickRandom<CatalogueTypeActivityType>();
  
  public static bool GenerateIsMandatoryByLaw(Faker faker) => faker.Random.Bool();
}
