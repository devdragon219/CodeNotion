using RealGimm.Core.Prop.RegistrationOfficeAggregate;
using RealGimm.Web.Prop.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Prop.Mapping;

public class RegistrationOfficeMapper : IMapper<RegistrationOfficeInput, RegistrationOffice>
{
  public RegistrationOffice? Map(RegistrationOfficeInput? from, RegistrationOffice? into)
  {
    if (from is null)
    {
      return null;
    }

    var regOffice = into ?? new RegistrationOffice();
    regOffice.SetDescription(from.Description);
    regOffice.SetExternalCode(from.ExternalCode);
    regOffice.SetCity(from.CityId);
    
    if (into is null && from.Id.GetValueOrDefault() != default)
    {
      regOffice.Id = from.Id!.Value;
    }

    return regOffice;
  }

  Task<RegistrationOffice?> IMapper<RegistrationOfficeInput, RegistrationOffice>.MapAsync(
    RegistrationOfficeInput? from,
    RegistrationOffice? into,
    CancellationToken cancellationToken)
    => Task.FromResult(Map(from, into));
}
