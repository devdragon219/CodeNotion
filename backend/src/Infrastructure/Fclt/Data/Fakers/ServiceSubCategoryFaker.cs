using RealGimm.Core.Fclt.ServiceCategoryAggregate;

namespace RealGimm.Infrastructure.Fclt.Data.Fakers;

public sealed class ServiceSubCategoryFaker : BaseSeededFaker<ServiceSubCategory>
{
  public ServiceSubCategoryFaker()
  {
    CustomInstantiator(faker =>
    {
      var subCategory = new ServiceSubCategory();
      subCategory.SetName(faker.Lorem.Word());
      subCategory.SetInternalCode(faker.Random.AlphaNumeric(10));

      return subCategory;
    });

    FinishWith((_, service) =>
    {
      var validationErrors = service.Validate().ToList();
      if (validationErrors.Count > 0)
      {
        var errorMessages = string.Join(", ", validationErrors.Select(error => error.ErrorMessage));
        throw new InvalidOperationException($"Invalid {nameof(ServiceSubCategory)} entity! Errors: {errorMessages}");
      }
    });
  }
}
