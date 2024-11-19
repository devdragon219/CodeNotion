using RealGimm.Core.EventSystem;

namespace RealGimm.Core.Docs.Events;

public record EstatePortfolioExportEvent : DomainEventBase
{
  public int EstateId { get; set; }
  public string[] CmisIds { get; set; }
  public string CreatedByUserName { get; set; }

  public EstatePortfolioExportEvent(string createdByUserName, int estateId, string[] cmisIds)
  {
    EstateId = estateId;
    CreatedByUserName = createdByUserName;
    CmisIds = cmisIds;
  }
}
