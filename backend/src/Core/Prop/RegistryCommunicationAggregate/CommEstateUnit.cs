using System.ComponentModel.DataAnnotations;

namespace RealGimm.Core.Prop.RegistryCommunicationAggregate;

public class CommEstateUnit : EntityBase
{
  public int CommunicationIndex { get; private set; }
  public int EstateUnitId { get; private set; }

  [MaxLength(StrFieldSizes.INTERNAL_CODE)]
  public string? EstateUnitType { get; private set; }
  
  public int? CityId { get; private set; }
  
  [MaxLength(StrFieldSizes.INTERNAL_CODE)]
  public string? CadastreType { get; private set; }
  
  [MaxLength(StrFieldSizes.INTERNAL_CODE)]
  public string? EstatePartition { get; private set; }
  
  [MaxLength(StrFieldSizes.INTERNAL_CODE)]
  public string? CadastralCoordinateLevel1 { get; private set; }
  
  [MaxLength(StrFieldSizes.INTERNAL_CODE)]
  public string? CadastralCoordinateLevel2 { get; private set; }
  
  [MaxLength(StrFieldSizes.INTERNAL_CODE)]
  public string? CadastralCoordinateLevel3 { get; private set; }
  
  [MaxLength(StrFieldSizes.INTERNAL_CODE)]
  public string? CadastralCoordinateLevel4 { get; private set; }
  
  [MaxLength(StrFieldSizes.INTERNAL_CODE)]
  public string? CadastralCategory { get; private set; }
  
  [MaxLength(StrFieldSizes.SMALL_TOPONYMY_NAME)]
  public string? CadastralAddressToponymy { get; private set; }

  [MaxLength(StrFieldSizes.NUMBERING_OR_POSTCODE)]
  public string? CadastralAddressNumbering { get; private set; }
  
  public decimal? CadastralIncome { get; private set; }

  public void SetCommunicationIndex(int communicationIndex) => CommunicationIndex = communicationIndex;
  
  public void SetEstateUnitId(int estateUnitId) => EstateUnitId = estateUnitId;

  public void SetEstateUnitType(string? estateUnitType) => EstateUnitType = estateUnitType;

  public void SetCityId(int? cityId) => CityId = cityId;

  public void SetCadastreType(string? cadastreType) => CadastreType = cadastreType;

  public void SetEstatePartition(string? estatePartition) => EstatePartition = estatePartition;

  public void SetCadastralCoordinates(string? level1, string? level2, string? level3, string? level4)
  {
    CadastralCoordinateLevel1 = level1;
    CadastralCoordinateLevel2 = level2;
    CadastralCoordinateLevel3 = level3;
    CadastralCoordinateLevel4 = level4;
  }

  public void SetCadastralCategory(string? cadastralCategory) => CadastralCategory = cadastralCategory;

  public void SetCadastralAddressToponymy(string? cadastralAddressToponymy)
    => CadastralAddressToponymy = cadastralAddressToponymy;
  
  public void SetCadastralAddressNumbering(string? cadastralAddressNumbering)
    => CadastralAddressNumbering = cadastralAddressNumbering;

  public void SetCadastralIncome(decimal? cadastralIncome) => CadastralIncome = cadastralIncome;
}
