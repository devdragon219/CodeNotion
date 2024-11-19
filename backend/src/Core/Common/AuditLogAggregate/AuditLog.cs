using System.ComponentModel.DataAnnotations;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Common.AuditLogAggregate;

public class AuditLog : EntityBase, IAggregateRoot
{
  [MaxLength(100), Required]
  public string EntityType { get; set; } = string.Empty;
  [MaxLength(25), Required]
  public string TablePk { get; set; } = string.Empty;
  [MaxLength(7400)]
  public string? AuditData { get; set; }

  [MaxLength(250), Required]
  public string AuditUser { get; set; } = string.Empty;

  [MaxLength(16), Required]
  public string Action { get; set; } = string.Empty;
  public DateTime AuditDate { get; set; } = DateTime.UtcNow;
}
