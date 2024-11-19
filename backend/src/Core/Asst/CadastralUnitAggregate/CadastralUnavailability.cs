using System.ComponentModel.DataAnnotations;
using HotChocolate;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Asst.CadastralUnitAggregate;

public class CadastralUnavailability : EntityBase, IDateOnlyRanged
{
  [GraphQLIgnore]
  public CadastralUnit CadastralUnit { get; private set; } = default!;

  public DateOnly? Since { get; private set; }
  public DateOnly? Until { get; private set; }

  [MaxLength(StrFieldSizes.NOTES)]
  public string? Notes { get; private set; }
  
  public void SetData(DateOnly? since, DateOnly? until, string? notes)
  {
    Since = since;
    Until = until;
    Notes = notes;
  }
}
