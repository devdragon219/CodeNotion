namespace RealGimm.Core.Reports;
public record IMURateByCityRow(
  string? ManagementSubjectName,
  int Year, 
  string CityName, 
  decimal TaxRate, 
  string TaxRateDescription);