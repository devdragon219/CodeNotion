using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using Xunit;
using Xunit.Abstractions;

namespace RealGimm.UnitTests.Core.Asst.EstateAggregate;

sealed file class ValidationData : TheoryData<Estate, bool>
{
  public static Estate ValidEstate1
  {
    get
    {
      var estate = new Estate();
      estate.SetStatus(EstateStatus.Operational);
      estate.SetType(EstateType.LandPlotBuildable);
      estate.SetOwnership(EstateOwnership.UndergroundOnly);
      estate.SetMainUsageType(new EstateMainUsageType());
      var eut = new EstateUsageType();
      eut.SetName("Name");
      eut.SetUsage(true, true, true, true);
      estate.SetUsageType(eut);
      estate.SetManagement(9, null);

      estate.SetInternalCode("Code");

      var address = new Address();
      address.SetType(AddressType.Primary);
      address.SetToponymy("Toponymy");
      address.SetCity("CityName", null);
      address.SetLocalPostCode("LocalPostCode");
      address.SetCounty("new country name", null);
      address.SetCountry("ITA", "Italy");
      address.SetNumbering("Numbering");

      estate.AddAddress(address);

      return estate;
    }
  }

  public static Estate ValidEstate2
  {
    get
    {
      var address = new Address();
      address.SetType(AddressType.Primary);
      address.SetToponymy("Toponymy");
      address.SetCity("CityName", null);
      address.SetLocalPostCode("LocalPostCode");
      address.SetCounty("new country name", null);
      address.SetCountry("ITA", "Italy");
      address.SetNumbering("Numbering");

      var estate = new Estate();
      estate.SetStatus(EstateStatus.Operational);
      estate.SetType(EstateType.LandPlotBuildable);
      estate.SetOwnership(EstateOwnership.UndergroundOnly);
      estate.SetMainUsageType(new EstateMainUsageType());
      var eut = new EstateUsageType();
      eut.SetName("Name");
      eut.SetUsage(true, true, true, true);
      estate.SetUsageType(eut);
      estate.SetManagement(10, null);

      estate.SetInternalCode("Code");
      estate.SetType(EstateType.Building);
      estate.SetStatus(EstateStatus.Operational);
      estate.SetOwnership(EstateOwnership.Leasing);
      estate.SetManagement(7, null);
      estate.SetSurfaceArea(100);
      estate.SetBuildYear(1999);
      estate.AddAddress(address);

      return estate;
    }
  }
  public static Estate InvalidEstate1
  {
    get
    {
      var estate = new Estate();

      return estate;
    }
  }
  public static Estate InvalidEstate2
  {
    get
    {
      var address = new Address();
      address.SetType(AddressType.OtherAddress);
      address.SetToponymy("Toponymy");
      address.SetCity("CityName", null);
      address.SetLocalPostCode("LocalPostCode");
      address.SetCountry("CountryName", null);
      address.SetCountry("ITA", "Italy");
      address.SetNumbering("Numbering");

      var estate = new Estate();

      estate.SetInternalCode("Code");
      estate.SetType(EstateType.Building);
      estate.SetStatus(EstateStatus.Operational);
      estate.SetOwnership(EstateOwnership.Leasing);
      estate.SetManagement(7, null);
      estate.SetMainUsageType(new EstateMainUsageType());
      var eut = new EstateUsageType();
      eut.SetName("Name");
      eut.SetUsage(true, true, true, true);
      estate.SetUsageType(eut);
      estate.SetSurfaceArea(-1);
      estate.SetBuildYear(-1);
      estate.AddAddress(address);

      return estate;
    }
  }

  public ValidationData()
  {
    Add(ValidEstate1, true);
    Add(ValidEstate2, true);

    Add(InvalidEstate1, false);
    Add(InvalidEstate2, false);
  }
}

public class EstateTests
{
  private readonly ITestOutputHelper _output;

  public EstateTests(ITestOutputHelper output)
  {
    _output = output;
  }

  [Fact]
  public void Should_InitilizePropertiesCorrectly()
  {
    // Arrange
    var name = "Name";
    var status = EstateStatus.Operational;

    // Act
    var subject = new Estate();
    subject.SetName(name);
    subject.SetStatus(status);

    // Assert
    Assert.Equal(name, subject.Name);
    Assert.Equal(status, subject.Status);
  }

  [Theory]
  [ClassData(typeof(ValidationData))]
  public void Should_ValidateCorrectly(Estate estate, bool isValid)
  {
    // Act
    var errors = estate.Validate();

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
