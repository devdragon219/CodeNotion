using RealGimm.Infrastructure;
using RealGimm.Infrastructure.Prop.Data.Fakers;
using RealGimm.Web.Prop.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Prop;

public sealed class RegistrationOfficeInputFaker : BaseSeededFaker<RegistrationOfficeInput>
{
  private int _generatedInputsCount = 0;

  public RegistrationOfficeInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var regOffice = new RegistrationOfficeInput()
      {
        Description = RegistrationOfficeFaker.GenerateDescription(faker),
        ExternalCode = RegistrationOfficeFaker.GenerateInternalCode(number: _generatedInputsCount + 1),
        CityId = RegistrationOfficeFaker.GenerateCityId(faker)
      };

      return regOffice;
    });

    FinishWith((_, _) => _generatedInputsCount++);
  }
}
