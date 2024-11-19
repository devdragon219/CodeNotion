using HotChocolate.Types;

namespace RealGimm.Core.Common.NotificationAggregate;

[InterfaceType]
public abstract class DocumentExpiredNotification : Notification
{
  public string DocumentCmisId { get; private set; } = default!;
  public int EntityId { get; private set; }

  public void SetDocumentCmisId(string documentCmisId) => DocumentCmisId = documentCmisId;
  public void SetEntityId(int entityId) => EntityId = entityId;
}
