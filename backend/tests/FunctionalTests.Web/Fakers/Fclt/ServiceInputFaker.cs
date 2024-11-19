using RealGimm.Core.Fclt.ServiceCategoryAggregate;
using RealGimm.Infrastructure;
using RealGimm.Infrastructure.Fclt.Data.Fakers;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Fclt;

public sealed class ServiceInputFaker : BaseSeededFaker<ServiceInput>
{
  private int _generatedInputsCount;
  public ICollection<ServiceCategory> Categories { get; private set; } = Array.Empty<ServiceCategory>();
  public ServiceActivityInputFaker ActivityInputFaker { get; private set; } = new();

  public ServiceInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var (category, subCategory) = ServiceFaker.PickCategory(faker, Categories);

      var service = new ServiceInput
      {
        Name = $"Service {_generatedInputsCount}",
        InternalCode = faker.Random.AlphaNumeric(10),
        CategoryId = category.Id,
        SubCategoryId = subCategory.Id,
        Activities = ActivityInputFaker.Generate(5).ToArray(),
      };

      return service;
    });

    FinishWith((_, service) =>
    {
      EnsureValid(service);
      _generatedInputsCount++;
    });
  }

  public ServiceInputFaker UseCategories(params ServiceCategory[] categories)
  {
    Categories = categories ?? throw new ArgumentNullException(nameof(categories));
    return this;
  }

  public ServiceInputFaker UseActivityInputFaker(ServiceActivityInputFaker activityInputFaker)
  {
    ActivityInputFaker = activityInputFaker ?? throw new ArgumentNullException(nameof(activityInputFaker));
    return this;
  }
}
