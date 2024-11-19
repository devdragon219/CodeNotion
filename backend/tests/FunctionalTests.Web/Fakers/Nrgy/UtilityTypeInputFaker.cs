using Bogus;
using RealGimm.Infrastructure;
using RealGimm.Infrastructure.Nrgy.Data.Fakers;
using RealGimm.Web.Nrgy.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Nrgy;

public sealed class UtilityTypeInputFaker : BaseSeededFaker<UtilityTypeInput>
{
  public Faker<UtilityChargeFieldInput> ChargeFieldInputFaker { get; init; } = new UtilityChargeFieldInputFaker();

  public UtilityTypeInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var input = new UtilityTypeInput()
      {
        Category = UtilityTypeFaker.PickRandomUtilityCategory(faker),
        Description = UtilityTypeFaker.GenerateDescription(faker),
        InternalCode = UtilityTypeFaker.GenerateCode(faker),
        ExternalCode = UtilityTypeFaker.GenerateExternalCode(faker),
        ExpenseClass = UtilityTypeFaker.GenerateExpenseClass(faker),
        MeasurementUnit = UtilityTypeFaker.GenerateUnit(faker),
        MeasurementUnitDescription = UtilityTypeFaker.GenerateUnitDescription(faker),
        TimeOfUseRateCount = UtilityTypeFaker.GenerateTimeOfUseRateCount(faker),
        MeteringType = UtilityTypeFaker.PickRandomMeteringType(faker),
        HasHeatingAccountingSystem = UtilityTypeFaker.GenerateHasHeatingAccountingSystem(faker),
        ChargeFields = Enumerable.Range(1, 3).Select(row => ChargeFieldInputFaker.GenerateBetween(1, 4).ToArray()).ToArray()
      };

      return input;
    });
  }
}
