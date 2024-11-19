using System.ComponentModel.DataAnnotations;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Common.CostCentreAggregate;

public class CostCentre : EntityBase, IAggregateRoot, IInternallyCoded, IDateOnlyRanged
{
  [MaxLength(StrFieldSizes.DESCRIPTION), Required, FuzzySearchable]
  public string Description { get; private set; } = default!;

  [MaxLength(StrFieldSizes.INTERNAL_CODE), Required, FuzzySearchable]
  public string InternalCode { get; private set; } = default!;

  [MaxLength(StrFieldSizes.EXTERNAL_CODE), FuzzySearchable]
  public string ExternalCode { get; private set; } = default!;

  public int ManagementSubjectId { get; private set; }

  public DateOnly? Since { get; private set; }

  public DateOnly? Until { get; private set; }

  public void SetCodes(string internalCode, string externalCode)
  {
    InternalCode = internalCode;
    ExternalCode = externalCode;
  }

  public void SetValidity(DateOnly? since, DateOnly? until)
  {
    Since = since;
    Until = until;
  }

  public void SetDescription(string description)
  {
    Description = description;
  }

  public void SetManagementSubject(int managementSubjectId) => ManagementSubjectId = managementSubjectId;
}
