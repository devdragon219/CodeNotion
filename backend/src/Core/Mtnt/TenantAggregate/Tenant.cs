using System.ComponentModel.DataAnnotations;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Mtnt.TenantAggregate;

public class Tenant : EntityBase, IAggregateRoot, ISoftDeletable
{
  [FuzzySearchable, MaxLength(StrFieldSizes.NAME), Required]
  public string Name { get; private set; }
  
  [FuzzySearchable, MaxLength(StrFieldSizes.DESCRIPTION)]
  public string? Description { get; private set; }
  public Guid GUID { get; private set; }
  public DateTime CreationDate { get; private set; }
  public DateTime? LockedSince { get; private set; }
  public DateTime? DeletionDate { get; private set; }

  public Tenant(string name, Guid GUID, string? description)
  {
    Name = name;
    Description = description;
    CreationDate = DateTime.UtcNow;
    this.GUID = GUID;
  }

  public void UpdateName(string newName)
  {
    if (string.IsNullOrEmpty(newName)) throw new ArgumentNullException(nameof(newName));

    Name = newName;
  }

  public void Lock()
  {
    LockedSince = DateTime.UtcNow;
  }

  public void MarkAsDeleted()
  {
    DeletionDate = DateTime.UtcNow;
  }
}
