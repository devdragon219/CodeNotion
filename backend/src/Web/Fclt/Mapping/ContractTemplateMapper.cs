using RealGimm.Core;
using RealGimm.Core.Fclt.ContractTemplateAggregate;
using RealGimm.Core.Fclt.ContractTypeAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Mapping;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Fclt.PenaltyAggregate;
using RealGimm.Core.Fclt.SLAAggregate;
using Microsoft.EntityFrameworkCore;

namespace RealGimm.Web.Fclt.Mapping;

public class ContractTemplateMapper : IMapper<ContractTemplateInput, ContractTemplate>
{
  private readonly IReadRepository<ContractType> _contractTypeRepository;
  private readonly IReadRepository<CatalogueType> _catalogueTypeRepository;
  private readonly IReadRepository<SLA> _slaRepository;
  private readonly IReadRepository<Penalty> _penaltyRepository;

  public ContractTemplateMapper(
    IReadRepository<ContractType> contractTypeRepository,
    IReadRepository<CatalogueType> catalogueTypeRepository,
    IReadRepository<SLA> slaRepository,
    IReadRepository<Penalty> penaltyRepository)
  {
    _contractTypeRepository = contractTypeRepository;
    _catalogueTypeRepository = catalogueTypeRepository;
    _slaRepository = slaRepository;
    _penaltyRepository = penaltyRepository;
  }

  public async Task<ContractTemplate?> MapAsync(
    ContractTemplateInput? from,
    ContractTemplate? into = null,
    CancellationToken cancellationToken = default)
  {
    if (from is null)
    {
      return null;
    }

    var contractTemplate = into ?? new ContractTemplate();

    await EnsureCatalogueTypeActivitiesExistAsync(from.CatalogueTypeIds);
    contractTemplate.SetCatalogueTypeIds(from.CatalogueTypeIds);
    
    var contractType = await LoadContractTypeAsync(from.ContractTypeId, cancellationToken);
    contractTemplate.SetData(from.Description, from.InternalCode, contractType);

    var slas = await LoadSLAsAsync(from.SLAIds, cancellationToken);
    contractTemplate.SLAs.Clear();
    contractTemplate.SLAs.AddRange(slas);

    var penalties = await LoadPenaltiesAsync(from.PenaltyIds, cancellationToken);
    contractTemplate.Penalties.Clear();
    contractTemplate.Penalties.AddRange(penalties);

    return contractTemplate;
  }

  private async Task<ContractType> LoadContractTypeAsync(int contractTypeId, CancellationToken cancellationToken)
    => await _contractTypeRepository
        .SingleOrDefaultAsync(new GetByIdSpec<ContractType>(contractTypeId), cancellationToken)
        ?? throw new MappingException(ErrorCode.ContractTypeNotFound.ToValidationError());

  private async Task EnsureCatalogueTypeActivitiesExistAsync(int[] catalogueTypes)
  {
    var catalogueTypeActivitiesCount = await _catalogueTypeRepository
      .AsQueryable(new GetByIdsSpec<CatalogueType>(catalogueTypes))
      .CountAsync();

    if (catalogueTypeActivitiesCount != catalogueTypes.Length)
    {
      throw new MappingException(ErrorCode.CatalogueTypeNotFound.ToValidationError());
    }
  }

  private async Task<IEnumerable<SLA>> LoadSLAsAsync(int[] slaIds, CancellationToken cancellationToken)
  {
    var slas = await _slaRepository.ListAsync(new GetByIdsSpec<SLA>(slaIds), cancellationToken);

    if (slas.Count != slaIds.Length)
    {
      throw new MappingException(ErrorCode.SLANotFound.ToValidationError());
    }
    
    return slas;
  }

  private async Task<IEnumerable<Penalty>> LoadPenaltiesAsync(int[] penaltyIds, CancellationToken cancellationToken)
  {
    var penalties = await _penaltyRepository.ListAsync(new GetByIdsSpec<Penalty>(penaltyIds), cancellationToken);

    if (penalties.Count != penaltyIds.Length)
    {
      throw new MappingException(ErrorCode.PenaltyNotFound.ToValidationError());
    }

    return penalties;
  }
}
