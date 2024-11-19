using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Prop.BillAggregate;
using RealGimm.Web.Anag.DataLoaders;
using RealGimm.Web.Asst.DataLoaders;
using RealGimm.WebCommons.Anag.DataLoaders;

namespace RealGimm.Web.Prop.Extensions;

[ExtendObjectType(typeof(Bill))]
public class BillExtensions
{
  public async Task<ISubject> GetTransactorSubject(
    [Parent] Bill bill,
    [Service] SubjectDataLoader dataLoader,
    CancellationToken cancellationToken = default)
    => await dataLoader.LoadAsync(bill.TransactorSubjectId, cancellationToken);

  public async Task<ISubject> GetCounterpartSubject(
   [Parent] Bill bill,
   [Service] SubjectDataLoader dataLoader,
   CancellationToken cancellationToken = default)
   => await dataLoader.LoadAsync(bill.MainCounterpartSubjectId, cancellationToken);

  public async Task<EstateUnit?> GetEstateUnit(
    [Parent] Bill bill,
    [Service] EstateUnitDataLoader dataLoader,
    CancellationToken cancellationToken = default)
    => bill.EstateUnitId.HasValue ? await dataLoader.LoadAsync(bill.EstateUnitId.Value, cancellationToken) : null;
}
