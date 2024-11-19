using System.Xml.Linq;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.SubjectAggregate.Specifications;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate.Specifications;
using RealGimm.Core.Common.CityAggregate;
using RealGimm.Core.Common.CityAggregate.Specifications;
using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Core.Docs.DocumentAggregate.Specifications;
using RealGimm.Core.Extensions;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Prop.RegistryCommunicationAggregate;
using RealGimm.Core.Prop.RegistryCommunicationAggregate.Specifications;
using RealGimm.Core.Shared;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.Core.Shared.Specifications;

namespace RealGimm.Core.Prop.Services;

public partial class RegistryCommunicationXmlGenerator : IXmlGenerator<ConfirmedRegistryCommunicationGroupIdWithOffice>
{
  private static readonly XNamespace _locNamespace = "urn:www.agenziaentrate.gov.it:specificheTecniche:sco:loc:v1";
  private static readonly XNamespace _cmNamespace = "urn:www.agenziaentrate.gov.it:specificheTecniche:common:v2";
  private static readonly XNamespace _regNamespace = "urn:www.agenziaentrate.gov.it:specificheTecniche:sco:reg:v1";
  private static readonly XNamespace _scNamespace = "urn:www.agenziaentrate.gov.it:specificheTecniche:sco:common:v2";
  
  private readonly IRepository<Subject> _subjectRepository;
  private readonly IRepository<EstateUnit> _estateUnitRepository;
  private readonly IRepository<Document> _documentRepository;
  private readonly IRepository<City> _cityRepository;
  private readonly IRepository<RegistryCommunication> _registryCommunicationRepository;

  public RegistryCommunicationXmlGenerator(
    IRepository<Subject> subjectRepository,
    IRepository<EstateUnit> estateUnitRepository,
    IRepository<Document> documentRepository,
    IRepository<City> cityRepository,
    IRepository<RegistryCommunication> registryCommunicationRepository)
  {
    _subjectRepository = subjectRepository;
    _estateUnitRepository = estateUnitRepository;
    _documentRepository = documentRepository;
    _cityRepository = cityRepository;
    _registryCommunicationRepository = registryCommunicationRepository;
  }

  public async Task<XDocument> GenerateXmlAsync(
    ConfirmedRegistryCommunicationGroupIdWithOffice groupId,
    CancellationToken cancellationToken)
  {
    var communications = await _registryCommunicationRepository
      .AsQueryable(
        new ConfirmedRegistryCommunicationByGroupIdWithOfficeSpec(groupId),
        new NonExcludedRegistryCommunication(),
        new RegistryCommunicationIncludeForXmlGenerationSpec())
      .ToListAsync(cancellationToken);

    var managementSubject = await _subjectRepository
      .AsQueryable(new GetByIdSpec<Subject>(groupId.ManagementSubjectId), new SubjectIncludeAllSpec())
      .OfType<ManagementSubject>()
      .SingleAsync(cancellationToken);

    var debtBankAccount = managementSubject.BankAccounts.Single(account => account.Id == groupId.DebtBankAccountId);

    var legalRepresentativeSubject = await _subjectRepository
      .AsQueryable(
        new GetByIdSpec<Subject>(groupId.RequestingSubjectLegalRepresentativeId),
        new SubjectIncludeAllSpec())
      .OfType<PhysicalSubject>()
      .SingleAsync(cancellationToken);

    var attachedDocuments = await _documentRepository
      .AsQueryable(
        new DocumentsByCmisIdsSpec(communications
          .Select(communication => communication.AttachedDocumentId)
          .Where(documentId => !string.IsNullOrWhiteSpace(documentId))!))
      .ToDictionaryAsync(document => document.CmisId, cancellationToken);

    var counterpartSubjects = await _subjectRepository
      .AsQueryable(
        new GetByIdsSpec<Subject>(
          communications.SelectMany(communication => communication
            .Contract!
            .Counterparts
            .Select(counterpart => counterpart.SubjectId))),
        new SubjectIncludeAllSpec())
      .ToDictionaryAsync(subject => subject.Id, cancellationToken);

    var estateUnits = await _estateUnitRepository
      .AsQueryable(
        new GetByIdsSpec<EstateUnit>(
          communications.SelectMany(communication => communication
            .EstatesUnits
            .Select(estateUnit => estateUnit.EstateUnitId))),
        new EstateUnitIncludeAllSpec())
      .ToDictionaryAsync(estateUnit => estateUnit.Id, cancellationToken);

    var cities = await _cityRepository
      .AsQueryable(
        new CitiesByGuidsSpec(estateUnits
          .Values
          .Where(estateUnit => estateUnit.Address.CityReference.HasValue)
          .Select(estateUnit => estateUnit.Address.CityReference!.Value)))
      .ToDictionaryAsync(city => city.Guid, cancellationToken);

    var context = new Context(
      groupId.OfficeExternalCode,
      managementSubject,
      groupId.IsActiveContract,
      groupId.CommunicationType,
      groupId.EndDate,
      groupId.Date,
      legalRepresentativeSubject,
      debtBankAccount,
      communications,
      attachedDocuments,
      counterpartSubjects,
      estateUnits,
      cities);

    return CreateXmlDocument(context);
  }

