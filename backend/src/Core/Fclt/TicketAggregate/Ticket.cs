using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.Core.Fclt.ContractAggregate;
using RealGimm.Core.Fclt.TicketAggregate.TicketHistory;
using RealGimm.Core.Fclt.TicketChecklistAggregate;
using RealGimm.Core.Fclt.TicketTypeAggregate;
using RealGimm.Core.Fclt.WorkTeamAggregate;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Fclt.TicketAggregate;

public class Ticket : EntityBase, IAggregateRoot, IInternallyCoded
{
  [FuzzySearchable, MaxLength(StrFieldSizes.INTERNAL_CODE), Required]
  public string InternalCode { get; private set; } = default!;

  public TicketMainType MainType { get; private set; }
  public TicketMasterStatus MasterStatus { get; private set; }

  public int LocationEstateUnitId { get; private set; }
  public int? LocationFloorId { get; private set; }

  [FuzzySearchable, MaxLength(StrFieldSizes.SMALL_TOPONYMY_NAME)]
  public string? LocationSector { get; private set; }

  [FuzzySearchable, MaxLength(StrFieldSizes.SMALL_TOPONYMY_NAME)]
  public string? LocationRoom { get; private set; }

  [FuzzySearchable, MaxLength(StrFieldSizes.NAME)]
  public string? Requestor { get; private set; }

  [FuzzySearchable, MaxLength(StrFieldSizes.NAME)]
  public string? RequestorContactEmail { get; private set; }

  [FuzzySearchable, MaxLength(StrFieldSizes.NAME)]
  public string? RequestorContactPhone { get; private set; }

  public DateTime RequestDateTime { get; private set; }
  public DateOnly DueDate { get; private set; }

  public bool IsExcludedFromMaintenanceContract { get; private set; }
  public bool IsWorkSafetyExpected { get; private set; }
  
  [FuzzySearchable, MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? WorkOrderReference { get; private set; }

  public TicketType? CustomType { get; private set; }

  public Priority Priority { get; private set; }
  public int CatalogueTypeId { get; private set; }
  public int[] CatalogueItemIds { get; private set; } = [];
  public Contract? Contract { get; private set; } = default!;
  public TicketChecklist? Checklist { get; private set; } = default!;

  [FuzzySearchable, MaxLength(StrFieldSizes.DESCRIPTION)]
  public string? Summary { get; private set; }

  [FuzzySearchable, MaxLength(StrFieldSizes.DESCRIPTION)]
  public string? Description { get; private set; }

  public NullSafeCollection<PerformedActivity> PerformedActivities { get; private set; } = [];
  public NullSafeCollection<Reminder> Reminders { get; private set; } = [];
  public NullSafeCollection<TicketHistoryEntry> History { get; private set; } = [];
  public NullSafeCollection<Reply> Replies { get; private set; } = [];
  public NullSafeCollection<Worker> Workers { get; private set; } = [];
  public NullSafeCollection<Ticket> Children { get; private set; } = [];

  public Resolution? Resolution { get; private set; }
  public Quote? Quote { get; private set; }

  public int SupplierSubjectId { get; private set; }
  public WorkTeam? PlannedTeam { get; private set; }
  public int? PlannedTeamLeaderUserId { get; private set; }
  public bool IsOverduePlannedPeriod { get; private set; }

  public void SetInternalCode(string internalCode) => InternalCode = internalCode;

  public void SetMainType(TicketMainType mainType) => MainType = mainType;

  public void SetMasterStatus(TicketMasterStatus masterStatus) => MasterStatus = masterStatus;

  public void SetLocationEstateUnitId(int locationEstateUnitId) => LocationEstateUnitId = locationEstateUnitId;

  public void SetLocationFloorId(int? locationFloorId) => LocationFloorId = locationFloorId;

  public void SetLocationSector(string? locationSector) => LocationSector = locationSector;

  public void SetLocationRoom(string? locationRoom) => LocationRoom = locationRoom;

  public void SetRequestor(string? requestor) => Requestor = requestor;

  public void SetRequestorContactEmail(string? requestorContactEmail) => RequestorContactEmail = requestorContactEmail;

  public void SetRequestorContactPhone(string? requestorContactPhone) => RequestorContactPhone = requestorContactPhone;

  public void SetRequestDateTime(DateTime requestDateTime) => RequestDateTime = requestDateTime;

  public void SetDueDate(DateOnly dueDate) => DueDate = dueDate;

  public void SetIsExcludedFromMaintenanceContract(bool isExcludedFromMaintenanceContract)
    => IsExcludedFromMaintenanceContract = isExcludedFromMaintenanceContract;

  public void SetIsWorkSafetyExpected(bool isWorkSafetyExpected) => IsWorkSafetyExpected = isWorkSafetyExpected;
  
  public void SetWorkOrderReference(string? workOrderReference) => WorkOrderReference = workOrderReference;

  public void SetCustomType(TicketType? customType) => CustomType = customType;

  public void SetPriority(Priority priority) => Priority = priority;

  public void SetCatalogueTypeId(int catalogueTypeId) => CatalogueTypeId = catalogueTypeId;

  public void SetCatalogueItemIds(int[] catalogueItemIds)
    => CatalogueItemIds = catalogueItemIds.Distinct().ToArray();

  public void SetContract(Contract? contract) => Contract = contract;

  public void SetChecklist(TicketChecklist? checklist) => Checklist = checklist;

  public void SetSummary(string? summary) => Summary = summary;

  public void SetDescription(string? description) => Description = description;

  public void SetResolution(Resolution? resolution) => Resolution = resolution;

  public void SetQuote(Quote? quote) => Quote = quote;

  public void SetSupplierSubjectId(int supplierSubjectId) => SupplierSubjectId = supplierSubjectId;

  public void SetPlannedTeam(WorkTeam? plannedTeam) => PlannedTeam = plannedTeam;

  public void SetPlannedTeamLeaderUserId(int? plannedTeamLeaderId) => PlannedTeamLeaderUserId = plannedTeamLeaderId;

  public void SetIsOverduePlannedPeriod(bool isPlannedOverdue) => IsOverduePlannedPeriod = isPlannedOverdue;

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (string.IsNullOrWhiteSpace(InternalCode))
    {
      yield return ErrorCode.InternalCodeIsNullOrEmptyString.ToValidationError();
    }
  }
}
