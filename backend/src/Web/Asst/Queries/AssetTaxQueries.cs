using RealGimm.Core;
using RealGimm.Core.IAM;
using Autofac.Core;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core.Asst.CadastralUnitAggregate.Specifications;
using RealGimm.Web.Asst.Queries.Filters;
using RealGimm.Web.Asst.Queries.Sorting;
using HotChocolate.Resolvers;
using Microsoft.Extensions.Caching.Distributed;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.WebCommons.Models;
using System.Linq.Expressions;
using RealGimm.Core.Asst.AssetTaxCalculationAggregate.Models;
using RealGimm.Core.Asst.AssetTaxCalculationAggregate;

namespace RealGimm.Web.Asst.Queries;

public class AssetTaxQueries : QueriesBase
{
  [BackOfficePermission(Features.ASST_ASSET_TAX_BASE, Permission.Read)]
  public async Task<AssetTaxGroupedRow?> GetSingleGroupedPayment(
   Guid taxCalculatorId,
   int year,
   int managementSubjectId,
   DateOnly expectedDueDate,
   [Service] IReadRepository<Subject> subRepository,
   [Service] IReadRepository<AssetTaxCalculation> repository,
   CancellationToken cancellationToken = default)
  {
    var taxCalculation = await repository.AsQueryable(new AssetTaxCalculationIncludeAllSpec())
                          .Where(e => e.TaxCalculatorId == taxCalculatorId && e.Year == year && e.CadastralUnit.EstateUnit!.ManagementSubjectId == managementSubjectId)
                          .FirstOrDefaultAsync(cancellationToken);

    if (taxCalculation is null)
    {
      throw new ArgumentNullException(nameof(taxCalculation));
    }

    var managementSubject = (await subRepository.GetByIdAsync(managementSubjectId))?.Name;
    return taxCalculation.Installments
          .Where(inst => inst.ExpectedDueDate == expectedDueDate)
          .GroupBy(inst => new { inst.ExpectedDueDate }).Select(e => new AssetTaxGroupedRow
          {
            AssetTaxCalculation = taxCalculation,
            Year = taxCalculation.Year,
            ManagementSubjectId = taxCalculation.CadastralUnit.EstateUnit!.ManagementSubjectId,
            LastUpdate = e.Max(x => x.Date),
            ManagementSubject = managementSubject,
            ExpectedDueDate = e.First().ExpectedDueDate,
            TotalAmount = e.Select(x => x.AmountPaid).Sum(),
            TotalTaxableAmount = e.Select(x => x.BaseTaxableAmount).Sum(),
            Payments = e
          }).FirstOrDefault();
  }

  [BackOfficePermission(Features.ASST_ASSET_TAX_BASE, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(AssetTaxGroupedRowFilterType))]
  [UseSorting(typeof(AssetTaxGroupedRowSortInputType))]
  public async Task<IEnumerable<AssetTaxGroupedRow>> GetGroupedPayments(
   Guid taxCalculatorId,
   bool currentYear,
   [Service] IReadRepository<Subject> subRepository,
   [Service] IReadRepository<AssetTaxCalculation> repository,
   CancellationToken cancellationToken = default) => await InnerQueryGetGroupedPayments(taxCalculatorId, currentYear, subRepository, repository, cancellationToken);

  [BackOfficePermission(Features.ASST_ASSET_TAX_BASE, Permission.Read)]
  [UseFiltering(typeof(AssetTaxGroupedRowFilterType))]
  [UseSorting(typeof(AssetTaxGroupedRowSortInputType))]
  public async Task<IEnumerable<AssetTaxGroupedRow>> GetFullGroupedPayments(
   Guid taxCalculatorId,
   bool currentYear,
   [Service] IReadRepository<Subject> subRepository,
   [Service] IReadRepository<AssetTaxCalculation> repository,
   CancellationToken cancellationToken = default) => await InnerQueryGetGroupedPayments(taxCalculatorId, currentYear, subRepository, repository, cancellationToken);

