using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Core.IAM.UserAggregate;
using HotChocolate;
using System.ComponentModel.DataAnnotations;
using RealGimm.SharedKernel.Attributes;

namespace RealGimm.Core.IAM.GroupAggregate;

public class Group : EntityBase, IAggregateRoot
{
  [MaxLength(StrFieldSizes.NAME), Required, FuzzySearchable]
  public string Name { get; private set; }

  [FuzzySearchable, MaxLength(StrFieldSizes.DESCRIPTION)]
  public string? Description { get; private set; }
  public DateTime CreationDate { get; private set; }

  private readonly List<GroupFeature> _features = new();
  public IReadOnlyCollection<GroupFeature> Features => _features.AsReadOnly();

  [GraphQLIgnore]
  public List<UserGroup> UserGroups { get; private set; } = new();

  public IReadOnlyCollection<User> Users => UserGroups
    .Select(ug => ug.User)
    .ToList()
    .AsReadOnly();

  public Group(string name)
  {
    Name = name;
    CreationDate = DateTime.UtcNow;
  }

  public Group(string name, string description)
  {
    Name = name;
    Description = description;
    CreationDate = DateTime.UtcNow;
  }

  public void SetGroupName(string newName)
  {
    if (string.IsNullOrEmpty(newName)) throw new ArgumentNullException(nameof(newName));
    Name = newName;
  }

  public void SetGroupDescription(string newDescription)
  {
    Description = newDescription;
  }

  public void SetFeature(string feature, bool canRead, bool canCreate, bool canUpdate, bool canDelete)
  {
    var fExisting = _features.FirstOrDefault(f => f.Feature == feature);

    if (fExisting == null)
    {
      _features.Add(new GroupFeature(feature)
      {
        CanCreate = canCreate,
        CanDelete = canDelete,
        CanRead = canRead,
        CanUpdate = canUpdate
      });
    }
    else
    {
      fExisting.CanCreate = canCreate;
      fExisting.CanDelete = canDelete;
      fExisting.CanRead = canRead;
      fExisting.CanUpdate = canUpdate;
    }
  }

  public void RemoveFeature(string feature)
  {
    var fExisting = _features.FirstOrDefault(f => f.Feature == feature);
    if (fExisting is null) throw new ArgumentNullException(feature);

    _features.Remove(fExisting);
  }

  public void RemoveFeatures(string[] permissionsToBeRemoved)
  {
    if (permissionsToBeRemoved.Any()) _features.RemoveAll(e => permissionsToBeRemoved.Contains(e.Feature));
  }
}
