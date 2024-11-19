using HotChocolate;

namespace RealGimm.Core.Docs.DocumentAggregate.Models;

public record CatalogueDocumentsFlatOutput
{
  [GraphQLIgnore]
  public int? CatalogueItemId { get; init; }

  [GraphQLIgnore]
  public int EstateId { get; init; }

  [GraphQLIgnore]
  public int CatalogueTypeId { get; init; }
  
  [GraphQLIgnore]
  public int CategoryId { get; init; }

  [GraphQLIgnore]
  public int? SubCategoryId { get; init; }

  public string? CatalogueItemInternalCode { get; init; } = default!;
  public string EstateInternalCode { get; init; } = default!;
  public string CatalogueTypeName { get; init; } = default!;
  public string CategoryName { get; init; } = default!;
  public string? SubCategoryName { get; init; }
  public string ContentCategoryGroup { get; init; } = default!;  
  public Document Document { get; init; } = default!;
}