  private static XDocument CreateXmlDocument(Context context)
  {
    var headerElement = CreateHeaderElement(context.ManagementSubject.BaseCountryTaxIdCode!);

    var generalDataElement = CreateGeneralDataElement(
      context.Communications.Sum(communication => communication.DebtAmount ?? 0),
      context.DebtBankAccount.ReferenceCode!,
      context.OfficeExternalCode,
      context.ManagementSubject.BaseCountryTaxIdCode!);

    var documentElements = context
      .Communications
      .Select((communication, index) => CreateDocumentElement(
        index + 1,
        communication,
        attachedDocument: string.IsNullOrWhiteSpace(communication.AttachedDocumentId)
          ? null
          : context.Documents[communication.AttachedDocumentId],
        context.ManagementSubject,
        context.LegalRepresentativeSubject,
        context.CounterpartSubjects,
        context.EstateUnits,
        context.Cities));

    var xmlDocument = new XDocument(
      new XDeclaration("1.0", "utf-8", null),
      new XElement(_locNamespace + "Fornitura",
      [
        new XAttribute(XNamespace.Xmlns + "loc", _locNamespace),
        new XAttribute(XNamespace.Xmlns + "cm", _cmNamespace),
        new XAttribute(XNamespace.Xmlns + "reg", _regNamespace),
        new XAttribute(XNamespace.Xmlns + "sc", _scNamespace),
        headerElement,
        generalDataElement,
        ..documentElements
      ]));

    return xmlDocument;
  }

  private static XElement CreateHeaderElement(string supplierTaxCode)
    => new(_locNamespace + "Intestazione",
        new XElement(_locNamespace + "CodiceFornitura", "RLI12"),
        new XElement(_locNamespace + "TipoFornitore", "1"),
        new XElement(_locNamespace + "CodiceFiscaleFornitore", supplierTaxCode),
        new XElement(_locNamespace + "SpazioServizioTelematico", $"{new string('0', 19)}A000{new string(' ', 66)}00"));

  private static XElement CreateGeneralDataElement(decimal totalAmount, string iban, string? officeCode, string ownerTaxCode)
  {
    var generalDataElement = new XElement(_locNamespace + "DatiGenerali",
      new XElement(_locNamespace + "ImportoDaVersare", totalAmount.ToString("##0.00")));

    if (officeCode is not null)
    {
      generalDataElement.Add(
        new XElement(_locNamespace + "UfficioCompetente"),
          new XElement(_locNamespace + "UfficioTerritoriale", officeCode));
    }

    if (totalAmount > 0)
    {
      generalDataElement.Add(
        new XElement(_locNamespace + "Versamento"),
          new XElement(_regNamespace + "IBAN", iban),
          new XElement(_regNamespace + "CodiceFiscaleTitolareCC", ownerTaxCode));
    }

    return generalDataElement;
  }

