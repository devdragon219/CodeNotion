using RealGimm.Infrastructure.Prop.Data.Fakers;
using RealGimm.Infrastructure;
using RealGimm.Web.Prop.Models;
using RealGimm.Core.Prop.BillItemTypeAggregate;

namespace RealGimm.FunctionalTests.Web.Fakers.Prop.Contract;

public sealed class OneshotAdditionInputFaker : BaseSeededFaker<OneshotAdditionInput>
{
  public IEnumerable<BillItemType> BillItemTypes { get; private set; } = [];
  public IEnumerable<int> AccountingItemsIds { get; private set; } = [];
  public IEnumerable<int> VATRatesIds { get; private set; } = [];

  public OneshotAdditionInputFaker()
  {
    CustomInstantiator(faker =>
    {
      var input = new OneshotAdditionInput
      {
        BillItemTypeId = OneshotAdditionFaker.PickBillItemType(faker, BillItemTypes).Id,
        StartDate = OneshotAdditionFaker.GenerateStartDate(faker),
        AccountingItemId = OneshotAdditionFaker.PickAccountingItemId(faker, AccountingItemsIds),
        VATRateId = OneshotAdditionFaker.PickVATRateId(faker, VATRatesIds),
        IsRentalRateVariation = OneshotAdditionFaker.GenerateIsRentalRateVariation(faker),
        Amount = OneshotAdditionFaker.GenerateAmount(faker),
        Installments = OneshotAdditionFaker.GenerateInstallments(faker),
        IsBoundToTermDay = OneshotAdditionFaker.GenerateIsBoundToTermDay(faker)
      };
      (input.TermStartDate, input.TermEndDate) = OneshotAdditionFaker.GenerateTermPeriod(faker);
      input.Notes = OneshotAdditionFaker.GenerateNotes(faker);

      return input;
    });
  }

  public OneshotAdditionInputFaker UseBillItemTypes(IEnumerable<BillItemType> billItemTypes)
  {
    BillItemTypes = billItemTypes ?? throw new ArgumentNullException(nameof(billItemTypes));

    return this;
  }

  public OneshotAdditionInputFaker UseAccountingItemsIds(IEnumerable<int> accountingItemsIds)
  {
    AccountingItemsIds = accountingItemsIds ?? throw new ArgumentNullException(nameof(accountingItemsIds));

    return this;
  }

  public OneshotAdditionInputFaker UseVATRatesIds(IEnumerable<int> vatRatesIds)
  {
    VATRatesIds = vatRatesIds ?? throw new ArgumentNullException(nameof(vatRatesIds));

    return this;
  }
}
