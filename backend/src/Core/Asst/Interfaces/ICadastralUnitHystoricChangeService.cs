using RealGimm.Core.Asst.CadastralUnitAggregate;

namespace RealGimm.Core.Asst.Interfaces;
public interface ICadastralUnitHystoricChangeService
{
  Task<CadastralUnit> MakeChange(int oldCadstralUnitId, CadastralUnit newCadastralUnit, CancellationToken cancellationToken);
}
