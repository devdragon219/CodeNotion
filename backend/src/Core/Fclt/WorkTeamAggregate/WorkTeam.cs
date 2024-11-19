using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Fclt.WorkTeamAggregate;

public class WorkTeam : EntityBase, IAggregateRoot, IInternallyCoded
{
  [FuzzySearchable, MaxLength(StrFieldSizes.INTERNAL_CODE), Required]
  public string InternalCode { get; private set; } = default!;
  
  [FuzzySearchable, MaxLength(StrFieldSizes.DESCRIPTION), Required]
  public string Description { get; private set; } = default!;

  public int ProviderSubjectId { get; private set; }
  public int LeaderUserId { get; private set; }
  public DateOnly InsertionDate { get; private set; }
  public NullSafeCollection<Worker> Workers { get; private set; } = new();

  public void SetInternalCode(string internalCode) => InternalCode = internalCode;

  public void SetDescription(string name) => Description = name;
  
  public void SetProviderSubjectId(int providerSubjectId) => ProviderSubjectId = providerSubjectId;
  
  public void SetLeaderUserId(int leaderUserId) => LeaderUserId = leaderUserId;
  
  public void SetInsertionDate(DateOnly insertionDate) => InsertionDate = insertionDate;

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (string.IsNullOrWhiteSpace(Description))
    {
      yield return ErrorCode.DescriptionIsNullOrEmptyString.ToValidationError();
    }

    if (string.IsNullOrWhiteSpace(InternalCode))
    {
      yield return ErrorCode.InternalCodeIsNullOrEmptyString.ToValidationError();
    }

    foreach (var workMan in Workers)
    {
      foreach (var validationError in workMan.Validate())
      {
        yield return validationError;
      }
    }
  }
}