  private static XElement CreateDocumentElement(
    int index,
    RegistryCommunication communication, 
    Document? attachedDocument,
    ManagementSubject managementSubject,
    PhysicalSubject legalRepresentativeSubject,
    IDictionary<int, Subject> counterpartSubjects,
    IDictionary<int, EstateUnit> estateUnits,
    IDictionary<Guid, City> cities)
  {
    var documentElement = new XElement(_locNamespace + "Documento",
      new XAttribute("identificativo", index.ToString().PadLeft(5, '0')));

    var maxNonPrimaryModulesCount = new int[]
    {
      Math.Max(0, (communication.EstatesUnits.Count / 4) - 1),
      Math.Max(0, (communication.Contract!.Counterparts.Count / 4) - 1),
      //Math.Max(0, (relations.Count / 10) - 1) // TODO: uncomment when <Relazioni> will be implemented
    }.Max();

    documentElement.Add(
      CreateFrontispieceElement(
        communication,
        attachedDocument,
        managementSubject,
        legalRepresentativeSubject,
        maxNonPrimaryModulesCount));

    if (communication.Contract!.Counterparts.Count > 0)
    {
      documentElement.Add(CreateSubjectsElement(communication, managementSubject, counterpartSubjects));
    }

    if (communication.EstatesUnits.Count > 0)
    {
      documentElement.Add(CreateEstateUnitsElement(communication, estateUnits, cities));
    }

    // TODO: check RG2 logic of generating <Relazioni> element
    //if (communication.EstatesUnits.Count > 0 &&
    //  communication.Contract!.Counterparts.Any(counterpart => communication.Contract.Type.IsActive
    //    ? counterpart.IsMainCounterpart
    //    : !counterpart.IsMainCounterpart))
    //{
    //  documentElement.Add(CreateRelationsElement(communication));
    //}

    if (communication.Contract!.RatePlans.Count > 0)
    {
      documentElement.Add(CreateVariableFeesElement(communication));
    }

    return documentElement;
  }

  public static XElement CreateFrontispieceElement(
    RegistryCommunication communication,
    Document? attachedDocument,
    ManagementSubject senderSubject,
    PhysicalSubject legalRepresentativeSubject,
    int nonPrimaryModulesCount)
  {
    var frontispieceElement = new XElement(_locNamespace + "Frontespizio",
      new XElement(_locNamespace + "IdentificativoProdSoftware", "02327910580"),
      new XElement(_locNamespace + "NumeroModuliCompilati", nonPrimaryModulesCount),
      new XElement(_locNamespace + "IDContratto", communication.ContractCode),
      CreateFrontispieceApplicantElement(communication, senderSubject, legalRepresentativeSubject),
      new XElement(_locNamespace + "DataInvio", communication.Date.ToString("ddMMyyyy")));

    if (!string.IsNullOrWhiteSpace(communication.ContractType))
    {
      frontispieceElement.Add(new XElement(_locNamespace + "TipologiaContratto", communication.ContractType));
    }

    if (communication.StartDate.HasValue)
    {
      frontispieceElement.Add(new XElement(_locNamespace + "DataInizio", communication.StartDate.Value.ToString("ddMMyyyy")));
    }

    if (communication.EndDate.HasValue)
    {
      frontispieceElement.Add(new XElement(_locNamespace + "DataFine", communication.EndDate.Value.ToString("ddMMyyyy")));
    }
    else
    {
      frontispieceElement.Add(new XElement(_locNamespace + "ContrattoTempoIndeterminato", 1));
    }

    if (communication.ContractFee.HasValue)
    {
      frontispieceElement.Add(new XElement(_locNamespace + "ImportoCanone", communication.ContractFee.Value.ToString("##0.00")));
    }

    if (communication.Contract!.RegistrationTaxData!.Exemptions.HasValue)
    {
      var value = communication.Contract!.RegistrationTaxData!.Exemptions switch
      {
        RegistrationTaxExemption.Stamp => 1,
        RegistrationTaxExemption.StampAndDuties => 2,
        RegistrationTaxExemption.Duties => 3,

        _ => throw new NotSupportedException()
      };

      frontispieceElement.Add(new XElement(_locNamespace + "ContrattoEsente", value));
    }

    if (communication.Contract!.RegistrationTaxData!.IsVoluntarySanctionApplied)
    {
      frontispieceElement.Add(new XElement(_locNamespace + "ClausolaPenaleVolontaria", 1));
    }

    if (communication.Contract!.RegistrationTaxData!.FirstRegistrationPeriod is RegistrationTaxPeriod.EntireDuration)
    {
      frontispieceElement.Add(new XElement(_locNamespace + "PagamentoInteraDurataContratto", 1));
    }

    if (communication.Contract.RegistrationTaxData!.SpecialCase.HasValue)
    {
      var value = communication.Contract.RegistrationTaxData.SpecialCase.Value switch
      {
        RegistrationTaxSpecialCase.ita_1YearsWithDifferentRates => "L1",
        RegistrationTaxSpecialCase.ita_2Subletting => "L2",
        RegistrationTaxSpecialCase.ita_3YearsWithRatesDifferentFromWhole => "L2",
        
        _ => throw new NotSupportedException()
      };

      frontispieceElement.Add(new XElement(_locNamespace + "CasiParticolari", value));
    }

    if (communication.DebtAmount > 0)
    {
      frontispieceElement.Add(CreateFrontispieceAmountsElement(communication));
    }

    if (communication.Type == CommunicationType.Ita_RLI12_FirstRegistration)
    {
      frontispieceElement.Add(CreateFrontispieceRegistrationElement(communication, attachedDocument));
    }
    else
    {
      frontispieceElement.Add(CreateNextFulfilmentElement(communication));
    }

    return frontispieceElement;
  }

