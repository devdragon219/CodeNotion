using System.ComponentModel.DataAnnotations;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Common.RevaluationDataAggregate;

public class RevaluationData : EntityBase, IAggregateRoot
{
  public int Year { get; private set; }
  public int Month { get; private set; }
  public Guid DataProvider { get; private set; }
  [MaxLength(StrFieldSizes.ISO_COUNTRY), Required]
  public string CountryISO3 { get; private set; } = default!;
  public int BaseYear { get; private set; }
  public decimal RevaluationIndex { get; private set; }

  public void SetData(int year, int month, int baseYear, Guid dataProvider, string countryIso3, decimal index)
  {
    Year = year;
    Month = month;
    BaseYear = baseYear;
    DataProvider = dataProvider;
    CountryISO3 = countryIso3;
    RevaluationIndex = index;
  }

  public void SetRevaluationIndex(decimal revaluationIndex) => RevaluationIndex = revaluationIndex;
}
