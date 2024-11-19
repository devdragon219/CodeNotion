namespace RealGimm.Core.Asst.CatalogueItemAggregate;

public record CatalogueOutput(
  int EstateId, 
  string? EstateInternalCode, 
  int CatalogueTypeId, 
  string? CatalogueCategory,
  string? CatalogueSubCategory,
  string? CatalogueType,
  int CatalogueTypeCount
);