  private static XElement CreateFrontispieceApplicantElement(
    RegistryCommunication communication,
    ManagementSubject senderSubject,
    PhysicalSubject legalRepresentativeSubject)
  {
    var applicantElement = new XElement(_locNamespace + "Richiedente",
      new XElement(_locNamespace + "CodiceFiscale", senderSubject.BaseCountryTaxIdCode),
      new XElement(_locNamespace + "SoggettiDiversiDaPF",
        new XElement(_locNamespace + "Denominazione", senderSubject.Name)),
      new XElement(_locNamespace + "Rappresentante",
        new XElement(_locNamespace + "CodiceFiscaleRappresentante", legalRepresentativeSubject.BirthCountryTaxIdCode),
        new XElement(_locNamespace + "CognomeRappresentante", legalRepresentativeSubject.LastName),
        new XElement(_locNamespace + "NomeRappresentante", legalRepresentativeSubject.FirstName),
        new XElement(_locNamespace + "CodiceCarica", legalRepresentativeSubject.ExternalSourceCode)), // TODO: verify
      new XElement(_locNamespace + "Firma", 1),
      new XElement(_locNamespace + "TipologiaRichiedente", 1));

    // TODO: should we have a dedicated field like IsManagementSubjectTakeovered?
    //if (communication.IsManagementSubjectTakeovered)
    //{
    //  applicantElement.Add(new XElement(_locNamespace + "Subentro", "1"));
    //}

    return applicantElement;
  }

  private static XElement CreateFrontispieceAmountsElement(RegistryCommunication communication)
  {
    var amountsElement = new XElement(_locNamespace + "Importi");

    if (communication.RegistryFee > 0m || communication.StampFee > 0m)
    {
      var feesElement = new XElement(_locNamespace + "Imposte");

      if (communication.RegistryFee.HasValue)
      {
        feesElement.Add(new XElement(_locNamespace + "ImpostaDiRegistro", communication.RegistryFee.Value.ToString("##0.00")));
      }

      if (communication.StampFee.HasValue)
      {
        feesElement.Add(new XElement(_locNamespace + "ImpostaDiBollo", communication.StampFee.Value.ToString("##0.00")));
      }

      amountsElement.Add(feesElement);
    }

    if (communication.RegistryFeePenalty > 0m || communication.StampFeePenalty > 0m)
    {
      var penaltiesElement = new XElement(_locNamespace + "Sanzioni");

      if (communication.RegistryFeePenalty.HasValue)
      {
        penaltiesElement.Add(
          new XElement(_locNamespace + "ImpostaDiRegistro", communication.RegistryFeePenalty.Value.ToString("##0.00")));
      }

      if (communication.StampFeePenalty.HasValue)
      {
        penaltiesElement.Add(
          new XElement(_locNamespace + "ImpostaDiBollo", communication.StampFeePenalty.Value.ToString("##0.00")));
      }

      amountsElement.Add(penaltiesElement);
    }

    if (communication.RegistryFeeInterest > 0m || communication.StampFeeInterest > 0m)
    {
      var interestsElement = new XElement(_locNamespace + "Interessi");

      if (communication.RegistryFeeInterest.HasValue)
      {
        interestsElement.Add(
          new XElement(_locNamespace + "ImpostaDiRegistro", communication.RegistryFeeInterest.Value.ToString("##0.00")));
      }

      if (communication.StampFeeInterest.HasValue)
      {
        interestsElement.Add(
          new XElement(_locNamespace + "ImpostaDiBollo", communication.StampFeeInterest.Value.ToString("##0.00")));
      }

      amountsElement.Add(interestsElement);
    }

    return amountsElement;
  }

