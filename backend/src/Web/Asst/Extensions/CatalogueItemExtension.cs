using HotChocolate.Resolvers;
using RealGimm.Core;
using RealGimm.Core.Asst.CatalogueItemAggregate;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Core.Docs.DocumentAggregate.Models;
using RealGimm.Core.Docs.DocumentAggregate.Specifications;
using RealGimm.Core.Docs.Interfaces;
using RealGimm.Web.Docs.Queries.Filters;

namespace RealGimm.Web.Asst.Extensions;

[ExtendObjectType(typeof(CatalogueItem))]
public sealed class CatalogueItemExtension
{
  [UseFiltering<DocumentFilterType>]
  [UseSorting]
  public IEnumerable<DocumentsPerContentCategoryGroupOutput> GetDocuments(
    [Parent] CatalogueItem catalogueItem,
    [SchemaService] IResolverContext resolverContext,
    [Service] IDocumentService documentService,
    [Service] ILogger<CatalogueItemExtension> logger,
    [Service] IReadRepository<Document> repository)
  {
    try
    {
      var documents = repository
        .AsQueryable(new DocumentsByEntityIdSpec<CatalogueItem>(catalogueItem.Id))
        .Filter(resolverContext)
        .ToArray();

      return documentService
        .GroupDocumentsByContentCategoryGroup(documents)
        .Sort(resolverContext);
    }
    catch (Exception e)
    {
      logger.LogError(e, "Unable to fetch documents for catalogue item");
      return Enumerable.Empty<DocumentsPerContentCategoryGroupOutput>();
    }
  }
}
