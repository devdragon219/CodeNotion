using RealGimm.Core.Prop.AdministrationAggregate;

namespace RealGimm.Plugin.Import.Prop;

public class CustomPropEnumMapper : ICustomPropEnumMapper
{
  public Task<AdministrationType> MapAdministrationType(string? value)
    => Task.FromResult(value switch
    {
      "TA1" => AdministrationType.RentGeneral,
      "TA2" => AdministrationType.ServiceProvider,
      "TA3" => AdministrationType.HeatingProvider,
      "TA4" => AdministrationType.Generic,
      "TA5" => AdministrationType.Concierge,
      "TA6" => AdministrationType.Owner,
      "TA7" => AdministrationType.BuildingComplex,
      "TA8" => AdministrationType.Heating,
      _ => AdministrationType.Generic
    });
}
