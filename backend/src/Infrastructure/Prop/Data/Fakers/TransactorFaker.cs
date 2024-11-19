using Bogus;
using RealGimm.Core.CrossModule;
using RealGimm.Core.Prop.ContractAggregate;

namespace RealGimm.Infrastructure.Prop.Data.Fakers;

public sealed class TransactorFaker : BaseSeededFaker<Transactor>
{
  public required IDictionary<int, IEnumerable<int>> SubjectsWithAddresses { get; init; }

  public TransactorFaker()
  {
    CustomInstantiator(faker =>
    {
      var transactor = new Transactor();
      
      var (since, until) = GenerateDateRange(faker);
      transactor.SetSince(since);
      transactor.SetUntil(until);

      var (subjectId, addressId, invoiceAddressid) = PickSubjectAndAddresses(faker, SubjectsWithAddresses!);
      transactor.SetSubjectId(subjectId);
      transactor.SetAddressId(addressId);
      transactor.SetInvoiceAddressId(invoiceAddressid);
      transactor.SetIsInvoiced(GenerateIsInvoiced(faker));
      transactor.SetTransactionSharePercent(GenerateTransactionSharePercent(faker));
      transactor.SetPaymentType(PickType(faker));

      return transactor;
    });

    FinishWith((_, transactor) =>
    {
      var validationErrors = transactor.Validate().ToList();
      if (validationErrors.Count > 0)
      {
        var errorMessages = string.Join(", ", validationErrors.Select(error => error.ErrorMessage));
        throw new InvalidOperationException($"Invalid {nameof(Transactor)} entity! Errors: {errorMessages}");
      }
    });
  }


  public static (int SubjectId, int AddressId, int InvoiceAddressId) PickSubjectAndAddresses(
    Faker faker,
    IDictionary<int, IEnumerable<int>> subjectsWithAddresses)
  {
    var subjectId = faker.PickRandom<int>(subjectsWithAddresses.Keys);
    var addressId = faker.PickRandom(subjectsWithAddresses[subjectId]);
    var invoiceAddressId = faker.PickRandom(subjectsWithAddresses[subjectId]);

    return (subjectId, addressId, invoiceAddressId);
  }

  public static (DateOnly Since, DateOnly? Until) GenerateDateRange(Faker faker)
  {
    var since = faker.Date.PastDateOnly(refDate: new DateOnly(2024, 01, 01));

    return (since, null);
  }
  
  public static bool GenerateIsInvoiced(Faker faker) => faker.Random.Bool();

  public static double GenerateTransactionSharePercent(Faker faker) =>
    double.Round(faker.Random.Double(5, 10), 2);
    
  public static PaymentType PickType(Faker faker) => faker.PickRandom<PaymentType>();
}
