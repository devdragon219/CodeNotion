using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.CrossModule;
using RealGimm.Core.Prop.AdministrationAggregate;
using RealGimm.Infrastructure;
using RealGimm.Infrastructure.Prop.Data.Fakers;
using RealGimm.Web.Prop.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Prop;

public sealed class AdministrationInputFaker : BaseSeededFaker<AdministrationInput>
{
  public required IEnumerable<int> EstatesIds { get; init; }
  public required IEnumerable<Subject> Subjects { get; init; }

  public AdministrationInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var input = new AdministrationInput();
      input.EstateId = AdministrationFaker.PickRandomEstateId(faker, EstatesIds!);

      var (subjectId, bankAccountId) = AdministrationFaker.PickRandomAdministrator(faker, Subjects!);
      input.AdministratorSubjectId = subjectId;
      input.AdministratorBankAccountId = bankAccountId;

      input.AdministrationType = AdministrationFaker.PickRandomAdministrationType(faker);
      input.PaymentType = AdministrationFaker.PickRandomPaymentType(faker);

      (input.Since, input.Until) = AdministrationFaker.GenerateDateRange(faker);

      input.IsPaymentDataIncluded = AdministrationFaker.GenerateIsPaymentDataIncluded(faker);

      return input;
    });
  }
}
