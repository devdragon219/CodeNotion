using RealGimm.Core.Asst.EstateAggregate;
using Xunit;
using Xunit.Abstractions;

namespace RealGimm.UnitTests.Core.Asst.EstateAggregate;

sealed file class ValidationData : TheoryData<EstateTotalMarketValueCoefficient, bool>
{
  public ValidationData()
  {
    Add(Make(EstateTotalMarketValueCoefficientType.Age, 0.1m), true);
    Add(Make(EstateTotalMarketValueCoefficientType.Obsolescence, 1m), true);

    Add(Make(EstateTotalMarketValueCoefficientType.Age, 0m), false);
    Add(Make(EstateTotalMarketValueCoefficientType.Obsolescence, -1m), false);
  }

  private static EstateTotalMarketValueCoefficient Make(EstateTotalMarketValueCoefficientType t, decimal v)
  {
    var etmvc = new EstateTotalMarketValueCoefficient();
    etmvc.SetData(t, v);
    return etmvc;
  }
}

public class EstateTotalMarketValueCoefficientTests
{
  private readonly ITestOutputHelper _output;

  public EstateTotalMarketValueCoefficientTests(ITestOutputHelper output)
  {
    _output = output;
  }

  [Fact]
  public void Should_InitilizePropertiesCorrectly()
  {
    // Arrange
    var type = EstateTotalMarketValueCoefficientType.Age;
    var value = 0.1m;

    // Act
    var coefficient = new EstateTotalMarketValueCoefficient();
    coefficient.SetData(type, value);

    // Assert
    Assert.Equal(type, coefficient.Type);
    Assert.Equal(value, coefficient.Value);
  }

  [Theory]
  [ClassData(typeof(ValidationData))]
  public void Should_ValidateCorrectly(EstateTotalMarketValueCoefficient coefficient, bool isValid)
  {
    // Act
    var errors = coefficient.Validate();

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
