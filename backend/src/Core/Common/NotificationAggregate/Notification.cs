using System.ComponentModel.DataAnnotations;
using HotChocolate.Types;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Common.NotificationAggregate;

[InterfaceType]
public abstract class Notification : EntityBase, IAggregateRoot
{
  [MaxLength(StrFieldSizes.NAME), Required, FuzzySearchable]
  public string Username { get; private set; } = default!;

  public DateTime Timestamp { get; private set; }
  public NotificationStatus Status { get; private set; } = NotificationStatus.New;

  public void SetData(string username, DateTime timestamp)
  {
    Timestamp = timestamp;
    Username = username;
  }

  public void SetStatus(NotificationStatus status) => Status = status;
}
