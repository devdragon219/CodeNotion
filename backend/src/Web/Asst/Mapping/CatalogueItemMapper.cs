using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Asst.CatalogueItemAggregate;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Asst.CatalogueTypeAggregate.Specifications;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateAggregate.Specifications;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Web.Asst.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Asst.Mapping;

public sealed class CatalogueItemMapper : IMapper<CatalogueItemInput, CatalogueItem>
{
  private readonly IMapper _mapper;
  private readonly IReadRepository<Estate> _estateRepository;
  private readonly IReadRepository<CatalogueType> _catalogueTypeRepository;

  public CatalogueItemMapper(
    IMapper mapper,
    IReadRepository<Estate> estateRepository,
    IReadRepository<CatalogueType> catalogueTypeRepository)
  {
    _mapper = mapper;
    _estateRepository = estateRepository;
    _catalogueTypeRepository = catalogueTypeRepository;
  }

  public async Task<CatalogueItem?> MapAsync(
    CatalogueItemInput? from,
    CatalogueItem? into,
    CancellationToken cancellationToken = default)
  {
    if (from is null)
    {
      return null;
    }

    var item = into ?? new CatalogueItem();
    item.SetInternalCode(from.InternalCode);
    item.SetStatus(from.Status);
    item.SetActivationDate(from.ActivationDate);
    item.SetLastMaintenanceDate(from.LastMaintenanceDate);
    item.SetDecommissioningDate(from.DecommissioningDate);
    
    var fields = await _mapper.MapAsync<CatalogueItemFieldInput, CatalogueItemField>(from.Fields, cancellationToken);
    item.SetFields(fields!.ToArray()!);

    var estate = await _estateRepository
      .AsQueryable(new GetByIdSpec<Estate>(from.EstateId), new EstateIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken)
      ?? throw new MappingException(ErrorCode.CatalogueItemNonExistingEstate.ToValidationError());

    item.SetEstate(estate);

    var type = await _catalogueTypeRepository
      .AsQueryable(new GetByIdSpec<CatalogueType>(from.CatalogueTypeId), new CatalogueTypeIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken)
      ?? throw new MappingException(ErrorCode.CatalogueItemNonExistingType.ToValidationError());

    item.SetType(type);

    return item;
  }
}
