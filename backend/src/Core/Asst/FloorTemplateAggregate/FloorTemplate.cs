using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Asst.FloorTemplateAggregate;

public class FloorTemplate : EntityBase, IAggregateRoot
{
  [FuzzySearchable, MaxLength(StrFieldSizes.NAME)]
  public string Name { get; private set; }

  public float Position { get; private set; }
  public Guid Guid { get; private set; }

  public FloorTemplate(string name, float position)
  {
    Name = name;
    Position = position;
    Guid = Guid.NewGuid();
  }

  public void SetName(string name) => Name = name;

  public void SetPosition(float position) => Position = position;

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (string.IsNullOrWhiteSpace(Name))
    {
      yield return ErrorCode.FloorNameIsNullOrEmptyString.ToValidationError();
    }
  }
}
