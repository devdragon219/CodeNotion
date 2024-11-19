using RealGimm.Core.Common.TaxConfigAggregate;

namespace RealGimm.Core.Taxes.ItaILIA;

public class ItaILIAConfiguration : TaxConfigurationBase
{
  public const string TBL_RATES_BY_CITY = "rates-by-city";
  public const string TBL_REVALUATION_COEFF_D = "revaluation-coeff-d";
  public const string PARAM_BASE_RATE = "base-rate";
  public const string PARAM_MIN_AMOUNT = "min-amount";

  public override Table[] AvailableMainTables => [
    new Table(
      TBL_GLOBAL,
      RateAreaType.NoGrouping,
      [
        new("year", null, "year", "year", null, SubValueType.Number, true, true, true, true),
        new(PARAM_BASE_RATE, SOURCE_OTHERCOL, PARAM_BASE_RATE, null, null, SubValueType.Number, true, true, false, true),
        new(PARAM_MIN_AMOUNT, SOURCE_OTHERCOL, PARAM_MIN_AMOUNT, null, null, SubValueType.Currency, true, true, false, true)
      ],
      [PARAM_BASE_RATE, PARAM_MIN_AMOUNT],
      false
    ),
    new Table(
      TBL_RATES_BY_CITY,
      RateAreaType.ByCity,
      [
        new("year", null, "year", "year", null, SubValueType.Number, true, true, true, true),
        new("city-name", SOURCE_CITY, "name", "groupingName", "groupingReference", SubValueType.City, true, true, true, true),
        new("city-county-name", SOURCE_CITY, "countyName", null, null, SubValueType.String, true, false, true, true),
        new("rbc-city-min-amount", SOURCE_OTHERCOL, "rbc-city-min-amount", null, null, SubValueType.Currency, true, true, false, false),
      ],
      ["rbc-city-min-amount"],
      true
    )
  ];

  public override Dictionary<string, Table[]> AvailableSubTables => new()
  {
    {TBL_RATES_BY_CITY, new[] {
      new Table(
        SUBTBL_RATES,
        RateAreaType.NoGrouping,
        [
          new("rbc-code", null, "code", null, "code", SubValueType.String, true, true, false, true),
          new("rbc-description", null, "description", null, "label", SubValueType.String, true, true, false, true),
          new("rbc-rate", null, "rate", null, "numberValue",SubValueType.Number, true, true, false, true),
        ],
        [],
        true
      )}
    }
  };

  public ItaILIAConfiguration(IRepository<TaxConfig> taxConfigRepo)
    : base(taxConfigRepo, ItaILIA.CalculatorGuid)
  {

  }
}
