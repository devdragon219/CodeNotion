using System.ComponentModel.DataAnnotations;
using HotChocolate;
using System.ComponentModel.DataAnnotations.Schema;
using RealGimm.SharedKernel;
using Ardalis.Result;

namespace RealGimm.Core.Asst.CadastralUnitAggregate;

public class CadastralCoordinates : EntityBase
{
  [GraphQLIgnore]
  public CadastralUnit CadastralUnit { get; private set; } = default!;

  [MaxLength(StrFieldSizes.NOTES)]
  public string? Notes { get; private set; }
  
  [MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? Level1 { get; private set; }
  
  [MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? Level2 { get; private set; }
  
  [MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? Level3 { get; private set; }
  
  [MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? Level4 { get; private set; }
  
  [MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? Level5 { get; private set; }
  
  public CoordinateType CoordinateType { get; private set; } = CoordinateType.Generic_Override;

  [MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? ITTavPartita { get; private set; }
  [MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? ITTavCorpo { get; private set; }
  [MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? ITTavPorzione { get; private set; }

  [NotMapped]
  public bool HasITTavData => ITTavCorpo is not null || ITTavPartita is not null || ITTavPorzione is not null;
  
  [MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? UnmanagedOverride { get; private set; }

  public void SetData(CoordinateType type, string? notes, string? level1, string? level2, string? level3, string? level4, string? level5, string? unmanagedOverride)
  {
    Notes = notes;
    CoordinateType = type;
    Level1 = level1;
    Level2 = level2;
    Level3 = level3;
    Level4 = level4;
    Level5 = level5;
    UnmanagedOverride = unmanagedOverride;
  }

  public void SetITTavData(string? partita, string? corpo, string? porzione)
  {
    ITTavPartita = partita;
    ITTavCorpo = corpo;
    ITTavPorzione = porzione;
  }

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (HasITTavData)
    {
      if (string.IsNullOrWhiteSpace(ITTavPartita))
      {
        yield return ErrorCode.CadastralCoordinatesITTavPartita.ToValidationError();
      }

      if (string.IsNullOrWhiteSpace(ITTavCorpo))
      {
        yield return ErrorCode.CadastralCoordinatesITTavCorpo.ToValidationError();
      }

      if (string.IsNullOrWhiteSpace(ITTavPorzione))
      {
        yield return ErrorCode.CadastralCoordinatesITTavPorzione.ToValidationError();
      }
    }
  }
}
