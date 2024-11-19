using System.ComponentModel.DataAnnotations;
using RealGimm.SharedKernel;

namespace RealGimm.Core.Common.OfficialActAggregate;

public class ActRegistrationField : EntityBase
{
  public RegistrationFieldType FieldType { get; private set; }

  [MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? Value { get; private set; }

  public ActRegistrationField(RegistrationFieldType fieldType, string? value)
  {
    Value = value;
    FieldType = fieldType;
  }

  public void SetValue(string? value) => Value = value;
}
