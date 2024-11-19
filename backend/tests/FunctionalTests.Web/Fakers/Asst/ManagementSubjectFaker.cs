using Bogus;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.FunctionalTests.Web.Fakers.Anag;
using RealGimm.FunctionalTests.Web.Tests.Asst.EstateUnitTests;
using RealGimm.Infrastructure;

namespace RealGimm.FunctionalTests.Web.Fakers.Asst;

public sealed class ManagementSubjectFaker : BaseSeededFaker<ManagementSubject>
{
  public AddressFaker? AddressFaker { get; init; }

  public ManagementSubjectFaker() : base(seed: 1)
  {
    // TODO: replace old static method call with actual generation logic
    CustomInstantiator(faker =>
    {
      var managementSubject = EstateUnitMutationTest.CreateManagementSubject(id: default);

      if (AddressFaker is not null)
      {
        managementSubject.AddAddress(AddressFaker);
      }

      var bankAccount = new BankAccount();
      bankAccount.SetType(BankAccountType.Main);
      bankAccount.SetReference(faker.Finance.Iban(), BankAccountCodeType.IBAN);
      bankAccount.SetHolder(faker.Finance.AccountName());

      managementSubject.AddBankAccount(bankAccount);

      return managementSubject;
    });
  }
}
