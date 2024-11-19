using RealGimm.Core;
using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.Core.Asst.EstateAggregate;

namespace RealGimm.Core.Asst.AssetTaxCalculationAggregate.Models;

public sealed record AssetTaxDetailRow
{
  public int Year { get; set; }
  public string? CityName { get; set; }
  public Address Address { get; set; } = default!;
  public int EstatesCount { get; set; }
  public int EstateUnitsCount { get; set; }
  public string? ManagementSubjectName { get; set; }
  public List<AssetTaxDetailEstateItem> SubRows { get; set; } = new();
}


public sealed record AssetTaxDetailEstateItem
{
  public int Year { get; set; }
  public int ManagementSubjectId { get; set; }
  public Address Address { get; set; } = default!;
  public string? EstateInternalCode { get; set; }
  public decimal TotalAmountPaid { get; set; }
  public decimal TotalBaseTaxableAmount { get; set; }
  public decimal TotalGrossCadastralIncome { get; set; }
  public decimal TotalActualizedCadastralIncome { get; set; }
  public List<AssetTaxDetailEstateUnitItem> SubRows { get; set; } = new();
}

public sealed record AssetTaxDetailEstateUnitItem
{
  public int Year { get; set; }
  public CadastralUnitIncome? CadastralUnitIncome { get; set; }
  public CadastralUnitTaxConfig? CadastralUnitTaxConfig { get; set; }
  public Estate Estate { get; set; } = default!;
  public Address Address { get; set; } = default!;
  public NullSafeCollection<CadastralCoordinates> CadastralCoordinates { get; set; } = default!;
  public string? EstateUnitInternalCode { get; set; }
  public double? EstateUnitOwnershipPercent { get; set; }
  public decimal AmountPaid { get; set; }
  public decimal BaseTaxableAmount { get; set; }
  public decimal GrossCadastralIncome { get; set; }
  public decimal ActualizedCadastralIncome { get; set; }
}
