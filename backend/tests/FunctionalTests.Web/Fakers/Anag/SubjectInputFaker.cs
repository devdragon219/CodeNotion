using Bogus;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Common;
using RealGimm.Infrastructure;
using RealGimm.Web.Anag.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Anag;

public abstract class SubjectInputFaker<TInput> : BaseSeededFaker<TInput>
  where TInput : SubjectInput, new()
{
  protected int _generatedInputsCount = 0;

  protected SubjectInputFaker() : base(seed: 1)
  {
    CustomInstantiator(Generate);

    FinishWith((_, input) =>
    {
      EnsureValid(input);
      _generatedInputsCount++;
    });
  }

  protected virtual TInput Generate(Faker faker)
  {
    var input = new TInput();
    input.EntryStatus = EntryStatus.Working;
    input.InternalCode = $"S{(_generatedInputsCount + 1).ToString().PadLeft(7, '0')}";
    input.ExternalSourceCode = faker.Random.AlphaNumeric(10).ToUpperInvariant();
    input.CustomPersonType = null;
    input.CustomSubjectStatus = null;
    input.ClosureDate = null;
    input.Addresses = [new AddressInputFaker().Generate() with { AddressType = AddressType.LegalResidential }];
    input.Contacts = [];
    input.BankAccounts = [];
    input.TaxStatuses = [];
    input.Officers = [];
    input.CategoriesIds = [];

    return input;
  }
}
