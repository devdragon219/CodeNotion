namespace RealGimm.Core.Common.NotificationAggregate;

public class CatalogueItemDocumentExpiredNotification : DocumentExpiredNotification
{
  public int EstateId { get; private set; }
  public int CatalogueTypeId { get; private set; }

  public void SetEstateId(int estateId) => EstateId = estateId;

  public void SetCatalogueTypeId(int catalogueTypeId) => CatalogueTypeId = catalogueTypeId;
}
