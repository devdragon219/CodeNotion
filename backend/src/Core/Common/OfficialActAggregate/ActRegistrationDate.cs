using RealGimm.SharedKernel;

namespace RealGimm.Core.Common.OfficialActAggregate;

public class ActRegistrationDate : EntityBase
{
  public RegistrationDateType DateType { get; private set; }
  public DateOnly Value { get; private set; }

  public ActRegistrationDate(RegistrationDateType dateType, DateOnly value)
  {
    Value = value;
    DateType = dateType;
  }

  public void SetValue(DateOnly value) => Value = value;
}
