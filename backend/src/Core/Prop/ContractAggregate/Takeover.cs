namespace RealGimm.Core.Prop.ContractAggregate;

public class Takeover : EntityBase
{
  public int OriginalSubjectId { get; private set; }
  public int NewSubjectId { get; private set; }
  public int? LegalRepresentativeSubjectId { get; private set; }
  public DateOnly TakeoverDate { get; private set; }
  public DateOnly EffectiveDate { get; private set; }
  public TakeoverType Type { get; private set; }

  public void SetOriginalSubjectId(int originalSubjectId) => OriginalSubjectId = originalSubjectId;

  public void SetNewSubjectId(int newSubjectId) => NewSubjectId = newSubjectId;

  public void SetLegalRepresentativeSubjectId(int? legalRepresentativeSubjectId)
    => LegalRepresentativeSubjectId = legalRepresentativeSubjectId;

  public void SetTakeoverDate(DateOnly takeoverDate) => TakeoverDate = takeoverDate;

  public void SetEffectiveDate(DateOnly effectiveDate) => EffectiveDate = effectiveDate;

  public void SetType(TakeoverType type) => Type = type;
}
