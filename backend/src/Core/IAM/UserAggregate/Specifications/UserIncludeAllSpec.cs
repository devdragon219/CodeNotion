using Ardalis.Specification;

namespace RealGimm.Core.IAM.UserAggregate.Specifications;

public class UserIncludeAllSpec : Specification<User>
{
  public UserIncludeAllSpec()
  {
    Query
      .Include(user => user.UserGroups)
        .ThenInclude(userGroup => userGroup.Group)
      .Include(user => user.Contacts)
      .Include(user => user.Sessions)      
      .Include(user => user.FacilityDashboard.OrderBy(section => section.Order))
        .ThenInclude(section => section.Rows.OrderBy(row => row.Order))
          .ThenInclude(row => row.Widgets.OrderBy(widget => widget.Order))      
      .Include(user => user.MainDashboard.OrderBy(section => section.Order))
        .ThenInclude(section => section.Rows.OrderBy(row => row.Order))
          .ThenInclude(row => row.Widgets.OrderBy(widget => widget.Order))
      .AsSplitQuery();
  }
}
