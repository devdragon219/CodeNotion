using Bogus;
using RealGimm.Core.Fclt.ServiceCategoryAggregate;

namespace RealGimm.Infrastructure.Fclt.Data.Fakers;

public sealed class ServiceCategoryFaker : BaseSeededFaker<ServiceCategory>
{
  public ServiceSubCategoryFaker SubCategoryFaker { get; private set; } = new();

  public ServiceCategoryFaker()
  {
    CustomInstantiator(faker =>
    {
      var subCategory = new ServiceCategory();
      subCategory.SetName(faker.Lorem.Word());
      subCategory.SetInternalCode(faker.Random.AlphaNumeric(10));
      subCategory.SubCategories.AddRange(SubCategoryFaker.GenerateBetween(1, 10));

      return subCategory;
    });

    FinishWith((_, service) =>
    {
      var validationErrors = service.Validate().ToList();
      if (validationErrors.Count > 0)
      {
        var errorMessages = string.Join(", ", validationErrors.Select(error => error.ErrorMessage));
        throw new InvalidOperationException($"Invalid {nameof(ServiceCategory)} entity! Errors: {errorMessages}");
      }
    });
  }
}
