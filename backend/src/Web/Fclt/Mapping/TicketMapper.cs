using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.CatalogueItemAggregate;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Fclt.TicketAggregate;
using RealGimm.Core.Fclt.TicketTypeAggregate;
using RealGimm.Core.Fclt.WorkTeamAggregate;
using RealGimm.Core.IAM.UserAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Extensions;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Fclt.Mapping;

public class TicketMapper : IMapper<TicketInput, Ticket>
{
  private readonly IMapper _mapper;
  private readonly IReadRepository<EstateUnit> _estateUnitRepository;
  private readonly IReadRepository<TicketType> _ticketTypeRepository;
  private readonly IReadRepository<WorkTeam> _workTeamRepository;
  private readonly IReadRepository<CatalogueType> _catalogueTypeRepository;
  private readonly IReadRepository<CatalogueItem> _catalogueItemRepository;
  private readonly IReadRepository<User> _userRepository;
  private readonly IReadRepository<Subject> _subjectRepository;

  public TicketMapper(
    IMapper mapper,
    IReadRepository<EstateUnit> estateUnitRepository,
    IReadRepository<TicketType> ticketTypeRepository,
    IReadRepository<WorkTeam> workTeamRepository,
    IReadRepository<CatalogueType> catalogueTypeRepository,
    IReadRepository<CatalogueItem> catalogueItemRepository,
    IReadRepository<Subject> subjectRepository,
    IReadRepository<User> userRepository)
  {
    _mapper = mapper;
    _estateUnitRepository = estateUnitRepository;
    _ticketTypeRepository = ticketTypeRepository;
    _workTeamRepository = workTeamRepository;
    _catalogueTypeRepository = catalogueTypeRepository;
    _catalogueItemRepository = catalogueItemRepository;
    _subjectRepository = subjectRepository;
    _userRepository = userRepository;
  }

  public async Task<Ticket?> MapAsync(TicketInput? from, Ticket? into, CancellationToken cancellationToken)
  {
    if (from is null)
    {
      return null;
    }

    var ticket = into ?? new Ticket();
    
    await EnsureEstateUnitExistsAsync(from.LocationEstateUnitId, cancellationToken);
    ticket.SetLocationEstateUnitId(from.LocationEstateUnitId);

    if (from.LocationFloorId.HasValue)
    {
      await EnsureLocationFloorExistsAsync(from.LocationEstateUnitId, from.LocationFloorId.Value, cancellationToken);
    }

    ticket.SetLocationFloorId(from.LocationFloorId);

    ticket.SetLocationSector(from.LocationSector);
    ticket.SetLocationRoom(from.LocationRoom);
    ticket.SetInternalCode(from.InternalCode);
    ticket.SetMasterStatus(from.MasterStatus);
    ticket.SetIsWorkSafetyExpected(from.IsWorkSafetyExpected);
    ticket.SetWorkOrderReference(from.WorkOrderReference);
    ticket.SetRequestor(from.Requestor);
    ticket.SetRequestorContactEmail(from.RequestorContactEmail);
    ticket.SetRequestorContactPhone(from.RequestorContactPhone);
    ticket.SetRequestDateTime(from.RequestDateTime);
    ticket.SetDueDate(from.DueDate);
    ticket.SetCustomType(await LoadTicketTypeAsync(from.CustomTypeId));
    ticket.SetPriority(from.Priority);

    await EnsureCatalogueTypeExistsAsync(from.CatalogueTypeId, cancellationToken);
    ticket.SetCatalogueTypeId(from.CatalogueTypeId);

    await EnsureCatalogueItemsExistAsync(from.CatalogueTypeId, from.CatalogueItemIds, cancellationToken);
    ticket.SetCatalogueItemIds(from.CatalogueItemIds);

    ticket.SetSummary(from.Summary);
    ticket.SetDescription(from.Description);

    await _mapper.UpdateCollectionAsync(from.Reminders, ticket.Reminders, cancellationToken);
    
    var resolution = await _mapper.MapAsync<ResolutionInput, Resolution>(from.Resolution, cancellationToken);
    ticket.SetResolution(resolution);

    await _mapper.UpdateCollectionAsync(from.PerformedActivityInputs, ticket.PerformedActivities, cancellationToken);

    await EnsureSupplierSubjectExistsAsync(from.SupplierSubjectId, cancellationToken);
    ticket.SetSupplierSubjectId(from.SupplierSubjectId);

    ticket.SetPlannedTeam(from.PlannedTeamId.HasValue ? await LoadPlannedTeamAsync(from.PlannedTeamId.Value) : null);

    if (from.PlannedTeamLeaderUserId.HasValue)
    {
      await EnsurePlannedTeamLeaderUserExistsAsync(from.PlannedTeamLeaderUserId.Value, cancellationToken);
    }

    ticket.SetPlannedTeamLeaderUserId(from.PlannedTeamLeaderUserId);

    await _mapper.UpdateCollectionAsync(from.Workers, ticket.Workers, cancellationToken);
    
    var quote = await _mapper.MapAsync(from.Quote, ticket.Quote, cancellationToken);
    ticket.SetQuote(quote);

    return ticket;
  }