  private static XElement CreateFrontispieceRegistrationElement(RegistryCommunication communication, Document? attachedDocument)
  {
    var registrationElement = new XElement(_locNamespace + "Registrazione",
      CreateFrontispieceRegistrationContractElement(communication));

    if (attachedDocument is not null)
    {
      using var memeoryStream = new MemoryStream();
      attachedDocument.Data!.CopyTo(memeoryStream);

      var pdfaBytes = PdfToPdfaConverter.Convert(memeoryStream.ToArray());

      registrationElement.Add(
        new XElement(_locNamespace + "Allegati",
          new XElement(_locNamespace + "FileType", attachedDocument.MimeType),
          new XElement(_locNamespace + "FileName", attachedDocument.FileName),
          new XElement(_locNamespace + "ImageData", Convert.ToBase64String(pdfaBytes))));
    }

    return registrationElement;
  }

  private static XElement CreateFrontispieceRegistrationContractElement(RegistryCommunication communication)
  {
    var contractElement = new XElement(_locNamespace + "Contratto",
      new XElement(_locNamespace + "DataStipula", communication.ContractSignatureDate!.Value.ToString("ddMMyyyy")),
      new XElement(_locNamespace + "NumeroPagine", communication.NumberOfPages),
      new XElement(_locNamespace + "NumeroCopie", communication.NumberOfCopies));

    if (communication.Contract!.BillingVATRateType is VATRateType.Rate)
    {
      contractElement.Add(new XElement(_locNamespace + "ContrattoSoggettoIVA", 1));
    }

    // TODO: check if NumeroAllegatoA/B/C fields are present in RG2
    //
    //if (NumeroAllegatoA != 0)
    //{
    //  contractElement.Add(new XElement(_locNamespace + "NumeroAllegatoA", NumeroAllegatoA));
    //}
    //
    //if (NumeroAllegatoB != 0)
    //{
    //  contractElement.Add(new XElement(_locNamespace + "NumeroAllegatoB", NumeroAllegatoB));
    //}
    //
    //if (NumeroAllegatoC != 0)
    //{
    //  contractElement.Add(new XElement(_locNamespace + "NumeroAllegatoC", NumeroAllegatoC));
    //}

    return contractElement;
  }

  private static XElement CreateNextFulfilmentElement(RegistryCommunication communication)
  {
    return new XElement(_locNamespace + "AdempSucc");

    // TODO: check RG2 logic
    //
    //var nextFulfilmentElement = new XElement(_locNamespace + "AdempSucc",
    //  new XElement(_locNamespace + "TipologiaAdempimento", TipologiaAdempimento));
    //
    //if (CedolareSecca is not null)
    //{
    //  nextFulfilmentElement.Add(new XElement(_locNamespace + "CedolareSecca", CedolareSecca));
    //}
    //
    //if (CDC is not null and not 0)
    //{
    //  nextFulfilmentElement.Add(new XElement(_locNamespace + "CDC", CDC));
    //}
    //
    //if (Annualita is not null)
    //{
    //  nextFulfilmentElement.Add(new XElement(_locNamespace + "Annualita", Annualita));
    //}
    //
    //if (DataFine is not null)
    //{
    //  nextFulfilmentElement.Add(new XElement(_locNamespace + "DataFine", DataFine.Value.ToString("ddMMyyyy")));
    //}
    //
    //if (Corrispettivo is not null and not 0)
    //{
    //  nextFulfilmentElement.Add(new XElement(_locNamespace + "Corrispettivo", Corrispettivo.Value.ToString("##0.00")));
    //}
    //
    //if (IDTelematico is not null)
    //{
    //  nextFulfilmentElement.Add(new XElement(_locNamespace + "IDTelematico", IDTelematico));
    //}
    //else
    //{
    //  nextFulfilmentElement.Add(CreateNextFulfilmentRegistrationElement(communication));
    //}
    //
    //if (TipologiaSubentro is not null)
    //{
    //  nextFulfilmentElement.Add(new XElement(_locNamespace + "TipologiaSubentro", TipologiaSubentro));
    //}
    //
    //if (!rowImpostaRegistro.IsTipologiaProrogaNull())
    //{
    //  nextFulfilmentElement.Add(new XElement(_locNamespace + "TipologiaProroga", TipologiaProroga));
    //}
    //
    //if (TardivitaAnnualitaSuccessiva is not null)
    //{
    //  nextFulfilmentElement.Add(new XElement(_locNamespace + "TardivitaAnnualitaSuccessiva", TardivitaAnnualitaSuccessiva));
    //}
    //
    //return nextFulfilmentElement;
  }

