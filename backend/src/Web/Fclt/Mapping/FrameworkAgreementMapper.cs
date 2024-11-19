using RealGimm.Core.Fclt.ContractAggregate;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Fclt.Mapping;

public class FrameworkAgreementMapper : IMapper<FrameworkAgreementInput, FrameworkAgreement>
{
  public FrameworkAgreement? MapAsync(FrameworkAgreementInput? from, FrameworkAgreement? into = null)
  {
    if (from is null)
    {
      return null;
    }

    var frameworkAgreement = into ?? new FrameworkAgreement() { Id = from.Id.GetValueOrDefault() };
    frameworkAgreement.SetExternalCode(from.ExternalCode);
    frameworkAgreement.SetNotes(from.Notes);

    return frameworkAgreement;
  }

  Task<FrameworkAgreement?> IMapper<FrameworkAgreementInput, FrameworkAgreement>.MapAsync(
    FrameworkAgreementInput? from,
    FrameworkAgreement? into,
    CancellationToken cancellationToken)
    => Task.FromResult(MapAsync(from, into));
}
