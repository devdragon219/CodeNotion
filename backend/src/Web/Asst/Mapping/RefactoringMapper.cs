using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Web.Asst.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Asst.Mapping;

public class RefactoringMapper : IMapper<RefactoringInput, Refactoring>
{
  public Task<Refactoring?> MapAsync(RefactoringInput? from, Refactoring? into, CancellationToken cancellationToken = default)
    => Task.FromResult(Map(from, into));

  public Refactoring? Map(RefactoringInput? from, Refactoring? into)
  {
    if (from is null)
    {
      return null;
    }

    var refact = into ?? new Refactoring();
    refact.SetReferenceYear(from.ReferenceYear);

    refact.SetEstateUnits(from.EstateUnitIds);
    refact.SetValues(from.ReferenceYear,
      from.BuildingPermitYear,
      from.Condition,
      from.AgeCoefficient);

    if (into is null && from.Id.GetValueOrDefault() != default)
    {
      refact.Id = from.Id!.Value;
    }

    return refact;
  }
}