  private static XElement CreateNextFulfilmentRegistrationElement(RegistryCommunication communication)
  {
    var registrationNode = new XElement(_locNamespace + "Registrazione");

    if (communication.Office?.ExternalCode is not null)
    {
      registrationNode.Add(_locNamespace + "UfficioDiRegistrazione", communication.Office?.ExternalCode);
    }

    if (communication.ContractSignatureDate.HasValue)
    {
      registrationNode.Add(_locNamespace + "Anno", communication.ContractSignatureDate.Value.Year);
    }

    // TODO: check RG2 logic
    //if (SerieRegistrazione is not null)
    //{
    //  registrationNode.Add(_locNamespace + "Serie", SerieRegistrazione);
    //}

    if (!string.IsNullOrWhiteSpace(communication.RegistryNumber))
    {
      registrationNode.Add(_locNamespace + "NumeroRegistrazione", communication.RegistryNumber);
    }

    // TODO: check RG2 logic
    //if (SottoNumeroRegistrazione is not null and not 0)
    //{
    //  registrationNode.Add(_locNamespace + "SottonumeroRegistrazione", SottoNumeroRegistrazione);
    //}

    return registrationNode;
  }

  private static XElement CreateEstateUnitsElement(
    RegistryCommunication communication,
    IDictionary<int, EstateUnit> estateUnits,
    IDictionary<Guid, City> cities)
  {
    var estateUnitsElement = new XElement(_locNamespace + "Immobili");
    
    var orderedCommEstateUnits = communication.EstatesUnits
      .OrderBy(estateUnit => estateUnit.CommunicationIndex)
      .ToArray();

    // new module per every 4 estate units, the 1st module is primary module
    foreach (var (chunk, chunkIndex) in orderedCommEstateUnits.Chunk(4).Select((chunk, index) => (chunk, index)))
    {
      var moduleElementName = (chunkIndex == 0) ? "PrimoModulo" : "Modulo";
      var moduleElement = new XElement(_locNamespace + moduleElementName);

      foreach (var commEstateUnit in chunk)
      {
        var estateUnit = estateUnits[commEstateUnit.EstateUnitId];

        var cityName = estateUnit.Address.CityReference.HasValue
          ? cities[estateUnit.Address.CityReference!.Value].Name
          : estateUnit.Address.CityName!;

        var cityCadastralCode = estateUnit.Address.CityReference.HasValue
          ? cities[estateUnit.Address.CityReference!.Value].CadastralCode
          : null;

        moduleElement.Add(CreateEstateUnitElement(commEstateUnit, estateUnit, cityName, cityCadastralCode, commEstateUnit.CommunicationIndex));
      }

      estateUnitsElement.Add(moduleElement);
    }

    return estateUnitsElement;
  }

  private static XElement CreateEstateUnitElement(
    CommEstateUnit commEstateUnit,
    EstateUnit estateUnit,
    string cityName,
    string? cityCadastralCode,
    int index)
  {
    var estateUnitElement = new XElement(_locNamespace + "Immobile",
      new XElement(_locNamespace + "NumeroProgressivoImmobile", index.ToString().PadLeft(3, '0')),
      new XElement(_locNamespace + "TipologiaImmobile", commEstateUnit.EstateUnitType),
      new XElement(_locNamespace + "CodiceComuneCatastale", cityCadastralCode?[..Math.Min(cityCadastralCode.Length, 5)]),
      new XElement(_locNamespace + "TipoCatasto", commEstateUnit.CadastreType),
      new XElement(_locNamespace + "PorzioneImmobile", commEstateUnit.EstatePartition),
      new XElement(_locNamespace + "Comune", cityName),
      new XElement(_locNamespace + "Provincia", estateUnit.Address.CountyName),
      new XElement(_locNamespace + "TipologiaIndirizzo", "VIA"), // TODO: heuristics for determining typology
      new XElement(_locNamespace + "Indirizzo", commEstateUnit.CadastralAddressToponymy));

    // TODO: (estateUnit.Type == EstateUnitType.UrbanArea)?
    //if ()
    //{
    //  estateUnitElement.Add(new XElement(_locNamespace + "SezioneUrbana", ));
    //}

    // TODO: add InViaDiAccatastamento field to CommEstateUnit
    //if (commEstateUnit.InViaDiAccatastamento)
    //{
    //  estateUnitElement.Add(new XElement(_locNamespace + "InViaDiAccatastamento", 1));
    //}
    //else
    {
      var cadastralDataElement = new XElement(_locNamespace + "DatiCatastali",
        new XElement(_regNamespace + "Foglio", commEstateUnit.CadastralCoordinateLevel1),
        new XElement(_regNamespace + "Particella", commEstateUnit.CadastralCoordinateLevel2));

      if (!string.IsNullOrWhiteSpace(commEstateUnit.CadastralCoordinateLevel3))
      {
        cadastralDataElement.Add(new XElement(_regNamespace + "Particella_Denominatore", commEstateUnit.CadastralCoordinateLevel3));
      }

      if (!string.IsNullOrWhiteSpace(commEstateUnit.CadastralCoordinateLevel4))
      {
        cadastralDataElement.Add(new XElement(_regNamespace + "Subalterno", commEstateUnit.CadastralCoordinateLevel4));
      }

      estateUnitElement.Add(cadastralDataElement);
    }

    if (!string.IsNullOrWhiteSpace(commEstateUnit.CadastreType))
    {
      var value = commEstateUnit.CadastreType.Replace("/0", string.Empty);
      if (value.Length > 2)
      {
        value = value.Replace("/", "");
      }

      estateUnitElement.Add(new XElement(_locNamespace + "CategoriaCatastale", value));
    }

    if (commEstateUnit.CadastralIncome is not null and > 0)
    {
      estateUnitElement.Add(new XElement(_locNamespace + "RenditaCatastale", commEstateUnit.CadastralIncome.Value.ToString("##0.00")));
    }

    return estateUnitElement;
  }

