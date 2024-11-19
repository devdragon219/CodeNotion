using RealGimm.Core.Asst.EstateAggregate;
using Xunit;
using Xunit.Abstractions;

namespace RealGimm.UnitTests.Core.Asst.EstateAggregate;

sealed file class ValidationData : TheoryData<EstateTotalMarketValue, bool>
{
  public static EstateTotalMarketValue ValidTotalMarketValue1
  {
    get
    {
      var totalMarketValue = new EstateTotalMarketValue();
      totalMarketValue.SetArea(50);
      var mv = new EstateMarketValue();
      mv.SetData(EstateMarketValueType.MaxValuePerSqM, 1000m);
      totalMarketValue.AddMarketValue(mv);
      var mvc = new EstateTotalMarketValueCoefficient();
      mvc.SetData(EstateTotalMarketValueCoefficientType.Obsolescence, 0.1m);
      totalMarketValue.AddCoefficient(mvc);

      return totalMarketValue;
    }
  }
  public static EstateTotalMarketValue ValidTotalMarketValue2
  {
    get
    {
      var totalMarketValue = new EstateTotalMarketValue();
      totalMarketValue.SetArea(50);


      var mv = new EstateMarketValue();
      mv.SetData(EstateMarketValueType.MaxValuePerSqM, 2000m);
      totalMarketValue.AddMarketValue(mv);

      mv = new EstateMarketValue();
      mv.SetData(EstateMarketValueType.MinValuePerSqM, 1000m);
      totalMarketValue.AddMarketValue(mv);


      var mvc = new EstateTotalMarketValueCoefficient();
      mvc.SetData(EstateTotalMarketValueCoefficientType.Age, 0.7m);
      totalMarketValue.AddCoefficient(mvc);

      mvc = new EstateTotalMarketValueCoefficient();
      mvc.SetData(EstateTotalMarketValueCoefficientType.Obsolescence, 0.1m);
      totalMarketValue.AddCoefficient(mvc);

      return totalMarketValue;
    }
  }
  public static EstateTotalMarketValue InvalidTotalMarketValue1
  {
    get
    {
      var mv = new EstateTotalMarketValue();
      mv.SetArea(0);
      return mv;
    }
  }

  public static EstateTotalMarketValue InvalidTotalMarketValue2
  {
    get
    {
      var mv = new EstateTotalMarketValue();
      mv.SetArea(-1);
      return mv;
    }
  }

  public static EstateTotalMarketValue InvalidTotalMarketValue3
  {
    get
    {
      var mv = new EstateTotalMarketValue();
      mv.SetArea(50);
      return mv;
    }
  }

  public static EstateTotalMarketValue InvalidTotalMarketValue4
  {
    get
    {
      var totalMarketValue = new EstateTotalMarketValue();
      totalMarketValue.SetArea(50);


      var mv = new EstateMarketValue();
      mv.SetData(EstateMarketValueType.MaxValuePerSqM, 2000m);
      totalMarketValue.AddMarketValue(mv);

      mv = new EstateMarketValue();
      mv.SetData(EstateMarketValueType.MinValuePerSqM, -1000m);
      totalMarketValue.AddMarketValue(mv);


      var mvc = new EstateTotalMarketValueCoefficient();
      mvc.SetData(EstateTotalMarketValueCoefficientType.Age, -0.7m);
      totalMarketValue.AddCoefficient(mvc);

      mvc = new EstateTotalMarketValueCoefficient();
      mvc.SetData(EstateTotalMarketValueCoefficientType.Obsolescence, 0.1m);
      totalMarketValue.AddCoefficient(mvc);

      return totalMarketValue;
    }
  }

  public ValidationData()
  {
    Add(ValidTotalMarketValue1, true);
    Add(ValidTotalMarketValue2, true);

    Add(InvalidTotalMarketValue1, false);
    Add(InvalidTotalMarketValue2, false);
    Add(InvalidTotalMarketValue3, false);
    Add(InvalidTotalMarketValue4, false);
  }
}

public class EstateTotalMarketValueTests
{
  private readonly ITestOutputHelper _output;

  public EstateTotalMarketValueTests(ITestOutputHelper output)
  {
    _output = output;
  }

  [Fact]
  public void Should_InitilizePropertiesCorrectly()
  {
    // Arrange
    var totalSurfaceAreaSqM = 50;

    // Act
    var marketValue = new EstateTotalMarketValue();
    marketValue.SetArea(50);

    // Assert
    Assert.Equal(totalSurfaceAreaSqM, marketValue.TotalSurfaceAreaSqM);
  }

  [Theory]
  [ClassData(typeof(ValidationData))]
  public void Should_ValidateCorrectly(EstateTotalMarketValue totalMarketValue, bool isValid)
  {
    // Act
    var errors = totalMarketValue.Validate();

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
