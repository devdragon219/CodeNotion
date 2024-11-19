using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Common;
using Xunit;
using Xunit.Abstractions;

namespace RealGimm.UnitTests.Core.Asst.EstateAggregate;

sealed file class ValidationData : TheoryData<EstateMarketValue, bool>
{
  public ValidationData()
  {
    Add(Make(EstateMarketValueType.MaxValuePerSqM, 1000m), true);
    Add(Make(EstateMarketValueType.MinValuePerSqM, 1m), true);

    Add(Make(EstateMarketValueType.MinValuePerSqM, 0m), false);
    Add(Make(EstateMarketValueType.MinValuePerSqM, -1m), false);
  }

  private static EstateMarketValue Make(EstateMarketValueType t, decimal v) {
    var emv = new EstateMarketValue();
    emv.SetData(t, v);
    return emv;
  }
}

public class EstateMarketValueTests
{
  private readonly ITestOutputHelper _output;

  public EstateMarketValueTests(ITestOutputHelper output)
  {
    _output = output;
  }

  [Fact]
  public void Should_InitilizePropertiesCorrectly()
  {
    // Arrange
    var type = EstateMarketValueType.MaxValuePerSqM;
    var value = 1000m;

    // Act
    var marketValue = new EstateMarketValue();
    marketValue.SetData(type, value);

    // Assert
    Assert.Equal(type, marketValue.Type);
    Assert.Equal(value, marketValue.Value);
  }

  [Theory]
  [ClassData(typeof(ValidationData))]
  public void Should_ValidateCorrectly(EstateMarketValue marketValue, bool isValid)
  {
    // Act
    var errors = marketValue.Validate();

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
