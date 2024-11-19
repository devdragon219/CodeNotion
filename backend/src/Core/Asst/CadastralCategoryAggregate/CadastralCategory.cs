using System.ComponentModel.DataAnnotations;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Asst.CadastralCategoryAggregate;

public class CadastralCategory : EntityBase, IAggregateRoot
{
  [FuzzySearchable, MaxLength(StrFieldSizes.DESCRIPTION)]
  public string Description { get; private set; }
  [MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? ExternalCode { get; private set; }
  [FuzzySearchable, MaxLength(StrFieldSizes.NAME)]
  public string GroupName { get; private set; }
  [FuzzySearchable, MaxLength(StrFieldSizes.ISO_COUNTRY)]
  public string CountryISO { get; private set; }
  public decimal? CadastralValueFactor { get; private set; }
  public decimal? CadastralValueTaxFactor { get; private set; }
  public bool IsInstrumental { get; private set; }
  public bool IsTaxed { get; private set; }

  public CadastralCategory(string description, string groupName, string countryISO)
  {
    Description = description;
    GroupName = groupName;
    CountryISO = countryISO;
  }

  public void SetExternalCode(string? externalCode) => ExternalCode = externalCode;

  public void SetFactors(decimal? cadastralValue, decimal? cadastralValueTax)
  {
    CadastralValueFactor = cadastralValue;
    CadastralValueTaxFactor = cadastralValueTax;
  }

  public void SetFlags(bool isInstrumental, bool isTaxed)
  {
    IsInstrumental = isInstrumental;
    IsTaxed = isTaxed;
  }
}
