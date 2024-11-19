using HotChocolate.Resolvers;
using RealGimm.Core;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Core.Docs.DocumentAggregate.Models;
using RealGimm.Core.Docs.Interfaces;
using RealGimm.Core.IAM;
using RealGimm.Web.Docs.Extensions;

namespace RealGimm.Web.Docs.Queries;

public class CatalogueItemDocumentQueries
{
  [BackOfficePermission(Features.DOCUMENTS_BASE, Permission.Read)]
  [UseFiltering<CatalogueDocumentsFlatOutput>]
  [UseSorting]
  public Task<IEnumerable<CatalogueDocumentsCategoryOutput>> ListDocuments(
    int[] catalogueItemIds,
    [SchemaService] IResolverContext resolverContext,
    [Service] IRepository<Document> documentRepository,
    [Service] IDocumentService documentService,
    CancellationToken cancellationToken)
    => documentService.GetCatalogueDocumentsGroupedByCategoryAsync(
        query => query
          .Where(flat => flat.CatalogueItemId.HasValue && catalogueItemIds.Contains(flat.CatalogueItemId.Value))
          .FilterPatched(resolverContext, documentRepository),
        query => query.Sort(resolverContext),
        cancellationToken);
}
