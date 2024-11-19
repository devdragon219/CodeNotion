namespace RealGimm.Plugin.Import.Asst.Models;

public class CadastralUnitDTO
{
  // Common Fields
  public string Id { get; set; } = default!;
  public bool IsLand { get; set; }
  public string EstateUnitId { get; set; } = default!;
  public string[] EquivalentCUIds { get; set; } = [];
  public string? Code { get; set; } // CodUCT or CodUCU
  public string? TipoPatrimonioId { get; set; } // fk_TipoPatrimonio_Id
  public string? ComuneId { get; set; } // fk_Comune_Id
  public string? CAPComune { get; set; }
  public string? TipoRendita { get; set; } // TipoRendita
  public string? ToponimoCatastale { get; set; } // ToponimoCatastale
  public string? DittaIscrCatasto { get; set; } // DittaIscrCatasto
  public string? Partita { get; set; } // Partita
  public string? Sezione { get; set; } // Sezione
  public string? Classe { get; set; } // Classe
  public decimal? Consistenza { get; set; } // Consistenza
  public decimal? Superficie { get; set; } // Superficie
  public decimal? VoceBilancio { get; set; } // VoceBilancio
  public string? NumProtocollo { get; set; } // NumProtocollo
  public DateTime? DataProtocollo { get; set; } // DataProtocollo
  public string? FlagConformeCatasto { get; set; } // FlagConformeCatasto
  public DateTime? DataInizioGestione { get; set; } // DataInizioGestione
  public DateTime? DataFineGestione { get; set; } // DataFineGestione
  public string? FlagBeneStrumentale { get; set; } // FlagBeneStrumentale
  public string? FlagDisposizione { get; set; } // FlagDisposizione
  public DateTime? InizioInagibilita { get; set; } // InizioInagibilita
  public DateTime? FineInagibilita { get; set; } // FineInagibilita
  public DateTime? DataInserimento { get; set; }
  public DateTime? DataAggiornamento { get; set; }
  public string? Stato { get; set; } // StatoUCT or StatoUCU
  public string? NotaProtocollo { get; set; } // NotaProtocollo
  public string? NotaCatastale { get; set; } // NotaCatastale
  public string? NotaFiscale { get; set; } // NotaFiscale
  public bool FlagCessato { get; set; } // FlagCessato
  public decimal? AliquotaICI { get; set; } // AliquotaICI
  public string? TipoEsclusioneICI { get; set; } // TipoEsclusioneICI
  public DateTime? DataVariazioniCatastali { get; set; } // DataVariazioniCatastali
  public DateTime? DataVisura { get; set; } // DataVisura
  public string? OggettoVariazioniCatastali { get; set; } // OggettoVariazioniCatastali
  public string? IntestazioneVisura { get; set; } // IntestazioneVisura
  public string? TipoCatasto { get; set; } // TipoCatasto
  public DateTime? DataVariazioneIMU { get; set; } // DataVariazioneIMU
  public string? NotaVariazione { get; set; } // NotaVariazione
  public decimal? DicuiLocata { get; set; } // DicuiLocata
  public decimal? SuperficieCatastale { get; set; } // SuperficieCatastale
  public decimal? DiCuiLocataSC { get; set; } // DiCuiLocataSC
  public DateTime? DataInizioValiditaCatastale { get; set; } // DataInizioValiditaCatastale
  public DateTime? DataFineValiditaCatastale { get; set; } // DataFineValiditaCatastale

  // Fields specific to UnitaCatTerreno
  public string? TipoQualitaId { get; set; } // fk_TipoQualita_Id
  public string? DescQualita { get; set; }
  public decimal? SupReale { get; set; } // SupReale
  public decimal? RedditoAgrario { get; set; } // RedditoAgrario
  public decimal? RedditoDominicale { get; set; } // RedditoDominicale
  public decimal? ValoreVenale { get; set; } // ValoreVenale
  public DateTime? DataValVenale { get; set; } // DataValVenale
  public string? FlagFabbricabile { get; set; } // FlagFabbricabile
  public string? Deduzione { get; set; } // Deduzione
  public string? CodSedeTecnica { get; set; } // cod_sede_tecnica_CatT
  public string? CodEquipment { get; set; } // cod_equipment_CatT

  // Fields specific to UnitaCatUrbano
  public string? ZonaTerritoriale { get; set; } // ZonaTerritoriale
  public string? ZonaCensuaria { get; set; } // ZonaCensuaria
  public string? Microzona { get; set; } // Microzona
  public string? CategoriaCatastaleId { get; set; } // fk_CategoriaCatastale_Id
  public string? CodCategoria { get; set; }
  public string? TipoConsistenzaId { get; set; } // fk_TipoConsistenza_id
  public decimal? MqNuovoCatasto { get; set; } // MqNuovoCatasto
  public decimal? RenditaCatastale { get; set; } // RenditaCatastale
  public decimal? RenditaRicalcolata { get; set; } // RenditaRicalcolata
  public DateTime? DataRicalcoloRendita { get; set; } // DataRicalcoloRendita
  public bool FlagIntStorico { get; set; } // FlagIntStorico
  public bool FlagImmStorico { get; set; } // FlagImmStorico
  public bool FlagVincoloDiretto { get; set; } // FlagVincoloDiretto
  public bool FlagRenditaMinima { get; set; } // FlagRenditaMinima
  public string? CategoriaCatastaleId2 { get; set; } // fk_CategoriaCatastale_Id2
  public string? ClasseMinima { get; set; } // ClasseMinima
  public string? TipoRenditaMinima { get; set; } // TipoRenditaMinima
  public decimal? ConsistenzaMinima { get; set; } // ConsistenzaMinima
  public decimal? RenditaCatastaleMinima { get; set; } // RenditaCatastaleMinima
  public bool FlagRurale { get; set; } // FlagRurale
  public bool FlagParteComune { get; set; } // FlagParteComune
  public bool FlagIciAmministratore { get; set; } // FlagIciAmministratore
  public string? TipoConsistenzaUrbano { get; set; } // TipoConsistenza in UnitaCatUrbano
  public string? CodSedeTecnicaUrbano { get; set; } // cod_sede_tecnica_CatU
  public string? CodEquipmentUrbano { get; set; } // cod_equipment_CatU
}
