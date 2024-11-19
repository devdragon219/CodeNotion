using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Fclt.ContractAggregate;
using RealGimm.Core.Fclt.ContractTemplateAggregate;
using RealGimm.Core.Fclt.ContractTypeAggregate;
using RealGimm.Core.Fclt.EstateUnitGroupAggregate;
using RealGimm.Core.Fclt.PriceListAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Extensions;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Fclt.Mapping;

public class ContractMapper : IMapper<ContractInput, Contract>
{
  private readonly IMapper _mapper;
  private readonly IReadRepository<ContractType> _contractTypeRepository;
  private readonly IReadRepository<EstateUnit> _estateUnitRepository;
  private readonly IReadRepository<Subject> _subjectRepository;
  private readonly IReadRepository<ContractTemplate> _contractTemplateRepository;
  private readonly IReadRepository<EstateUnitGroup> _estateUnitGroupRepository;
  private readonly IReadRepository<PriceList> _priceListRepository;
  private readonly IReadRepository<CatalogueType> _catalogueTypeRepository;

  public ContractMapper(
    IMapper mapper,
    IReadRepository<ContractType> contractTypeRepository,
    IReadRepository<EstateUnit> estateUnitRepository,
    IReadRepository<Subject> subjectRepository,
    IReadRepository<ContractTemplate> contractTemplateRepository,
    IReadRepository<EstateUnitGroup> estateUnitGroupRepository,
    IReadRepository<PriceList> priceListRepository,
    IReadRepository<CatalogueType> catalogueTypeRepository)
  {
    _mapper = mapper;
    _contractTypeRepository = contractTypeRepository;
    _estateUnitRepository = estateUnitRepository;
    _subjectRepository = subjectRepository;
    _contractTemplateRepository = contractTemplateRepository;
    _estateUnitGroupRepository = estateUnitGroupRepository;
    _priceListRepository = priceListRepository;
    _catalogueTypeRepository = catalogueTypeRepository;
  }

  public async Task<Contract?> MapAsync(
    ContractInput? from,
    Contract? into = null,
    CancellationToken cancellationToken = default)
  {
    if (from is null)
    {
      return null;
    }

    var contract = into ?? new Contract();
    contract.SetInternalCode(from.InternalCode);
    contract.SetExternalCode(from.ExternalCode);
    contract.SetDescription(from.Description);

    var type = await LoadTypeAsync(from.TypeId, cancellationToken);
    contract.SetType(type);

    var originalTemplate = await LoadOriginalTemplateAsync(from.OriginalTemplateId, cancellationToken);
    contract.SetOriginalTemplate(originalTemplate);

    contract.SetEntryStatus(from.EntryStatus);

    await EnsureProviderSubjectExistsAsync(from.ProviderSubjectId, cancellationToken);
    contract.SetProviderSubjectId(from.ProviderSubjectId);

    contract.SetAgreementDate(from.AgreementDate);
    contract.SetEffectiveDate(from.EffectiveDate);
    contract.SetExpirationDate(from.ExpirationDate);
    contract.SetCancellationNoticeDaysCount(from.CancellationNoticeDaysCount);
    contract.SetRenewalNoticeDaysCount(from.RenewalNoticeDaysCount);
    contract.SetMaximumRenewalDaysCount(from.MaximumRenewalDaysCount);
    await _mapper.UpdateCollectionAsync(from.FrameworkAgreements, contract.FrameworkAgreements, cancellationToken);
    
    var originalEstateUnitGroup = await LoadOriginalEstateUnitGroupAsync(from.OriginalEstateUnitGroupId, cancellationToken);
    contract.SetOriginalEstateUnitGroup(originalEstateUnitGroup);

    await EnsureEstateUnitsExistsAsync(from.EstateUnitIds, cancellationToken);
    contract.SetEstateUnitIds(from.EstateUnitIds);

    await EnsureCatalogueTypesExistsAsync(from.CatalogueTypeIds, cancellationToken);
    contract.SetCatalogueTypeIds(from.CatalogueTypeIds);

    await _mapper.UpdateCollectionAsync(from.SLAs, contract.SLAs, cancellationToken);
    await _mapper.UpdateCollectionAsync(from.Penalties, contract.Penalties, cancellationToken);
   
    var billingInfo = await _mapper.MapAsync(from.BillingInfo, contract.BillingInfo, cancellationToken);
    contract.SetBillingInfo(billingInfo!);

    var priceLists = await LoadPriceListsAsync(from.PriceListIds, cancellationToken);
    contract.PriceLists.Clear();
    contract.PriceLists.AddRange(priceLists);

    await _mapper.UpdateCollectionAsync(from.TermExtensions, contract.TermExtensions, cancellationToken);

    return contract;
  }

