using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Econ.TaxCreditAggregate;

public class TaxCredit : EntityBase, IAggregateRoot, ISoftDeletable
{
  public int ManagementSubjectId { get; private set; }

  [Required, FuzzySearchable, MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string TaxCode { get; private set; } = default!;

  [FuzzySearchable, MaxLength(StrFieldSizes.DESCRIPTION)]
  public string? Description { get; private set; }

  public DateTime? DeletionDate { get; private set; }

  [MaxLength(StrFieldSizes.NOTES)]
  public string? Notes { get; private set; }

  public NullSafeCollection<Operation> Operations { get; private set; } = [];
  
  public void MarkAsDeleted() => DeletionDate = DateTime.UtcNow;

  public void SetManagementSubjectId(int managementSubjectId) => ManagementSubjectId = managementSubjectId;

  public void SetTaxCode(string taxCode) => TaxCode = taxCode;

  public void SetDescription(string? description) => Description = description;

  public void SetNotes(string? notes) => Notes = notes;

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (string.IsNullOrWhiteSpace(TaxCode))
    {
      yield return ErrorCode.CodeIsNullOrEmptyString.ToValidationError();
    }

    foreach (var operation in Operations)
    {
      foreach (var validationError in operation.Validate())
      {
        yield return validationError;
      }
    }
  }
}