  private async Task EnsureEstateUnitExistsAsync(int estateUnitId, CancellationToken cancellationToken)
  {
    var exists = await _estateUnitRepository
      .AsQueryable(new GetByIdSpec<EstateUnit>(estateUnitId), new EntityNonDeletedSpec<EstateUnit>())
      .AnyAsync(cancellationToken);

    if (!exists)
    {
      throw new MappingException(ErrorCode.EstateUnitNotFound.ToValidationError());
    }
  }

  private async Task EnsureLocationFloorExistsAsync(int estateUnitId, int floorId, CancellationToken cancellationToken)
  {
    var exists = await _estateUnitRepository
      .AsQueryable(new GetByIdSpec<EstateUnit>(estateUnitId), new EntityNonDeletedSpec<EstateUnit>())
      .Where(estateUnit => estateUnit.Floors.Any(floor => floor.Id == floorId))
      .AnyAsync(cancellationToken);

    if (!exists)
    {
      throw new MappingException(ErrorCode.LocationFloorNotFound.ToValidationError());
    }
  }

  private async Task<TicketType?> LoadTicketTypeAsync(int? ticketTypeId)
  {
    if (ticketTypeId is null)
    {
      return null;
    }

    return await _ticketTypeRepository
      .SingleOrDefaultAsync(new GetByIdSpec<TicketType>(ticketTypeId.Value))
      ?? throw new MappingException(ErrorCode.TicketTypeNotFound.ToValidationError());
  }

  private async Task EnsureCatalogueTypeExistsAsync(int catalogueTypeId, CancellationToken cancellationToken)
  {
    var exists = await _catalogueTypeRepository.AnyAsync(new GetByIdSpec<CatalogueType>(catalogueTypeId), cancellationToken);
    if (!exists)
    {
      throw new MappingException(ErrorCode.CatalogueTypeNotFound.ToValidationError());
    }
  }

  private async Task EnsureCatalogueItemsExistAsync(
    int catalogueTypeId,
    int[] catalogueItemIds,
    CancellationToken cancellationToken)
  {
    var catalogueItemsCount = await _catalogueItemRepository
      .AsQueryable(new GetByIdsSpec<CatalogueItem>(catalogueItemIds))
      .Where(catalogueItem => catalogueItem.CatalogueType.Id == catalogueTypeId)
      .CountAsync(cancellationToken);

    if (catalogueItemsCount != catalogueItemIds.Distinct().Count())
    {
      throw new MappingException(ErrorCode.CatalogueItemNotFound.ToValidationError());
    }
  }

  private async Task EnsureSupplierSubjectExistsAsync(int subjectId, CancellationToken cancellationToken)
  {
    var exists = await _subjectRepository
      .AsQueryable(new GetByIdSpec<Subject>(subjectId), new EntityNonDeletedSpec<Subject>())
      .AnyAsync(cancellationToken);

    if (!exists)
    {
      throw new MappingException(ErrorCode.ProviderSubjectNotFound.ToValidationError());
    }
  }

  private async Task<WorkTeam> LoadPlannedTeamAsync(int plannedTeamId)
    => await _workTeamRepository
      .SingleOrDefaultAsync(new GetByIdSpec<WorkTeam>(plannedTeamId))
      ?? throw new MappingException(ErrorCode.PlannedTeamNotFound.ToValidationError());

  private async Task EnsurePlannedTeamLeaderUserExistsAsync(int userId, CancellationToken cancellationToken)
  {
    var exists = await _userRepository
      .AsQueryable(new GetByIdSpec<User>(userId), new EntityNonDeletedSpec<User>())
      .AnyAsync(cancellationToken);

    if (!exists)
    {
      throw new MappingException(ErrorCode.PlannedTeamLeaderUserNotFound.ToValidationError());
    }
  }
}
