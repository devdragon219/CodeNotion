using RealGimm.Infrastructure.Prop.Data.Fakers;
using RealGimm.Infrastructure;
using RealGimm.Web.Prop.Models;
using RealGimm.Core.Prop.BillItemTypeAggregate;

namespace RealGimm.FunctionalTests.Web.Fakers.Prop.Contract;

public sealed class RecurringAdditionInputFaker : BaseSeededFaker<RecurringAdditionInput>
{
  public IEnumerable<BillItemType> BillItemTypes { get; private set; } = []; 
  public IEnumerable<int> AccountingItemsIds { get; private set; } = [];
  public IEnumerable<int> VATRatesIds { get; private set; } = [];

  public RecurringAdditionInputFaker()
  {
    CustomInstantiator(faker =>
    {
      var input = new RecurringAdditionInput
      {
        BillItemTypeId = RecurringAdditionFaker.PickBillItemType(faker, BillItemTypes).Id,
        AccountingItemId = RecurringAdditionFaker.PickAccountingItemId(faker, AccountingItemsIds),
        VATRateId = RecurringAdditionFaker.PickVATRateId(faker, VATRatesIds),
        AmountPerInstallment = RecurringAdditionFaker.GenerateAmountPerInstallment(faker),
        ExcludeStartMonth = RecurringAdditionFaker.GenerateExcludeStartMonth(faker),
        ExcludeEndMonth = RecurringAdditionFaker.GenerateExcludeEndMonth(faker),
        Notes = RecurringAdditionFaker.GenerateNotes(faker)
      };

      return input;
    });
  }

  public RecurringAdditionInputFaker UseBillItemTypes(IEnumerable<BillItemType> billItemTypes)
  {
    BillItemTypes = billItemTypes ?? throw new ArgumentNullException(nameof(billItemTypes));

    return this;
  }

  public RecurringAdditionInputFaker UseAccountingItemsIds(IEnumerable<int> accountingItemsIds)
  {
    AccountingItemsIds = accountingItemsIds ?? throw new ArgumentNullException(nameof(accountingItemsIds));

    return this;
  }

  public RecurringAdditionInputFaker UseVATRatesIds(IEnumerable<int> vatRatesIds)
  {
    VATRatesIds = vatRatesIds ?? throw new ArgumentNullException(nameof(vatRatesIds));

    return this;
  }
}
