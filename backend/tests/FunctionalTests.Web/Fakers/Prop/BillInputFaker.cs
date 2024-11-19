using RealGimm.Infrastructure;
using RealGimm.Infrastructure.Prop.Data.Fakers;
using RealGimm.Web.Prop.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Prop;

public sealed class BillInputFaker : BaseSeededFaker<BillInput>
{
  public required IEnumerable<Core.Prop.ContractAggregate.Contract> Contracts { get; init; }
  public required BillRowInputFaker BillRowInputFaker { get; init; }

  public BillInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var input = new BillInput();
      input.IsOccupiedWithoutRight = BillFaker.GenerateIsOccupiedWithoutRight(faker);
      input.IsInvoiced = BillFaker.GenerateIsInvoiced(faker);
      input.TransactorPaymentType = BillFaker.GenerateTransactorPaymentType(faker);
      input.EmissionType = BillFaker.GenerateEmissionType(faker);
      input.ContractBillingPeriod = BillFaker.GenerateContractBillingPeriod(faker);
      input.TotalAmount = BillFaker.GenerateTotalAmount(faker);

      (input.Year, _, _, _, _) = BillFaker.GenerateDates(faker);

      var (transactorSubjectId, counterpartSubjectId, _, _) = BillFaker.GenerateContractData(Contracts!, faker);
      input.TransactorSubjectId = transactorSubjectId;
      input.MainCounterpartSubjectId = counterpartSubjectId;

      input.BillRows = BillRowInputFaker!.Generate(faker.Random.Int(1, 3)).ToArray();

      return input;
    });
  }
}
