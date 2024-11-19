using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.Core.Asst.Interfaces;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Asst.Services;

public class CadastralUnitHystoricChangeService : ICadastralUnitHystoricChangeService
{
  private readonly IRepository<CadastralUnit> _repository;

  public CadastralUnitHystoricChangeService(IRepository<CadastralUnit> repository)
  {
    _repository = repository;
  }

  public async Task<CadastralUnit> MakeChange(int oldCadstralUnitId, CadastralUnit newCadastralUnit, CancellationToken cancellationToken)
  {
    var prevCU = _repository.AsQueryable(new GetByIdSpec<CadastralUnit>(oldCadstralUnitId)).First();

    //add new cadastralunit
    newCadastralUnit.Id = default;
    var address = newCadastralUnit.Address;
    if (address != null)
    {
      address.Id = default;
      newCadastralUnit.SetAddress(address);
    }
    newCadastralUnit.SetHistoryTags(newCadastralUnit.HistoryTags.Concat(prevCU.HistoryTags).Distinct().ToArray());

    await _repository.UpdateAsync(newCadastralUnit, cancellationToken);

    //Update old cadastralunit
    prevCU.SetStatus(CadastralUnitStatus.Changed);
    prevCU.SetDates(prevCU.Since, newCadastralUnit.Since is not null ? newCadastralUnit.Since.Value.AddDays(-1) : null);
    prevCU.SetLastRelevantChangeDate(DateTime.UtcNow);

    await _repository.SaveChangesAsync(cancellationToken);

    return newCadastralUnit;
  }
}
