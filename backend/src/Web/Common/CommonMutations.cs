using RealGimm.Web.Common.Mutations;
using RealGimm.Web.Common.Queries;

namespace RealGimm.Web.Common;

[ExtendObjectType(typeof(Mutation))]
public class CommonMutations
{
  public CityMutations City { get; } = new();
  public VATRateMutations VATRate { get; } = new();
  public InterestRateMutations InterestRate { get; } = new();
  public AccountingItemMutations AccountingItem { get; } = new();
  public BillItemTypeMutations BillItemType { get; } = new();
  public NotificationMutations Notification { get; } = new();
  public TaxConfigMutations TaxConfiguration { get; } = new();
  public ReportGeneratorMutations ReportGenerator { get; } = new();
}