  private async Task<ContractType> LoadTypeAsync(int contractTypeId, CancellationToken cancellationToken)
  {
    var contractType = await _contractTypeRepository.SingleOrDefaultAsync(
      new GetByIdSpec<ContractType>(contractTypeId),
      cancellationToken);

    if (contractType is null)
    {
      throw new MappingException(ErrorCode.TypeIsNull.ToValidationError());
    }

    return contractType;
  }

  private async Task<ContractTemplate?> LoadOriginalTemplateAsync(
    int? originalTemplateId,
    CancellationToken cancellationToken)
  {
    if (originalTemplateId is null)
    {
      return null;
    }

    var contractTemplate = await _contractTemplateRepository.SingleOrDefaultAsync(
      new GetByIdSpec<ContractTemplate>(originalTemplateId.Value),
      cancellationToken);

    if (contractTemplate is null)
    {
      throw new MappingException(ErrorCode.OriginalTemplateIsNull.ToValidationError());
    }

    return contractTemplate;
  }

  private async Task EnsureProviderSubjectExistsAsync(int providerSubjectId, CancellationToken cancellationToken)
  {
    var exists = await _subjectRepository
      .AsQueryable(new GetByIdSpec<Subject>(providerSubjectId), new EntityNonDeletedSpec<Subject>())
      .AnyAsync(cancellationToken);

    if (!exists)
    {
      throw new MappingException(ErrorCode.ProviderSubjectNotFound.ToValidationError());
    }
  }

  private async Task<EstateUnitGroup?> LoadOriginalEstateUnitGroupAsync(
    int? originalEstateUnitGroupId,
    CancellationToken cancellationToken)
  {
    if (originalEstateUnitGroupId is null)
    {
      return null;
    }

    var estateUnitGroup = await _estateUnitGroupRepository.SingleOrDefaultAsync(
      new GetByIdSpec<EstateUnitGroup>(originalEstateUnitGroupId.Value),
      cancellationToken);

    if (estateUnitGroup is null)
    {
      throw new MappingException(ErrorCode.OriginalEstateUnitGroupIsNull.ToValidationError());
    }

    return estateUnitGroup;
  }

  private async Task EnsureEstateUnitsExistsAsync(int[] estateUnitIds, CancellationToken cancellationToken)
  {
    var estateUnitsCount = await _estateUnitRepository
      .AsQueryable(new GetByIdsSpec<EstateUnit>(estateUnitIds), new EntityNonDeletedSpec<EstateUnit>())
      .CountAsync(cancellationToken);

    if (estateUnitsCount != estateUnitIds.Distinct().Count())
    {
      throw new MappingException(ErrorCode.EstateUnitNotFound.ToValidationError());
    }
  }

  private async Task EnsureCatalogueTypesExistsAsync(int[] catalogueTypeIds, CancellationToken cancellationToken)
  {
    var catalogueTypesCount = await _catalogueTypeRepository
      .AsQueryable(new GetByIdsSpec<CatalogueType>(catalogueTypeIds))
      .CountAsync(cancellationToken);

    if (catalogueTypesCount != catalogueTypeIds.Distinct().Count())
    {
      throw new MappingException(ErrorCode.CatalogueTypeNotFound.ToValidationError());
    }
  }

  private async Task<IList<PriceList>> LoadPriceListsAsync(int[] priceListIds, CancellationToken cancellationToken)
  {
    var priceLists = await _priceListRepository
      .AsQueryable(new GetByIdsSpec<PriceList>(priceListIds))
      .ToListAsync(cancellationToken);

    if (priceLists.Count != priceListIds.Distinct().Count())
    {
      throw new MappingException(ErrorCode.PriceListNotFound.ToValidationError());
    }

    return priceLists;
  }
}