  private static XElement CreateSubjectsElement(
    RegistryCommunication communication,
    Subject managementSubject,
    IDictionary<int, Subject> counterpartSubjects)
  {
    var subjectsElement = new XElement(_locNamespace + "Soggetti");

    var counterparts = communication.Contract!.Counterparts
      .Where(counterpart => counterpart.Until is null)
      .ToArray();

    var tenants = communication.Contract!.Type.IsActive
      ? counterparts.Select(counterpart => counterpartSubjects[counterpart.SubjectId]) 
      : [managementSubject];

    var landlords = communication.Contract!.Type.IsActive
      ? [managementSubject]
      : counterparts.Select(counterpart => counterpartSubjects[counterpart.SubjectId]);

    // new module per every 4 tenant & 4 landlords, the 1st module is primary module
    foreach (var (chunk, chunkIndex) in tenants.ZipLongest(landlords).Chunk(4).Select((chunk, index) => (chunk, index)))
    {
      var moduleElementName = (chunkIndex == 0) ? "PrimoModulo" : "Modulo";
      var moduleElement = new XElement(_locNamespace + moduleElementName);

      for (int i = 0; i < chunk.Length; i++)
      {
        var tenant = chunk[i].Item1;
        if (tenant is null)
        {
          break;
        }

        moduleElement.Add(CreateSubjectElement(tenant, isTenant: true, index: chunkIndex * 4 + i + 1));
      }
      
      for (int i = 0; i < chunk.Length; i++)
      {
        var landlord = chunk[i].Item2;
        if (landlord is null)
        {
          break;
        }

        moduleElement.Add(CreateSubjectElement(landlord, isTenant: false, index: chunkIndex * 4 + i + 1));
      }

      subjectsElement.Add(moduleElement);
    }

    return subjectsElement;
  }

