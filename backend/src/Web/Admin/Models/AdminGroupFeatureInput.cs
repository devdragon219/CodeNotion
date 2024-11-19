namespace RealGimm.Web.Admin.Models;

public record AdminGroupFeatureInput(string Feature, bool CanCreate, bool CanRead, bool CanUpdate, bool CanDelete);