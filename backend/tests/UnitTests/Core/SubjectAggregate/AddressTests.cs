using RealGimm.Core.Anag.SubjectAggregate;
using Xunit;
using Xunit.Abstractions;

namespace RealGimm.UnitTests.Core.SubjectAggregate;

sealed file class ValidationData : TheoryData<Address, bool>
{
  public static Address ValidAddress1
  {
    get
    {
      var address = new Address();
      address.SetType(AddressType.LegalResidential);
      address.SetToponymy("Toponymy");
      address.SetCity("CityName", null);

      address.SetLocalPostCode("LocalPostCode");

      return address;
    }
  }
  public static Address ValidAddress2
  {
    get
    {
      var address = new Address();
      address.SetType(AddressType.Fiscal);
      address.SetToponymy("Toponymy");
      address.SetCity("CityName", null);
      address.SetLocalPostCode("LocalPostCode");
      address.SetNotes("Notes");
      address.SetCountry("CountryISO", null);
      address.SetCounty("CountyName", null);

      return address;
    }
  }
  public static Address InvalidAddress1
  {
    get
    {
      var address = new Address();
      address.SetType(AddressType.LegalResidential);
      address.SetToponymy("Toponymy");
      address.SetCity("cityName", null);
      return address;
    }
  }
  
  public static Address InvalidAddress2
  {
    get
    {
      var address = new Address();
      address.SetType(AddressType.LegalResidential);

      return address;
    }
  }

  public ValidationData()
  {
    Add(ValidAddress1, true);
    Add(ValidAddress2, true);

    Add(InvalidAddress1, false);
    Add(InvalidAddress2, false);
  }
}

public class AddressTests
{
  private readonly ITestOutputHelper _output;

  public AddressTests(ITestOutputHelper output)
  {
    _output = output;
  }

  [Fact]
  public void Should_InitilizeProperiesCorrectly()
  {
    // Arrange
    var addressType = AddressType.LegalResidential;
    var toponymy = "Toponomy";
    var cityName = "CityName";

    // Act
    var address = new Address();
    address.SetType(addressType);
    address.SetToponymy(toponymy);
    address.SetCity(cityName, null);


    // Assert
    Assert.Equal(addressType, address.AddressType);
    Assert.Equal(toponymy, address.Toponymy);
    Assert.Equal(cityName, address.CityName);
  }

  [Theory]
  [ClassData(typeof(ValidationData))]
  public void Should_ValidateCorrectly(Address address, bool isValid)
  {
    // Act
    var errors = address.Validate();

    // Assert
    if (isValid)
    {
      Assert.Empty(errors);
      return;
    }

    Assert.NotEmpty(errors);
    _output.WriteLine(string.Join(Environment.NewLine, errors.Select(error => error.ErrorMessage)));
  }
}
