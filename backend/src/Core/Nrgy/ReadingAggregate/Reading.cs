using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.Core.Nrgy.UtilityServiceAggregate;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Nrgy.ReadingAggregate;

public class Reading : EntityBase, IAggregateRoot
{
  public UtilityService UtilityService { get; private set; } = default!;

  [FuzzySearchable, MaxLength(StrFieldSizes.NOTES)]
  public string? Notes { get; private set; }

  public DateTime ReadingTimestamp { get; private set; }
  public bool IsEstimated { get; private set; }
  public NullSafeCollection<ReadingValue> Values { get; private set; } = new();

  public void SetData(DateTime timestamp, bool isEstimated, string? notes)
  {
    Notes = notes;
    ReadingTimestamp = timestamp;
    IsEstimated = isEstimated;
  }

  public void SetService(UtilityService utilityService)
    => UtilityService = utilityService ?? throw new ArgumentNullException(nameof(utilityService));

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    foreach (var value in Values)
    {
      foreach (var validationError in value.Validate())
      {
        yield return validationError;
      }
    }
  }
}
