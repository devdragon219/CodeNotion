namespace RealGimm.Core.IAM.GroupAggregate;

public class GroupFeature
{
  public string Feature { get; private set; }
  public Group Group { get; private set; } = null!;
  public int GroupId { get; private set; }

  public bool CanRead { get; set; } = false;
  public bool CanCreate { get; set; } = false;
  public bool CanUpdate { get; set; } = false;
  public bool CanDelete { get; set; } = false;

  public GroupFeature(string feature)
  {
    Feature = feature;
  }
}
