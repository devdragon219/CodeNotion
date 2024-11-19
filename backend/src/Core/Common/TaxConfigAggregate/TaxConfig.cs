using System.ComponentModel.DataAnnotations;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Common.TaxConfigAggregate;

public class TaxConfig : EntityBase, IAggregateRoot
{
  public Guid TaxCalculator { get; private set; }
  public int Year { get; private set; }

  [MaxLength(StrFieldSizes.INTERNAL_CODE)]
  public string Table { get; private set; } = default!;

  [MaxLength(StrFieldSizes.NAME)]
  public string? GroupingName { get; private set; }

  public Guid? GroupingReference { get; private set; }
  
  public NullSafeCollection<TaxConfigSubValue> SubValues { get; private set; } = [];

  public void SetReferenceData(
    Guid calculator,
    int year,
    string table)
  {
    TaxCalculator = calculator;
    Year = year;
    Table = table;
  }

  public void SetGroupingData(string? name, Guid? reference)
  {
    GroupingName = name;
    GroupingReference = reference;
  }
}
