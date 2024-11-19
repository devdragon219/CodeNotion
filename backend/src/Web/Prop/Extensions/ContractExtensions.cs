using HotChocolate.Resolvers;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Core.Docs.DocumentAggregate.Models;
using RealGimm.Core.Docs.DocumentAggregate.Specifications;
using RealGimm.Core.Docs.Interfaces;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Web.Anag.DataLoaders;
using RealGimm.Web.Docs.Queries.Filters;
using RealGimm.WebCommons.Anag.DataLoaders;

namespace RealGimm.Web.Prop.Extensions;

[ExtendObjectType(typeof(Contract))]
public class ContractExtensions
{
  public async Task<ISubject> GetManagementSubject(
    [Parent] Contract contract,
    [Service] SubjectDataLoader loader,
    CancellationToken cancellationToken = default)
    => await loader.LoadAsync(contract.ManagementSubjectId, cancellationToken);

  public async Task<ISubject> GetLandlord(
    [Parent] Contract contract,
    [Service] SubjectDataLoader loader,
    CancellationToken cancellationToken = default)
  {
    var landlordId = contract.Type.IsActive
      ? contract.ManagementSubjectId
      : contract.Counterparts.Single(counterpart => counterpart.IsMainCounterpart).SubjectId;

    return await loader.LoadAsync(landlordId, cancellationToken);
  }

  public async Task<ISubject> GetTenant(
    [Parent] Contract contract,
    [Service] SubjectDataLoader loader,
    CancellationToken cancellationToken = default)
  {
    var tenantId = contract.Type.IsActive
      ? contract.Counterparts.Single(counterpart => counterpart.IsMainCounterpart).SubjectId
      : contract.ManagementSubjectId;

    return await loader.LoadAsync(tenantId, cancellationToken);
  }

  public async Task<bool> CanUseDocumentName(
    [Parent] Contract contract,
    string name,
    [Service] IReadRepository<Document> repository)
    => !await repository.AnyAsync(new DocumentsByEntityIdAndNameSpec<Contract>(contract.Id, name));

  [UseFiltering<DocumentFilterType>]
  [UseSorting]
  public IEnumerable<DocumentsPerContentCategoryGroupOutput> GetDocuments(
    [Parent] Contract contract,
    [SchemaService] IResolverContext resolverContext,
    [Service] IDocumentService documentService,
    [Service] IReadRepository<Document> repository)
  {
    var documents = repository
      .AsQueryable(new DocumentsByEntityIdSpec<Contract>(contract.Id))
      .Filter(resolverContext)
      .ToArray();

    return documentService
      .GroupDocumentsByContentCategoryGroup(documents)
      .Sort(resolverContext);
  }
}
