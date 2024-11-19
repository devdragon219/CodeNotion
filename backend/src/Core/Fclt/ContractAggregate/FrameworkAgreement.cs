using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.SharedKernel.Attributes;

namespace RealGimm.Core.Fclt.ContractAggregate;

public class FrameworkAgreement : EntityBase
{
  [FuzzySearchable, MaxLength(StrFieldSizes.EXTERNAL_CODE), Required]
  public string ExternalCode { get; private set; } = default!;

  [FuzzySearchable, MaxLength(StrFieldSizes.NOTES)]
  public string? Notes { get; private set; }

  public void SetExternalCode(string externalCode) => ExternalCode = externalCode;

  public void SetNotes(string? notes) => Notes = notes;

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (string.IsNullOrWhiteSpace(ExternalCode))
    {
      yield return ErrorCode.ExternalCodeIsNullOrEmptyString.ToValidationError();
    }
  }
}
