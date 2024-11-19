using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Econ.TaxCreditAggregate;

namespace RealGimm.Infrastructure.Econ.Data.Fakers;

public sealed class TaxCreditFaker : BaseSeededFaker<TaxCredit>
{
  public required IEnumerable<ManagementSubject> ManagementSubjects { get; set; }

  public TaxCreditFaker()
  {
    CustomInstantiator(faker =>
    {
      var managementSubject = faker.PickRandom(ManagementSubjects);

      var taxCredit = new TaxCredit();
      taxCredit.SetManagementSubjectId(managementSubject.Id);
      taxCredit.SetTaxCode(faker.Random.String2(10));
      taxCredit.SetDescription(faker.Lorem.Sentence());
      taxCredit.SetNotes(faker.Lorem.Sentence());

      var initialOperation = new Operation();
      initialOperation.SetDate(faker.Date.PastDateOnly(refDate: new DateOnly(2024, 01, 01)));
      initialOperation.SetAmount(faker.Finance.Amount(1000, 10_000));

      taxCredit.Operations.Add(initialOperation);

      var operationsCount = faker.Random.Int(1, 20);
      for (int i = 1; i < operationsCount; i++)
      {
        var totalAmount = taxCredit.Operations.Sum(operation => operation.Amount);

        var operation = new Operation();
        operation.SetDate(faker.Date.SoonDateOnly(days: 30, refDate: taxCredit.Operations[i - 1].Date));
        
        operation.SetAmount(
          (totalAmount > 0 && faker.Random.Bool())
            ? faker.Finance.Amount(-totalAmount, -1)
            : faker.Finance.Amount(1, 10_000));

        taxCredit.Operations.Add(operation);
      }

      return taxCredit;
    });

    FinishWith((_, taxCredit) => EnsureValid(taxCredit));
  }
}
