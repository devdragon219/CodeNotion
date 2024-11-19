using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Fclt.ContractAggregate;
using RealGimm.Core.Fclt.TicketChecklistAggregate;
using RealGimm.Core.Fclt.TicketChecklistTemplateAggregate;
using RealGimm.Core.Fclt.TicketChecklistTemplateAggregate.Specifications;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Fclt.Mapping;

public class AddTicketChecklistMapper : IMapper<AddTicketChecklistInput, TicketChecklist>
{
  private readonly IReadRepository<Contract> _contractRepository;
  private readonly IReadRepository<EstateUnit> _estateUnitRepository;
  private readonly IReadRepository<TicketChecklistTemplate> _ticketChecklistTemplateRepository;

  public AddTicketChecklistMapper(
    IReadRepository<Contract> contractRepository,
    IReadRepository<EstateUnit> estateUnitRepository,
    IReadRepository<TicketChecklistTemplate> ticketChecklistTemplateRepository)
  {
    _contractRepository = contractRepository;
    _estateUnitRepository = estateUnitRepository;
    _ticketChecklistTemplateRepository = ticketChecklistTemplateRepository;
  }

  public async Task<TicketChecklist?> MapAsync(
    AddTicketChecklistInput? from,
    TicketChecklist? into,
    CancellationToken cancellationToken)
  {
    if (from is null)
    {
      return null;
    }

    if (into is not null)
    {
      throw new NotSupportedException();
    }

    var ticketChecklist = into ?? new TicketChecklist();
    
    var contract = await LoadContractAsync(from.ContractId, cancellationToken);
    ticketChecklist.SetContract(contract);

    EnsureEstateUnitExists(from.EstateUnitId, contract, cancellationToken);
    ticketChecklist.SetEstateUnitId(from.EstateUnitId);

    var template = await LoadTemplateAsync(from.TicketChecklistTemplateId, cancellationToken);
    ticketChecklist.SetBaseData(template.Type, template.Name, from.InternalCode);
    ticketChecklist.SetCatalogueTypeId(template.CatalogueTypeId);
    ticketChecklist.SetCosts(template.RawWorkCost, template.SafetyCost, template.CostBaseFactor);
    
    ticketChecklist.SetPreventativeSpecifics(
      template.PreventativePlannedPeriod,
      template.PreventativeDaysOfWeek,
      template.PreventativeToleranceDays,
      template.PreventativeInterventionType,
      template.PreventativeCraft,
      template.PreventativeActivityIds);

    ticketChecklist.SetOnTriggerSpecifics(
      template.OnTriggerInterventionType,
      template.OnTriggerCraft,
      template.OnTriggerActivityIds);

    return ticketChecklist;
  }

  private static void EnsureEstateUnitExists(int estateUnitId, Contract contract, CancellationToken cancellationToken)
  {
    if (!contract.EstateUnitIds.Contains(estateUnitId))
    {
      throw new MappingException(ErrorCode.EstateUnitNotFound.ToValidationError());
    }
  }

  private async Task<TicketChecklistTemplate> LoadTemplateAsync(int templateId, CancellationToken cancellationToken)
  {
    var template = await _ticketChecklistTemplateRepository
      .AsQueryable(new GetByIdSpec<TicketChecklistTemplate>(templateId), new TicketChecklistTemplateIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken);

    if (template is null)
    {
      throw new MappingException(ErrorCode.TicketChecklistTemplateNotFound.ToValidationError());
    }

    return template;
  }

  private async Task<Contract> LoadContractAsync(int contractId, CancellationToken cancellationToken)
  {
    var contract = await _contractRepository
      .AsQueryable(new GetByIdSpec<Contract>(contractId))
      .SingleOrDefaultAsync(cancellationToken);
    
    if (contract is null)
    {
      throw new MappingException(ErrorCode.ContractNotFound.ToValidationError());
    }

    return contract;
  }
}
