using HotChocolate.Resolvers;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Core;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.CatalogueItemAggregate;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Docs.DocumentAggregate.Models;
using RealGimm.Core.Docs.DocumentAggregate.Specifications;
using RealGimm.Core.Docs.Interfaces;
using RealGimm.Core.Fclt.TicketAggregate;
using RealGimm.Core.IAM.UserAggregate;
using RealGimm.Web.Asst.DataLoaders;
using RealGimm.Web.Docs.Queries.Filters;
using RealGimm.WebCommons.Anag.DataLoaders;
using RealGimm.WebCommons.User.DataLoaders;
using Microsoft.EntityFrameworkCore;

namespace RealGimm.Web.Fclt.Extensions;

[ExtendObjectType(typeof(Ticket))]
public sealed class TicketExtension
{
  public Task<EstateUnit> GetLocationEstateUnit(
    [Parent] Ticket ticket,
    [Service] EstateUnitDataLoader loader,
    CancellationToken cancellationToken = default)
    => loader.LoadAsync(ticket.LocationEstateUnitId, cancellationToken);

  public async Task<Floor?> GetLocationFloor(
    [Parent] Ticket ticket,
    [Service] EstateUnitDataLoader loader,
    CancellationToken cancellationToken = default)
  {
    if (ticket.LocationFloorId is null)
    {
      return null;
    }

    var estateUnit = await loader.LoadAsync(ticket.LocationEstateUnitId, cancellationToken);
    var floor = estateUnit.Floors.Single(floor => floor.Id == ticket.LocationFloorId);

    return floor;
  }

  public Task<CatalogueType> GetCatalogueType(
    [Parent] Ticket ticket,
    [Service] CatalogueTypeDataLoader loader,
    CancellationToken cancellationToken = default)
    => loader.LoadAsync(ticket.CatalogueTypeId, cancellationToken);

  public async Task<ISubject> GetSupplierSubject(
    [Parent] Ticket ticket,
    [Service] SubjectDataLoader loader,
    CancellationToken cancellationToken = default)
    => await loader.LoadAsync(ticket.SupplierSubjectId, cancellationToken);

  public async Task<User?> GetPlannedTeamLeaderUser(
    [Parent] Ticket ticket,
    [Service] UserDataLoader loader,
    CancellationToken cancellationToken = default)
    => ticket.PlannedTeamLeaderUserId.HasValue
        ? await loader.LoadAsync(ticket.PlannedTeamLeaderUserId.Value, cancellationToken)
        : null;

  public async Task<IEnumerable<CatalogueItem>> GetCatalogueItems(
    [Parent] Ticket ticket,
    [Service] CatalogueItemDataLoader loader,
    CancellationToken cancellationToken = default)
    => await loader.LoadAsync(ticket.CatalogueItemIds, cancellationToken);

  public async Task<bool> CanUseDocumentName(
    [Parent] Ticket ticket,
    string name,
    [Service] IReadRepository<Document> repository)
  {
    if (ticket is null)
    {
      return false;
    }

    return !await repository
      .AsQueryable(new DocumentsByEntityIdAndNameSpec<Ticket>(ticket.Id, name))
      .AnyAsync();
  }

  [UseFiltering<DocumentFilterType>]
  [UseSorting]
  public IEnumerable<Document> GetDocuments(
    [Parent] Ticket ticket,
    [Service] IReadRepository<Document> repository,
    [SchemaService] IResolverContext resolverContext)
  {
    var documents = repository
      .AsQueryable(new DocumentsByEntityIdSpec<Ticket>(ticket.Id))
      .Where(document => document.ContentType != ContentType.Image)
      .Filter(resolverContext)
      .ToArray();

    return documents;
  }

  public IEnumerable<Document> GetImages(
    [Parent] Ticket ticket,
    [Service] IReadRepository<Document> repository)
    => repository
        .AsQueryable(new DocumentsByEntityIdSpec<Ticket>(ticket.Id))
        .Where(document => document.ContentType == ContentType.Image)
        .AsEnumerable();
}
