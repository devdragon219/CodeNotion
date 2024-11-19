using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Web.Prop.Models;
using RealGimm.WebCommons.Anag.DataLoaders;

namespace RealGimm.Web.Prop.Extensions;

[ExtendObjectType(typeof(BillFullListOutput))]
public class BillFullListOutputExtensions
{
  public async Task<ISubject> GetMainCounterpartSubject(
   [Parent] BillFullListOutput bill,
   [Service] SubjectDataLoader dataLoader,
   CancellationToken cancellationToken = default)
   => await dataLoader.LoadAsync(bill.MainCounterpartSubjectId, cancellationToken);
  
  public async Task<ISubject> GetContractManagementSubject(
   [Parent] BillFullListOutput bill,
   [Service] SubjectDataLoader dataLoader,
   CancellationToken cancellationToken = default)
   => await dataLoader.LoadAsync(bill.ContractManagementSubjectId, cancellationToken);
}
