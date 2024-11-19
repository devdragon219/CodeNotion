using RealGimm.Core.Prop.BillItemTypeAggregate;
using RealGimm.Infrastructure;
using RealGimm.Infrastructure.Prop.Data.Fakers;
using RealGimm.Web.Prop.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Prop;

public sealed class BillRowInputFaker : BaseSeededFaker<BillRowInput>
{
  public required IEnumerable<int> VatRateIds { get; init; }
  public required IEnumerable<BillItemType> BillItemTypes { get; init; }

  public BillRowInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var input = new BillRowInput
      {
        VATRateId = BillRowFaker.PickRandom(VatRateIds!, faker),
        Amount = BillRowFaker.GenerateAmount(faker),
        Notes = BillRowFaker.GenerateNotes(faker),
        BillItemTypeId = BillRowFaker.PickRandomBillItemType(BillItemTypes!, faker).Id
      };

      return input;
    });
  }
}
