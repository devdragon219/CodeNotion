using RealGimm.Core.Prop.AdministrationTermAggregate;
using RealGimm.WebCommons.Extensions;
using RealGimm.Web.Prop.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Prop.Mapping;

public class AdministrationTermMapper : MapperBase, IMapper<AdministrationTermInput, AdministrationTerm>
{
  private readonly IMapper _mapper;

  public AdministrationTermMapper(IMapper mapper)
  {
    _mapper = mapper;
  }

  public async Task<AdministrationTerm?> MapAsync(
    AdministrationTermInput? from,
    AdministrationTerm? into,
    CancellationToken cancellationToken)
  {
    if (from is null)
    {
      return null;
    }

    var administrationTerm = into ?? new AdministrationTerm();
    administrationTerm.SetTermType(from.TermType);
    administrationTerm.SetName(from.Name);
    administrationTerm.SetSince(from.Since);
    administrationTerm.SetUntil(from.Until);
    administrationTerm.SetExpectedAmount(from.ExpectedAmount);

    await _mapper.UpdateCollectionAsync(from.Installments, administrationTerm.Installments, cancellationToken);

    return administrationTerm;
  }
}