  private static XElement CreateSubjectElement(Subject subject, bool isTenant, int index)
  {
    var subjectElementName = isTenant ? "Locatario" : "Locatore";

    var subjectElement = new XElement(_locNamespace + subjectElementName,
      new XElement(_locNamespace + "NumeroProgressivo", index.ToString().PadLeft(3, '0')),
      new XElement(_locNamespace + "CodiceFiscale",
        (subject as PhysicalSubject)?.BirthCountryTaxIdCode ?? (subject as IBusinessSubject)?.BaseCountryTaxIdCode));

    if (subject.TaxStatuses.Any(
      taxStatus => taxStatus.Until is null &&
      taxStatus.TaxStatusType == (isTenant ? TaxStatusType.VATSubjectAsTenant : TaxStatusType.VATSubjectAsLandlord)))
    {
      subjectElement.Add(new XElement(_locNamespace + "SoggettivitaIVA", 1));
    }

    if (subject is PhysicalSubject physicalSubject)
    {
      subjectElement.Add(
        new XElement(_locNamespace + "PersoneFisiche",
          new XElement(_locNamespace + "Cognome", physicalSubject.LastName),
          new XElement(_locNamespace + "Nome", physicalSubject.FirstName),
          new XElement(_locNamespace + "Sesso",
            physicalSubject.BirthSex switch
            {
              BirthSex.Male => "M",
              BirthSex.Female => "F",
              _ => throw new NotSupportedException()
            }),
          new XElement(_locNamespace + "DataNascita", physicalSubject.BirthDate!.Value.ToString("ddMMyyyy")),
          new XElement(_locNamespace + "ComuneNascita", physicalSubject.BirthLocation!.CityName),
          new XElement(_locNamespace + "ProvinciaNascita", physicalSubject.BirthLocation!.CountyName)));
    }
    else if (subject is LegalSubject legalSubject &&
      legalSubject.LegalSubjectType is
        LegalSubjectType.UnrecognizedBusinessSociety or 
        LegalSubjectType.UnrecognizedNonbusinessSociety)
    {
      subjectElement.Add(
        new XElement(_locNamespace + "SoggettiDiversiDaPF",
          new XElement(_locNamespace + "Denominazione", subject.Name)));
    }

    // TODO: check RG2 logic
    //if (Cedente is null)
    //{
    //  subjectElement.Add(new XElement(_locNamespace + "Cedente", Cedente));
    //}
    
    // TODO: check RG2 & docs
    //if (SoggettoNonInAtto)
    //{
    //  subjectElement.Add(new XElement(_locNamespace + "Locatore", SoggettoNonInAtto));
    //}

    return subjectElement;
  }

  private static XElement CreateRelationsElement(RegistryCommunication communication)
  {
    var relationsElement = new XElement(_locNamespace + "Relazioni");

    // TODO: check RG2 logic
    //
    //var relations = communication
    //  .EstatesUnits
    //  .SelectMany(estateUnit => communication
    //    .Contract!
    //    .Counterparts
    //    .Where(counterpart => counterpart.Until is null)
    //    .Where(counterpart => communication.Contract.Type.IsActive 
    //      ? counterpart.IsMainCounterpart
    //      : !counterpart.IsMainCounterpart)
    //    .Select(counterpart => (EstateUnit: estateUnit, Counterpart: counterpart)));
    //
    //// new module per every 10 relations, the 1st module is primary module
    //foreach (var (chunk, chunkIndex) in relations.Chunk(10).Select((chunk, index) => (chunk, index)))
    //{
    //  var moduleElementName = (chunkIndex == 0) ? "PrimoModulo" : "Modulo";
    //  var moduleElement = new XElement(_locNamespace + moduleElementName);
    //
    //  foreach (var relation in relations)
    //  {
    //    moduleElement.Add(
    //      new XElement(_locNamespace + "LocazioneUsoAbitativo",
    //        new XElement(_locNamespace + "ImmobileNumero", relation.EstateUnit.),
    //        new XElement(_locNamespace + "LocatoreNumero", relation.Counterpart.),
    //        new XElement(_locNamespace + "PercentualePossesso", relation.Counterpart.ContractSharePercent),
    //        new XElement(_locNamespace + "Cedolare", )));
    //  }
    //
    //  relationsElement.Add(moduleElement);
    //}

    return relationsElement;
  }

  private static XElement CreateVariableFeesElement(RegistryCommunication communication)
  {
    var variableFeesElement = new XElement(_locNamespace + "CanoniVariabili");
    var primaryModuleElement = new XElement(_locNamespace + "PrimoModulo");
    
    foreach (var ratePlan in communication.Contract!.RatePlans)
    {
      primaryModuleElement.Add(
        new XElement(_locNamespace + "Canoni",
          new XElement(_locNamespace + "ImportoCanone", ratePlan.NewYearlyRate.ToString("##0.00"))));
    }

    variableFeesElement.Add(primaryModuleElement);

    return variableFeesElement;
  }

  private record Context(
    string? OfficeExternalCode,
    ManagementSubject ManagementSubject,
    bool IsActiveContract,
    CommunicationType CommunicationType,
    DateOnly? EndDate,
    DateOnly Date,
    PhysicalSubject LegalRepresentativeSubject,
    BankAccount DebtBankAccount,
    IEnumerable<RegistryCommunication> Communications,
    IDictionary<string, Document> Documents,
    IDictionary<int, Subject> CounterpartSubjects,
    IDictionary<int, EstateUnit> EstateUnits,
    IDictionary<Guid, City> Cities);
}
