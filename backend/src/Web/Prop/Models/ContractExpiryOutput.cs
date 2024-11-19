namespace RealGimm.Web.Prop.Models;

public record ContractExpiryOutput(
  int ContractId,
  string InternalCode,
  string? TypeDescription,
  int DaysToExpiration,
  string? ManagementSubjectName,
  decimal? BillingBaseFee);
