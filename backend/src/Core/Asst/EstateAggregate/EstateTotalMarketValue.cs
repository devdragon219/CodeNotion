using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Attributes;

namespace RealGimm.Core.Asst.EstateAggregate;

public class EstateTotalMarketValue
{
  public int TotalSurfaceAreaSqM { get; private set; }
  [FuzzySearchable, MaxLength(StrFieldSizes.NOTES)]
  public string? Notes { get; private set; }

  private readonly List<EstateTotalMarketValueCoefficient> _coefficients = new();
  private readonly List<EstateMarketValue> _marketValues = new();

  public IReadOnlyCollection<EstateTotalMarketValueCoefficient> Coefficients => _coefficients.AsReadOnly();
  public IReadOnlyCollection<EstateMarketValue> MarketValues => _marketValues.AsReadOnly();

  public void SetArea(int totalSurfaceAreaSqM)
  {
    TotalSurfaceAreaSqM = totalSurfaceAreaSqM;
  }

  public void Reset()
  {
    _coefficients.Clear();
    _marketValues.Clear();
  }

  public void SetNotes(string? notes)
  {
    Notes = notes;
  }

  public void AddCoefficient(EstateTotalMarketValueCoefficient coefficient)
  {
    ArgumentNullException.ThrowIfNull(coefficient);

    _coefficients.Add(coefficient);
  }

  public void RemoveCoefficient(EstateTotalMarketValueCoefficient coefficient)
  {
    ArgumentNullException.ThrowIfNull(coefficient);

    _coefficients.Remove(coefficient);
  }

  public void AddMarketValue(EstateMarketValue marketValue)
  {
    ArgumentNullException.ThrowIfNull(marketValue);

    _marketValues.Add(marketValue);
  }

  public void RemoveMarketValue(EstateMarketValue marketValue)
  {
    ArgumentNullException.ThrowIfNull(marketValue);

    _marketValues.Remove(marketValue);
  }

  public IReadOnlyDictionary<EstateMarketValueType, decimal> Calculate()
  {
    var results = new Dictionary<EstateMarketValueType, decimal>();

    foreach (var value in MarketValues)
    {
      var result = value.Value * TotalSurfaceAreaSqM * Coefficients.Sum(coefficient => coefficient.Value);
      results.Add(value.Type, result);
    }

    return results.AsReadOnly();
  }

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (TotalSurfaceAreaSqM <= 0)
    {
      yield return ErrorCode.TotalSurfaceAreaSqMLessThanOrEqualZero.ToValidationError();
    }

    if (_coefficients.Count == 0)
    {
      yield return ErrorCode.CoefficientsIsEmptyCollection.ToValidationError();
    }

    foreach (var coefficient in _coefficients)
    {
      foreach (var validationError in coefficient.Validate())
      {
        yield return validationError;
      }
    }

    if (_coefficients.DistinctBy(value => value.Type).Count() != _coefficients.Count)
    {
      yield return ErrorCode.DuplicatedCoefficients.ToValidationError();
    }

    if (_coefficients.Sum(coefficient => coefficient.Value) >= 1)
    {
      yield return ErrorCode.CoefficientsSumGreaterThan1.ToValidationError();
    }

    if (_marketValues.Count == 0)
    {
      yield return ErrorCode.MarketValuesIsEmptyCollection.ToValidationError();
    }

    foreach (var marketValue in _marketValues)
    {
      foreach (var validationError in marketValue.Validate())
      {
        yield return validationError;
      }
    }

    if (_marketValues.DistinctBy(value => value.Type).Count() != _marketValues.Count)
    {
      yield return ErrorCode.DuplicatedMarketValues.ToValidationError();
    }
  }
}
