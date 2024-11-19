using System.Globalization;
using System.Linq;
using System.Security.Policy;
using System.Xml.Linq;
using Elders.Iso3166;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.Core.CrossModule;
using RealGimm.Core.Prop.BillAggregate;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.Core.Shared.Specifications;
using Rebus.Messages;

namespace RealGimm.Core.Prop.Services;

public sealed class BillSepaXmlGenerator : IXmlGenerator<IEnumerable<Bill>>
{
  private readonly IRepository<VATRate> _vatRateRepository;
  private readonly IRepository<Subject> _subjectRepository;

  public BillSepaXmlGenerator(IRepository<VATRate> vatRateRepository, IRepository<Subject> subjectRepository)
  {
    _vatRateRepository = vatRateRepository;
    _subjectRepository = subjectRepository;
  }

  public async Task<XDocument> GenerateXmlAsync(IEnumerable<Bill> bills, CancellationToken cancellationToken)
  {
    var managementSubject = await _subjectRepository
      .AsQueryable(new GetByIdSpec<Subject>(bills.First().Contract!.ManagementSubjectId))
      .OfType<ManagementSubject>()
      .Select(subject => new
      {
        subject.Name,
        subject.BankingId1,
        subject.BankingId2,
        Iban = subject.BankAccounts.First(bankAccount => bankAccount.ReferenceCodeType == BankAccountCodeType.IBAN).ReferenceCode!,
        FiscalAddress = subject.Addresses.FirstOrDefault(address => address.AddressType == AddressType.Fiscal),
        IsItalyLocated = subject.Addresses.Any(address => address.CountryISO == CountryISO3.ITA)
      })
      .SingleAsync(cancellationToken);

    if (!managementSubject.IsItalyLocated)
    {
      throw new InvalidOperationException(
        "Only Italian management subjects are supported, due to the CBI code being the single supported CUC code");
    }

    var vatRates = await _vatRateRepository
      .AsQueryable(new GetByIdsSpec<VATRate>(bills.SelectMany(bill => bill.BillRows).Select(row => row.VATRateId).Distinct()))
      .Select(vatRate => new { vatRate.Id, vatRate.RatePercent })
      .ToDictionaryAsync(vatRate => vatRate.Id, vatRate => (decimal)vatRate.RatePercent, cancellationToken);

    var transactorSubjects = await _subjectRepository
      .AsQueryable(new GetByIdsSpec<Subject>(bills.Select(bill => bill.TransactorSubjectId).Distinct()))
      .Select(subject => new
      {
        subject.Id,
        BankAccount = subject.BankAccounts.First(bankAccount => bankAccount.ReferenceCodeType == BankAccountCodeType.IBAN),
        FiscalAddress = subject.Addresses.FirstOrDefault(address => address.AddressType == AddressType.Fiscal)
      })
      .ToDictionaryAsync(subject => subject.Id, cancellationToken);

    var totalVatAmountsPerBill = bills.ToDictionary(
      bill => bill.Id,
      bill => bill.TotalAmount + bill.BillRows.Sum(row => row.Amount * vatRates[row.VATRateId] / 100m));

    var groupHeader = new GroupHeader(
      MessageId: Guid.NewGuid().ToString("N"),
      CreationDateTime: bills.First().FinalDate!.Value,
      NumberOfTransactions: bills.Count(),
      TotalAmount: totalVatAmountsPerBill.Values.Sum(),
      managementSubject.Name,
      managementSubject.BankingId1!);

    var paymentsInfos = bills
      .GroupBy(bill => bill.Date)
      .Select(group =>
      {
        var paymentInfoId = Guid.NewGuid().ToString("N");

        var creditTransferTrnsactionInfos = bills
          .Select((bill, index) => new CreditTransferTransactionInfo(
            InstructionId: index + 1,
            EndToEndInstructionId: $"{paymentInfoId}{(index + 1).ToString().PadLeft(3, '0')}", // max length is 35, guid (32) + number (3)
            bill.TransactorPaymentType,
            Amount: totalVatAmountsPerBill[bill.Id],
            Comment: $"Mandato di pagamento {bill.InternalCode}",
            transactorSubjects[bill.TransactorSubjectId].BankAccount.ReferenceCode!,
            transactorSubjects[bill.TransactorSubjectId].BankAccount.AccountHolder!,
            transactorSubjects[bill.TransactorSubjectId].FiscalAddress))
          .ToArray();

        return new PaymentInfo(
          paymentInfoId,
          Date: group.Key,
          managementSubject.Name,
          managementSubject.BankingId2!,
          managementSubject.Iban,
          managementSubject.FiscalAddress,
          creditTransferTrnsactionInfos);
      })
      .ToArray();

    var @namespace = XNamespace.Get("urn:CBI:xsd:CBIPaymentRequest.00.04.01");

    var document = new XDocument(
      new XDeclaration("1.0", "utf-8", null),
      new XElement(@namespace + "CBIPaymentRequest",
        [
          CreateGroupHeaderElement(@namespace, groupHeader),
          ..paymentsInfos.Select(paymentInfo => CreatePaymentInfoElement(@namespace, paymentInfo))
        ]));

    return document;
  }

  private static XElement CreateGroupHeaderElement(XNamespace @namespace, GroupHeader groupHeader)
    => new(@namespace + "GrpHdr",
        new XElement(@namespace + "MsgId", groupHeader.MessageId),
        new XElement(@namespace + "CreDtTm", groupHeader.CreationDateTime.ToString("o", CultureInfo.InvariantCulture)),
        new XElement(@namespace + "NbOfTxs", groupHeader.NumberOfTransactions),        
        new XElement(@namespace + "CtrlSum", decimal.Round(groupHeader.TotalAmount, 2).ToString(CultureInfo.InvariantCulture)),

        new XElement(@namespace + "InitgPty",
          new XElement(@namespace + "Nm", groupHeader.ManagementSubjectName),
          new XElement(@namespace + "Id",
            new XElement(@namespace + "OrgId",
              new XElement(@namespace + "Othr",
                new XElement(@namespace + "Id", groupHeader.ManagementSubjectBankingId),
                new XElement(@namespace + "Issr", "CBI"))))));

