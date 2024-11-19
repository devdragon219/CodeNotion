using HotChocolate.Resolvers;
using RealGimm.Core;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Core.Docs.DocumentAggregate.Models;
using RealGimm.Core.Docs.Interfaces;
using RealGimm.Core.IAM;
using RealGimm.Web.Docs.Extensions;

namespace RealGimm.Web.Docs.Queries;

public class EstateUnitDocumentQueries
{
  [BackOfficePermission(Features.DOCUMENTS_BASE, Permission.Read)]
  [UseFiltering<EstateUnitDocumentsFlatOutput>]
  [UseSorting]
  public Task<IEnumerable<EstateUnitDocumentsOutput>> ListDocuments(
    int[] estateUnitIds,
    [SchemaService] IResolverContext resolverContext,
    [Service] IRepository<Document> documentRepository,
    [Service] IDocumentService documentService,
    CancellationToken cancellationToken)
    => documentService.GetEstateUnitDocumentsAsync(
        query => query
          .Where(flat => estateUnitIds.Contains(flat.EstateUnitId))
          .FilterPatched(resolverContext, documentRepository),
        query => query.Sort(resolverContext),
        cancellationToken);
}
