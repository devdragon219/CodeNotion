using Bogus;
using RealGimm.Core.Fclt.ServiceAggregate;

namespace RealGimm.Infrastructure.Fclt.Data.Fakers;

public sealed class ServiceActivityFaker : BaseSeededFaker<ServiceActivity>
{
  public ServiceActivityFaker()
  {
    CustomInstantiator(faker =>
    {
      var activity = new ServiceActivity();
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
        throw new InvalidOperationException($"Invalid {nameof(ServiceActivity)} entity! Errors: {errorMessages}");
      }
    });
  }

  public static string GenerateName(Faker faker) => faker.Lorem.Word();

  public static ServiceActivityType PickActivityType(Faker faker) => faker.PickRandom<ServiceActivityType>();
  
  public static bool GenerateIsMandatoryByLaw(Faker faker) => faker.Random.Bool();
}
