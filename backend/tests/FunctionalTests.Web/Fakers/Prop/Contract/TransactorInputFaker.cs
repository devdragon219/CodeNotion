using RealGimm.Infrastructure.Prop.Data.Fakers;
using RealGimm.Infrastructure;
using RealGimm.Web.Prop.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Prop.Contract;

public sealed class TransactorInputFaker : BaseSeededFaker<TransactorInput>
{
  public required IDictionary<int, IEnumerable<int>> SubjectsWithAddresses { get; init; }

  public TransactorInputFaker()
  {
    CustomInstantiator(faker =>
    {
      var input = new TransactorInput();
      (input.SubjectId, input.AddressId, input.InvoiceAddressId) = TransactorFaker.PickSubjectAndAddresses(faker, SubjectsWithAddresses!);
      (input.Since, input.Until) = TransactorFaker.GenerateDateRange(faker);
      input.IsInvoiced = TransactorFaker.GenerateIsInvoiced(faker);
      input.TransactionSharePercent = TransactorFaker.GenerateTransactionSharePercent(faker);
      input.Type = TransactorFaker.PickType(faker);

      return input;
    });
  }
}