  [BackOfficePermission(Features.ASST_ASSET_TAX_BASE, Permission.Read)]
  [UseFiltering(typeof(AssetTaxGroupedRowFilterType))]
  [UseSorting(typeof(AssetTaxGroupedRowSortInputType))]
  public async Task<FileUrlOutput> ExportGroupedPayments(
   Guid taxCalculatorId,
   bool currentYear,
   [Service] IReadRepository<Subject> subRepository,
   [Service] IReadRepository<AssetTaxCalculation> repository,
   [SchemaService] IResolverContext resolverContext,
   [Service] IExportService<AssetTaxGroupedRow> exportService,
   [Service] IDistributedCache distributedCache,
   CancellationToken cancellationToken = default)
  {
    var results = await InnerQueryGetGroupedPayments(taxCalculatorId, currentYear, subRepository, repository, cancellationToken);
    var filteresResults = results.AsQueryable().Filter(resolverContext).Sort(resolverContext).ToList();

    return await ExportToExcelAsync(filteresResults, distributedCache, exportService, cancellationToken);
  }


  private async Task<IEnumerable<AssetTaxGroupedRow>> InnerQueryGetGroupedPayments(
   Guid taxCalculatorId,
   bool currentYear,
   IReadRepository<Subject> subRepository,
   IReadRepository<AssetTaxCalculation> repository,
   CancellationToken cancellationToken = default)
  {
    var groupedPayments = new List<AssetTaxGroupedRow>();

    var today = DateTime.Now;
    Expression<Func<AssetTaxCalculation, bool>> yearFilter = 
      (e) => currentYear ? (today.Month == 1 ? (e.Year == today.Year || e.Year == today.AddYears(-1).Year) : e.Year == today.Year) : e.Year < today.Year;

    var allTaxCalculations = await repository.AsQueryable(new AssetTaxCalculationIncludeAllSpec())
                                  .Where(e => e.TaxCalculatorId == taxCalculatorId).Where(yearFilter)
                                  .ToListAsync(cancellationToken);

    if (!allTaxCalculations.Any())
    {
      return groupedPayments;
    }

    var managementSubjects = await subRepository.ListAsync(new GetByIdsSpec<Subject>(allTaxCalculations.Select(tc => tc.CadastralUnit.EstateUnit!.ManagementSubjectId)));
    var groupedTaxCalculations = allTaxCalculations.GroupBy(tc => new
    {
      tc.TaxCalculatorId,
      tc.Year,
      tc.CadastralUnit.EstateUnit!.ManagementSubjectId
    });

    foreach (var taxCalculations in groupedTaxCalculations)
    {
      var assetPayments = new List<AssetTaxPayment>();

      foreach (var taxCalculation in taxCalculations)
      {
        assetPayments.AddRange(taxCalculation.Installments);
      }

      groupedPayments.AddRange(assetPayments.GroupBy(inst => new { inst.ExpectedDueDate }).Select(e => new AssetTaxGroupedRow
      {
        AssetTaxCalculation = taxCalculations.First(),
        Year = taxCalculations.First().Year,
        ManagementSubjectId = taxCalculations.First().CadastralUnit.EstateUnit!.ManagementSubjectId,
        ManagementSubject = managementSubjects.FirstOrDefault(e => e.Id == taxCalculations.First().CadastralUnit.EstateUnit!.ManagementSubjectId)?.Name,
        LastUpdate = e.Max(x => x.Date),
        ExpectedDueDate = e.First().ExpectedDueDate,
        TotalAmount = e.Select(x => x.AmountPaid).Sum(),
        TotalTaxableAmount = e.Select(x => x.BaseTaxableAmount).Sum(),
        Payments = e
      }));
    }

    return groupedPayments;
  }

  [BackOfficePermission(Features.ASST_ASSET_TAX_BASE, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(AssetTaxDetailRowFilterType))]
  [UseSorting(typeof(AssetTaxDetailRowSortInputType))]
  public async Task<IEnumerable<AssetTaxDetailRow>> GetDetailGroupedPayments(
   Guid taxCalculatorId,
   int year,
   int managementSubjectId,
   DateOnly expectedDueDate,
   [Service] IReadRepository<AssetTaxCalculation> repository,
   CancellationToken cancellationToken = default)
    => await InnerGetAssetTaxDetailRows(taxCalculatorId, year, managementSubjectId, expectedDueDate, repository, cancellationToken);

