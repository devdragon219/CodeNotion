using RealGimm.Web.Nrgy.Models;
using RealGimm.WebCommons.Mapping;
using RealGimm.Core.Nrgy.UtilityServiceAggregate;
using RealGimm.Core;
using RealGimm.Core.Nrgy.UtilityTypeAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Anag.OrgUnitAggregate;
using RealGimm.Core.Common.AccountingItemAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using Microsoft.EntityFrameworkCore;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Core.Anag.SubjectAggregate;

namespace RealGimm.Web.Nrgy.Mapping;

public sealed class UtilityServiceMapper : IMapper<UtilityServiceInput, UtilityService>
{
  private readonly IMapper _mapper;
  private readonly IReadRepository<UtilityType> _utilityTypeRepository;
  private readonly IReadRepository<Estate> _estateRepository;
  private readonly IReadRepository<EstateUnit> _estateUnitRepository;
  private readonly IReadRepository<OrgUnit> _orgUnitRepository;
  private readonly IReadRepository<AccountingItem> _accountingItemRepository;
  private readonly IReadRepository<Subject> _subjectRepository;

  public UtilityServiceMapper(
    IMapper mapper,
    IReadRepository<UtilityType> utilityTypeRepository,
    IReadRepository<Estate> estateRepository,
    IReadRepository<EstateUnit> estateUnitRepository,
    IReadRepository<OrgUnit> orgUnitRepository,
    IReadRepository<AccountingItem> accountingItemRepository,
    IReadRepository<Subject> subjectRepository)
  {
    _mapper = mapper;
    _utilityTypeRepository = utilityTypeRepository;
    _estateRepository = estateRepository;
    _estateUnitRepository = estateUnitRepository;
    _orgUnitRepository = orgUnitRepository;
    _accountingItemRepository = accountingItemRepository;
    _subjectRepository = subjectRepository;
  }

  public async Task<UtilityService?> MapAsync(UtilityServiceInput? from, UtilityService? into, CancellationToken cancellationToken)
  {
    if (from is null)
    {
      return null;
    }

    var utilityService = into ?? new UtilityService();
    utilityService.SetInternalCode(from.InternalCode);
    utilityService.SetDescription(from.Description);
    utilityService.SetDeposit(from.Deposit);
    utilityService.SetStatus(from.Status);
    utilityService.SetActivationDate(from.ActivationDate);
    utilityService.UpdateContractPowerDetails(from.ContractPowerMaximum, from.ContractPowerNominal, from.ContractNominalTension);
    utilityService.SetNotes(from.Notes);

    var utilityType = await _utilityTypeRepository
      .SingleOrDefaultAsync(new GetByIdSpec<UtilityType>(from.UtilityTypeId), cancellationToken)
      ?? throw new MappingException(ErrorCode.UtilityServiceNonExistingType.ToValidationError());

    await EnsureEstatesExistsAsync(from.EstateIds);
    await EnsureEstateUnitsExistsAsync(from.EstateUnitIds, from.EstateIds);
    await EnsureEntityExistsAsync(from.ProviderSubjectId, _subjectRepository, ErrorCode.UtilityServiceNonExistingSubject);
    await EnsureEntityExistsAsync(from.ReferenceSubjectId, _subjectRepository, ErrorCode.UtilityServiceNonExistingSubject);
    await EnsureEntityExistsAsync(from.OrgUnitId, _orgUnitRepository, ErrorCode.UtilityServiceNonExistingOrgUnit);
    
    await EnsureEntityExistsAsync(
      from.AccountingItemId,
      _accountingItemRepository,
      ErrorCode.UtilityServiceNonExistingAccountingItem);

    utilityService.UpdateUtilityDetails(
      utilityType,
      from.EstateIds.Distinct().ToArray(),
      from.EstateUnitIds.Distinct().ToArray(),
      from.ProviderSubjectId,
      from.ReferenceSubjectId,
      from.OrgUnitId,
      from.AccountingItemId,
      from.IsFreeMarket);

    utilityService.UpdateContractInformation(
      from.UtilityUserCode,
      from.UtilityContractCode,
      from.UtilityMeterSerial,
      from.UtilityDeliveryPointCode);

    return utilityService;
  }

  private async Task EnsureEstatesExistsAsync(int[] estateIds)
  {
    var estateCount = await _estateRepository.CountAsync(new GetByIdsSpec<Estate>(estateIds));
    if (estateCount != estateIds.Distinct().Count())
    {
      throw new MappingException(ErrorCode.UtilityServiceNonExistingEstate.ToValidationError());
    }
  }

  private async Task EnsureEstateUnitsExistsAsync(int[] estateUnitIds, int[] estateIds)
  {
    var estateUnitsCount = await _estateUnitRepository
      .AsQueryable(new GetByIdsSpec<EstateUnit>(estateUnitIds))
      .Where(estateUnit => estateIds.Contains(estateUnit.Estate.Id))
      .CountAsync();

    if (estateUnitsCount != estateUnitIds.Distinct().Count())
    {
      throw new MappingException(ErrorCode.UtilityServiceNonExistingEstateUnit.ToValidationError());
    }
  }
  
  private async Task EnsureEntityExistsAsync<TEntity>(int entityId, IReadRepository<TEntity> repository, ErrorCode errorCode)
    where TEntity : class, IAggregateRoot, IIdentifiable
  {
    var isExists = await repository.AnyAsync(new GetByIdSpec<TEntity>(entityId));
    if (!isExists)
    {
      throw new MappingException(errorCode.ToValidationError());
    }
  }
}
