using RealGimm.Core.Prop.AdministrationAggregate;

namespace RealGimm.Plugin.Import.Prop;

public interface ICustomPropEnumMapper
{
  Task<AdministrationType> MapAdministrationType(string? administrationTypeId);
}