  private static XElement CreatePaymentInfoElement(XNamespace @namespace, PaymentInfo info)
  {
    var element = new XElement(@namespace + "PmtInf",
      new XElement(@namespace + "PmtInfId", info.Id),
      new XElement(@namespace + "PmtMtd", "TRA"),
      new XElement(@namespace + "BtchBookg", "true"),

      new XElement(@namespace + "PmtTpInf",
        new XElement(@namespace + "InstrPrty", "NORM"),
        new XElement(@namespace + "SvcLvl",
          new XElement(@namespace + "Cd", "SEPA"))),

      new XElement(@namespace + "ReqdExctnDt",
        new XElement(@namespace + "Dt", info.Date.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture))),

      new XElement(@namespace + "Dbtr",
        new XElement(@namespace + "Nm", info.ManagementSubjectName)),

      new XElement(@namespace + "DbtrAcct",
        new XElement(@namespace + "Id",
          new XElement(@namespace + "IBAN", info.ManagementSubjectIban))),

      new XElement(@namespace + "DbtrAgt",
        new XElement(@namespace + "FinInstnId",
          new XElement(@namespace + "ClrSysMmbId",
            new XElement(@namespace + "MmbId", info.ManagementSubjectBankingId)))),

      new XElement(@namespace + "ChrgBr", "SLEV"));

    element.Add(
      info.TransactionsInfos
        .Select(transactionInfo => CreateCreditTransferTransactionInformationElement(@namespace, transactionInfo)));

    if (info.ManagementSubjectFiscalAddress is not null)
    {
      var countryIso2 = Country.GetAllCountries()
        .Single(country => country.ThreeLetterCode == info.ManagementSubjectFiscalAddress.CountryISO)
        .TwoLetterCode;

      var addressElement = new XElement(@namespace + "PstlAdr",
        new XElement(@namespace + "Ctry", countryIso2),
        new XElement(@namespace + "TwnNm", info.ManagementSubjectFiscalAddress.CityName),
        new XElement(@namespace + "StrtNm", info.ManagementSubjectFiscalAddress.Toponymy),
        new XElement(@namespace + "PstlCd", info.ManagementSubjectFiscalAddress.LocalPostCode));

      element.Element(@namespace + "Dbtr")!.Add(addressElement);
    }

    return element;
  }

  private static XElement CreateCreditTransferTransactionInformationElement(
    XNamespace @namespace,
    CreditTransferTransactionInfo info)
  {
    var element = new XElement(@namespace + "CdtTrfTxInf",
        new XElement(@namespace + "PmtId",
          new XElement(@namespace + "InstrId", info.InstructionId),
          new XElement(@namespace + "EndToEndId", info.EndToEndInstructionId)),

        new XElement(@namespace + "PmtTpInf",
          new XElement(@namespace + "CtgyPurp",
            new XElement(@namespace + "Cd", "SUPP"))),

        new XElement(@namespace + "Amt",
          new XElement(@namespace + "InstdAmt", new XAttribute("Ccy", "EUR"),
            decimal.Round(info.Amount, 2, MidpointRounding.AwayFromZero).ToString(CultureInfo.InvariantCulture))),

        new XElement(@namespace + "Cdtr",
          new XElement(@namespace + "Nm", info.AccountHolder)),

        new XElement(@namespace + "CdtrAcct",
          new XElement(@namespace + "Id",
            new XElement(@namespace + "IBAN", info.Iban))),

        new XElement(@namespace + "RgltryRptg",
          new XElement(@namespace + "DbtCdtRptgInd", "DEBT")),

        new XElement(@namespace + "RmtInf",
          new XElement(@namespace + "Ustrd", info.Comment)));

    if (info.TransactorFiscalAddress is not null)
    {
      var countryIso2 = Country.GetAllCountries()
        .Single(country => country.ThreeLetterCode == info.TransactorFiscalAddress.CountryISO)
        .TwoLetterCode;

      var addressElement = new XElement(@namespace + "PstlAdr",
          new XElement(@namespace + "Ctry", countryIso2),
          new XElement(@namespace + "TwnNm", info.TransactorFiscalAddress.CityName),
          new XElement(@namespace + "StrtNm", info.TransactorFiscalAddress.Toponymy),
          new XElement(@namespace + "PstlCd", info.TransactorFiscalAddress.LocalPostCode));

      element.Element(@namespace + "Cdtr")!.Add(addressElement);
    }

    return element;
  }

  private record PaymentInfo(
    string Id,
    DateOnly Date,
    string ManagementSubjectName,
    string ManagementSubjectBankingId,
    string ManagementSubjectIban,
    Address? ManagementSubjectFiscalAddress,
    CreditTransferTransactionInfo[] TransactionsInfos);

  private record GroupHeader(
    string MessageId,
    DateTime CreationDateTime,
    int NumberOfTransactions,
    decimal TotalAmount,
    string ManagementSubjectName,
    string ManagementSubjectBankingId);

  private record CreditTransferTransactionInfo(
    int InstructionId,
    string EndToEndInstructionId,
    PaymentType PaymentType,
    decimal Amount,
    string Comment,
    string Iban,
    string AccountHolder,
    Address? TransactorFiscalAddress);
}
