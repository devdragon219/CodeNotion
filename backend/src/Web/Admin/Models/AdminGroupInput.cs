namespace RealGimm.Web.Admin.Models;

public record AdminGroupInput(
  string Name, 
  string Description,
  AdminGroupFeatureInput[]? Features
 );
