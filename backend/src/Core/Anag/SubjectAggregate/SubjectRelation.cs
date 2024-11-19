using System.ComponentModel.DataAnnotations;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Anag.SubjectAggregate;

public class SubjectRelation : EntityBase, IDateOnlyRanged
{
  public Subject Main { get; private set; } = default!;
  public int MainId { get; private set; }
  public Subject Subordinate { get; private set; } = default!;
  public int SubordinateId { get; private set; }
  public SubjectRelationType RelationType { get; private set; }
  public DateTime CreationDate { get; private set; } = DateTime.UtcNow;
  public DateOnly? Since { get; private set; }
  public DateOnly? Until { get; private set; }
  public OfficerType? OfficerRelationType { get; private set; }
  public CompanyGroup? GroupRelationType { get; private set; }

  [FuzzySearchable, MaxLength(StrFieldSizes.NOTES)]
  public string? Notes { get; private set; }

  public void SetMain(Subject m)
  {
    Main = m;
  }

  public void SetSubordinate(Subject s)
  {
    Subordinate = s;
  }

  public void SetRelationType(SubjectRelationType type)
  {
    RelationType = type;
  }

  public void SetOfficerRelationType(OfficerType officerType)
  {
    OfficerRelationType = officerType;
  }

  public void SetGroupRelationType(CompanyGroup companyGroup)
  {
    GroupRelationType = companyGroup;
  }

  public void SetNotes(string? notes)
  {
    Notes = string.IsNullOrEmpty(notes) ? null : notes;
  }

  public void SetTimeRange(DateOnly? since, DateOnly? until)
  {
    Since = since;
    Until = until;
  }

  public override string ToString()
  {
    return $"MainId: {MainId}, SubordinateId: {SubordinateId}, RelationType: {RelationType}, "
      + $"GroupRelationType: {GroupRelationType}, OfficerRelationType: {OfficerRelationType}, CreationDate: {CreationDate}";
  }
}
