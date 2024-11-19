using Bogus;
using RealGimm.Core.Prop.RegistrationOfficeAggregate;

namespace RealGimm.Infrastructure.Prop.Data.Fakers;

public sealed class RegistrationOfficeFaker : BaseSeededFaker<RegistrationOffice>
{
  private int _generatedRegOfficeCount = 0;

  public RegistrationOfficeFaker()
  {
    CustomInstantiator(faker =>
    {
      var regOffice = new RegistrationOffice();
      regOffice.SetDescription(GenerateDescription(faker));
      regOffice.SetExternalCode(GenerateInternalCode(number: _generatedRegOfficeCount + 1));
      regOffice.SetCity(GenerateCityId(faker));

      return regOffice;
    });

    FinishWith((_, regOffice) =>
    {
      var validationErrors = regOffice.Validate().ToList();
      if (validationErrors.Count > 0)
      {
        var errorMessages = string.Join(", ", validationErrors.Select(error => error.ErrorMessage));
        throw new InvalidOperationException($"Invalid {nameof(RegistrationOffice)} entity! Errors: {errorMessages}");
      }

      _generatedRegOfficeCount++;
    });
  }

  public static string? GenerateDescription(Faker faker) => faker.Lorem.Sentence(10, 3);
  
  public static string? GenerateInternalCode(int number) => $"RO{number.ToString().PadLeft(5, '0')}";
  
  public static int GenerateCityId(Faker faker) => faker.Random.Int(1, 1111);
}
