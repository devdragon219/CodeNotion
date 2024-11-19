using Bogus;
using RealGimm.Core.Fclt.ServiceAggregate;
using RealGimm.Core.Fclt.ServiceCategoryAggregate;

namespace RealGimm.Infrastructure.Fclt.Data.Fakers;

public sealed class ServiceFaker : BaseSeededFaker<Service>
{
  public IEnumerable<ServiceCategory> Categories { get; private set; } = Array.Empty<ServiceCategory>();

  public ServiceFaker()
  {
    CustomInstantiator(faker =>
    {
      var service = new Service();
      service.SetName(faker.Lorem.Word());
      service.SetInternalCode(faker.Random.AlphaNumeric(10));

      var (category, subCategory) = PickCategory(faker, Categories);
      service.SetCategory(category, subCategory);
      
      return service;
    });

    FinishWith((_, service) =>
    {
      var validationErrors = service.Validate().ToList();
      if (validationErrors.Count > 0)
      {
        var errorMessages = string.Join(", ", validationErrors.Select(error => error.ErrorMessage));
        throw new InvalidOperationException($"Invalid {nameof(Service)} entity! Errors: {errorMessages}");
      }
    });
  }

  public static (ServiceCategory Category, ServiceSubCategory SubCategory) PickCategory(
    Faker faker,
    IEnumerable<ServiceCategory> categories)
  {
    var category = faker.PickRandom(categories);
    var subCategory = faker.PickRandom<ServiceSubCategory>(category.SubCategories).OrNull(faker, nullWeight: 0.2f);
    return (category, subCategory);
  }

  public ServiceFaker UseCategories(IEnumerable<ServiceCategory> categories)
  {
    Categories = categories ?? throw new ArgumentNullException(nameof(categories));

    return this;
  }
}
