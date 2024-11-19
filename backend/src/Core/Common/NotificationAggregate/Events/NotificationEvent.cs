using System.Text.Json.Serialization;
using RealGimm.Core.EventSystem;

namespace RealGimm.Core.Common.NotificationAggregate.Events;

[JsonDerivedType(typeof(EstatePortfolioExportIsReadyNotificationEvent), typeDiscriminator: nameof(EstatePortfolioExportIsReadyNotificationEvent))]
[JsonDerivedType(typeof(PasswordExpirationNotificationEvent), typeDiscriminator: nameof(PasswordExpirationNotificationEvent))]
[JsonDerivedType(typeof(ContractsExpirationNotificationEvent), typeDiscriminator: nameof(ContractsExpirationNotificationEvent))]
[JsonDerivedType(typeof(CostChargesExpirationNotificationEvent), typeDiscriminator: nameof(CostChargesExpirationNotificationEvent))]
public abstract record NotificationEvent : DomainEventBase
{
  public required string UserName { get; init; }
  public required DateTime Timestamp { get; init; }
}
