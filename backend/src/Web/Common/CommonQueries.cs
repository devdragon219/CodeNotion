using RealGimm.Web.Common.Queries;

namespace RealGimm.Web.Common;

[ExtendObjectType(typeof(Query))]
public class CommonQueries
{
  public CityQueries City { get; } = new();
  public VATRateQueries VATRate { get; } = new();
  public InterestRateQueries InterestRate { get; } = new();
  public AccountingItemQueries AccountingItem { get; } = new();
  public BillItemTypeQueries BillItemType { get; } = new();
  public RevaluationDataQueries RevaluationData { get; } = new();
  public NotificationQueries Notification { get; } = new();
  public TaxConfigQueries TaxConfiguration { get; } = new();
  public ReportGeneratorQueries ReportGenerator { get; } = new();
}
