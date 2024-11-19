using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;

namespace RealGimm.Core.Asst.CadastralUnitAggregate;

public class CadastralUnitInspection
{
  public DateOnly? Date { get; private set; }
  public DateOnly? ProtocolDate { get; private set; }

  [MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? ProtocolNumber { get; private set; }
  
  [MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? Heading { get; private set; }
  
  [MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? MacroZone { get; private set; }
  
  [MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? MicroZone { get; private set; }

  public bool IsHistoricalEstate { get; private set; }
  public bool IsDirectRestriction { get; private set; }

  public void SetIsHistoricalEstate(bool isHistoricalEstate) => IsHistoricalEstate = isHistoricalEstate;

  public void SetIsDirectRestriction(bool isDirectRestriction) => IsDirectRestriction = isDirectRestriction;

  public void SetDate(DateOnly? date) => Date = date;

  public void SetProtocolDate(DateOnly? protocolDate) => ProtocolDate = protocolDate;

  public void SetProtocolNumber(string? protocolNumber) => ProtocolNumber = protocolNumber;

  public void SetHeading(string? heading) => Heading = heading;

  public void SetMacroZone(string? macroZone) => MacroZone = macroZone;

  public void SetMicroZone(string? microZone) => MicroZone = microZone;

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (Date.HasValue && Date.Value.Year is < DataLimits.MIN_YEAR or > DataLimits.MAX_YEAR)
    {
      yield return ErrorCode.CadastralUnitInspectionInvalidDate.ToValidationError();
    }

    if (ProtocolDate.HasValue && ProtocolDate.Value.Year is < DataLimits.MIN_YEAR or > DataLimits.MAX_YEAR)
    {
      yield return ErrorCode.CadastralUnitInspectionInvalidProtocolDate.ToValidationError();
    }
  }
}
