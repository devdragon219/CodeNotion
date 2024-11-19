using RealGimm.Core.Shared.Services;
using RealGimm.Core.Prop.RegistrationPaymentAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Anag.SubjectAggregate;
using ClosedXML.Excel;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core.Prop.ContractAggregate;

namespace RealGimm.Core.Prop.Services;

public sealed partial class RegistrationPaymentExportService : ExportService<RegistrationPayment, RegistrationPaymentExportService.Data, RegistrationPaymentExportService>
{
  public required IReadRepository<EstateUnit> _euRepository { private get; init; }
  public required IReadRepository<Subject> _subRepository { private get; init; }

  protected override async Task<IList<Data>> SelectItemsAsync(IEnumerable<RegistrationPayment> entities, CancellationToken cancellationToken = default)
  {
    var managementSubjects = await _subRepository
                                .AsQueryable(new GetByIdsSpec<Subject>(entities.Select(r => r.Contract.ManagementSubjectId).Distinct()))
                                .ToDictionaryAsync(e => e.Id, e => e.Name, cancellationToken);


    var estateUnitsIds = entities.SelectMany(e => e.Contract.LocatedUnits.Where(x => x.IsMainUnit).Select(x => x.EstateUnitId)).Distinct();
    var estates = await _euRepository
                  .AsQueryable(new GetByIdsSpec<EstateUnit>(estateUnitsIds))
                  .Select(e => new
                  {
                    EstateUnitId = e.Id,
                    EstateInternalCode = e.Estate.InternalCode,
                    EstateUnitAddress = e.Address
                  }).ToDictionaryAsync(e => e.EstateUnitId, cancellationToken);

    return entities.Select(e =>
    {
      var estate = estates[e.Contract.LocatedUnits.Where(x => x.IsMainUnit).Select(x => x.EstateUnitId).FirstOrDefault()];
      return new Data(e, estate.EstateUnitAddress, estate.EstateInternalCode, managementSubjects[e.Contract.ManagementSubjectId]);
    }).ToList();
  }

  protected override Dictionary<string, Func<Data, XLCellValue>> CreateExcelDataSelector()
    => new()
  {
    [nameof(RegistrationPayment.PaymentCode)] = data => data.RegistrationPayment.PaymentCode,
    ["ManagementSubjectName"] = data => data.ManagementSubjectName,
    [nameof(RegistrationPayment.ValueDate)] = data => data.RegistrationPayment.ValueDate.ToString(),
    [nameof(RegistrationPayment.PaymentYear)] = data => data.RegistrationPayment.PaymentYear,
    [$"{nameof(RegistrationPayment.Contract)}.{nameof(Contract.InternalCode)}"] = data => data.RegistrationPayment.Contract.InternalCode,
    [nameof(Address.Toponymy)] = data => data.Address.Toponymy,
    [nameof(Address.CityName)] = data => data.Address.CityName,
    [nameof(Address.CountyName)] = data => data.Address.CountyName
  };

}