  [BackOfficePermission(Features.ASST_ASSET_TAX_BASE, Permission.Read)]
  [UseFiltering(typeof(AssetTaxDetailRowFilterType))]
  [UseSorting(typeof(AssetTaxDetailRowSortInputType))]
  public async Task<FileUrlOutput> ExportDetailGroupedPayments(
   Guid taxCalculatorId,
   int year,
   int managementSubjectId,
   DateOnly expectedDueDate,
   [Service] IReadRepository<AssetTaxCalculation> repository,
   [SchemaService] IResolverContext resolverContext,
   [Service] IExportService<AssetTaxDetailRow> exportService,
   [Service] IDistributedCache distributedCache,
   CancellationToken cancellationToken = default)
  {
    var results = await InnerGetAssetTaxDetailRows(taxCalculatorId, year, managementSubjectId, expectedDueDate, repository, cancellationToken);
    var filteresResults = results.AsQueryable().Filter(resolverContext).Sort(resolverContext).ToList();

    return await ExportToExcelAsync(filteresResults, distributedCache, exportService, cancellationToken);
  }

  private async Task<IEnumerable<AssetTaxDetailRow>> InnerGetAssetTaxDetailRows(
   Guid taxCalculatorId,
   int year,
   int managementSubjectId,
   DateOnly expectedDueDate,
   IReadRepository<AssetTaxCalculation> repository,
   CancellationToken cancellationToken = default)
  {
    var taxCalculators = await repository.AsQueryable(new AssetTaxCalculationIncludeAllSpec())
                          .Where(e => e.TaxCalculatorId == taxCalculatorId && e.Year == year && e.CadastralUnit.EstateUnit!.ManagementSubjectId == managementSubjectId)
                          .ToListAsync(cancellationToken);

    var estateUnits = new List<AssetTaxDetailEstateUnitItem>();
    foreach (var taxCalculator in taxCalculators)
    {
      var installments = taxCalculator.Installments.Where(inst => inst.ExpectedDueDate == expectedDueDate);
      if (!installments.Any()) continue;

      estateUnits.Add(new AssetTaxDetailEstateUnitItem
      {
        CadastralUnitIncome = taxCalculator.CadastralUnit.Income,
        CadastralUnitTaxConfig = taxCalculator.CadastralUnit.TaxConfig.Where(e => e.Code == "imu-rate").FirstOrDefault(),
        Estate = taxCalculator.CadastralUnit.EstateUnit!.Estate,
        Address = taxCalculator.CadastralUnit.EstateUnit.Address,
        CadastralCoordinates = taxCalculator.CadastralUnit.Coordinates,
        EstateUnitInternalCode = taxCalculator.CadastralUnit.EstateUnit!.InternalCode,
        EstateUnitOwnershipPercent = taxCalculator.CadastralUnit.EstateUnit!.OwnershipPercent,
        AmountPaid = installments.Select(e => e.AmountPaid).Sum(),
        BaseTaxableAmount = installments.Select(e => e.BaseTaxableAmount).Sum(),
        GrossCadastralIncome = installments.Select(e => e.GrossCadastralIncome).Sum(),
        ActualizedCadastralIncome = installments.Select(e => e.ActualizedCadastralIncome).Sum()
      });
    }

    var estateGrouped = estateUnits.GroupBy(e => new { e.Estate, e.Address })
                        .Select(x => new AssetTaxDetailEstateItem
                        {
                          Address = x.First().Address,
                          EstateInternalCode = x.First().Estate.InternalCode,
                          TotalAmountPaid = x.Select(eu => eu.AmountPaid).Sum(),
                          TotalBaseTaxableAmount = x.Select(eu => eu.BaseTaxableAmount).Sum(),
                          TotalGrossCadastralIncome = x.Select(eu => eu.GrossCadastralIncome).Sum(),
                          TotalActualizedCadastralIncome = x.Select(eu => eu.ActualizedCadastralIncome).Sum(),
                          SubRows = x.ToList()
                        });

    var addressGrouped = estateGrouped.GroupBy(e => e.Address)
                         .Select(x => new AssetTaxDetailRow
                         {
                           CityName = x.First().Address.CityName,
                           Address = x.First().Address,
                           EstatesCount = x.Count(),
                           EstateUnitsCount = x.First().SubRows.Count(),
                           SubRows = x.ToList()
                         });

    return addressGrouped;
  }
}
