using HotChocolate.Types;
using RealGimm.SharedKernel.Attributes;

namespace RealGimm.Core.CrossModule;

[InterfaceType]
public interface IContact
{
  ContactType ContactType { get; }
  [FuzzySearchable]
  string? ContactInfo { get; }
  ContactInfoType ContactInfoType { get; }
  [FuzzySearchable]
  public string? Notes { get; }
  public DateTime CreationDate { get; }
}