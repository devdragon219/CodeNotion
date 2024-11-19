using RealGimm.Core.Prop.ContractTypeAggregate;

namespace RealGimm.Web.Prop.Models;

public record ContractTypeInput
{
  public int? Id { get; set; }
  public string? Description { get; set; }
  public string InternalCode { get; set; } = default!;
  public bool IsActive { get; set; }
  public bool IsStampTax { get; set; }
  public bool IsRegistrationTax { get; set; }
  public AssetNature Nature { get; set; }
  public int UsageTypeId { get; set; }
  public bool IsRentChargeApplicable { get; set; }
  public bool IsAbsoluteRevaluation { get; set; }
  public bool IsRevaluationApplicable { get; set; }
  public decimal? RevaluationRatePercent { get; set; }
  public int? RevaluationCalculationMonth { get; set; }
  public int? RevaluationIndexMonth { get; set; }
  public double? RegistrationTaxPercent { get; set; }
  public double? RegistrationTaxTenantPercent { get; set; }
  public RegistrationTaxIncomeTypeRLI? RegistrationTaxIncomeType { get; set; }
}
