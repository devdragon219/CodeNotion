using HotChocolate.Resolvers;
using RealGimm.Core;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Core.Docs.DocumentAggregate.Models;
using RealGimm.Core.Docs.DocumentAggregate.Specifications;
using RealGimm.Core.Docs.Interfaces;
using RealGimm.Core.IAM;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Web.Docs.Queries.Filters;

namespace RealGimm.Web.Docs.Queries;

public class CatalogueDocumentQueries
{
  [BackOfficePermission(Features.DOCUMENTS_BASE, Permission.Read)]
  [UseFiltering<DocumentFilterType>]
  [UseSorting]
  public async Task<IEnumerable<DocumentsPerContentCategoryGroupOutput>> ListDocuments(
    int catalogueTypeId,
    int estateId,
    [SchemaService] IResolverContext resolverContext,
    [Service] IRepository<Document> documentRepository,
    [Service] IAccessFilter<Estate> estateAccessFilter, 
    [Service] IDocumentService documentService,
    [Service] IUserDataProvider userDataProvider,
    CancellationToken cancellationToken)
  {
    var reacheableEstates = await estateAccessFilter.ReachableEntitiesAsync(userDataProvider, cancellationToken);
    if (!reacheableEstates.Contains(estateId))
    {
      return Array.Empty<DocumentsPerContentCategoryGroupOutput>();
    }

    var documents = documentRepository
      .AsQueryable(new DocumentsByEntityIdSpec<CatalogueType>(catalogueTypeId), new DocumentsByEstateIdSpec(estateId))
      .Filter(resolverContext)
      .ToArray();

    return documentService
      .GroupDocumentsByContentCategoryGroup(documents)
      .Sort(resolverContext);
  }
}
