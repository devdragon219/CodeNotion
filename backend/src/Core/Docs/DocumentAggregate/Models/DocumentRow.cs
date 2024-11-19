namespace RealGimm.Core.Docs.DocumentAggregate.Models;

public record DocumentRow
{
  public required Document Document { get; init; }
  
  public int? EstateId { get; init; }
  public string? EstateInternalCode { get; init; }
  
  public string? EstateUnitInternalCode { get; init; }
  
  public string? CatalogueItemInternalCode { get; init; }
  public int? CatalogueTypeId { get; init; }
  public string? CatalogueTypeInternalCode { get; init; }
  public string? CatalogueCategory { get; init; }
  public string? CatalogueSubCategory { get; init; }
  
  public string? SubjectInternalCode { get; init; }
  
  public string? ContractInternalCode { get; init; }
  public bool? IsContractActive { get; init; }
  public bool? IsContractSublocated { get; init; }
  
  public int? TicketId { get; init; }
  public string? TicketInternalCode { get; init; }
  public bool? IsTicketExcludedFromMaintenanceContract { get; init; }
  
  public int? FcltContractId { get; init; }
  public string? FcltContractInternalCode { get; init; }
}
