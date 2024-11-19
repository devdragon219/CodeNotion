using HotChocolate.Types;
using RealGimm.SharedKernel.Attributes;

namespace RealGimm.Core.CrossModule;

[InterfaceType]
public interface IAddress
{
  [FuzzySearchable]
  public string? CityName { get; }
  public Guid? CityReference { get; }

  [FuzzySearchable]
  public string? CountyName { get; }
  public Guid? CountyReference { get; }

  [FuzzySearchable]
  public string? RegionName { get; }
  public Guid? RegionReference { get; }

  [FuzzySearchable]
  public string? CountryName { get; }

  public string? CountryISO { get; }

  [FuzzySearchable]
  public string? Toponymy { get; }

  public string? Numbering { get; }

  public string? LocalPostCode { get; }

  [FuzzySearchable]
  public string? Notes { get; }

  public DateTime CreationDate { get; }
}