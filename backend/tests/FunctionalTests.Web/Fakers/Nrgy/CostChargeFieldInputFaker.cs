using RealGimm.Core.CrossModule;
using RealGimm.Core.Nrgy.UtilityTypeAggregate;
using RealGimm.Infrastructure;
using RealGimm.Infrastructure.Nrgy.Data.Fakers;
using RealGimm.Web.Nrgy.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Nrgy;

public sealed class CostChargeFieldInputFaker : BaseSeededFaker<CostChargeFieldInput>
{
  public required UtilityChargeField UtilityChargeField { get; init; }

  public CostChargeFieldInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var input = new CostChargeFieldInput
      {
        TemplateTypeId = CostChargeFieldFaker.GenerateTemplateTypeId(UtilityChargeField!),
        Type = CostChargeFieldFaker.GenerateType(UtilityChargeField!),
        Name = CostChargeFieldFaker.GenerateName(UtilityChargeField!),
        IsMandatory = CostChargeFieldFaker.GenerateIsMandatory(UtilityChargeField!),
        Value = CostChargeFieldFaker.GenerateValue(faker, UtilityChargeField!)
      };

      return input;
    });
  }
}
