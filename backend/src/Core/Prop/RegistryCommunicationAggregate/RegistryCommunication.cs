using System.ComponentModel.DataAnnotations;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Prop.RegistrationOfficeAggregate;
using RealGimm.Core.Prop.RegistrationPaymentAggregate;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Prop.RegistryCommunicationAggregate;

public class RegistryCommunication : EntityBase, IAggregateRoot
{
  public bool IsSent { get; private set; }
  public bool IsExcluded { get; private set; }
  public DateOnly Date { get; private set; }

  [Required, MaxLength(StrFieldSizes.ISO_COUNTRY)]
  public string CountryISO3 { get; private set; } = null!;

  public RegistrationOffice? Office { get; private set; }
  public CommunicationType Type { get; private set; }
  public string? RegistryNumber { get; private set; }
  public int? DebtBankAccountId { get; private set; }
  public decimal? DebtAmount { get; private set; }
  public int? SenderSubjectId { get; private set; }
  public Contract? Contract { get; private set; }
  public bool HasAnomalies => Anomalies.Any();
  public NullSafeCollection<CommEstateUnit> EstatesUnits { get; private set; } = [];
  public NullSafeCollection<RegistryCommunicationAnomaly> Anomalies { get; private set; } = [];

  [MaxLength(StrFieldSizes.INTERNAL_CODE)]
  public string? ContractCode { get; private set; }

  public int? RequestingSubjectId { get; private set; }
  public int? RequestingSubjectLegalRepresentativeId { get; private set; }

  [MaxLength(StrFieldSizes.INTERNAL_CODE)]
  public string? ContractType { get; private set; }

  public DateOnly? StartDate { get; private set; }
  public DateOnly? EndDate { get; private set; }
  public decimal? ContractFee { get; private set; }
  public bool IsPayingEntireContractFee { get; private set; }
  public decimal? RegistryFee { get; private set; }
  public decimal? StampFee { get; private set; }
  public decimal? RegistryFeePenalty { get; private set; }
  public decimal? StampFeePenalty { get; private set; }
  public decimal? RegistryFeeInterest { get; private set; }
  public decimal? StampFeeInterest { get; private set; }
  public DateOnly? ContractSignatureDate { get; private set; }
  public int? NumberOfPages { get; private set; }
  public int? NumberOfCopies { get; private set; }

  [MaxLength(StrFieldSizes.HASH_OR_TOKEN)]
  public string? AttachedDocumentId { get; private set; }

  public RegistrationPayment? Payment { get; private set; }
  public RegistryCommunicationReceipt? Receipt { get; private set; }

  public void MarkAsExcluded() => IsExcluded = true;
  
  public void MarkAsIncluded() => IsExcluded = false;

  public void SetReceipt(RegistryCommunicationReceipt? receipt) => Receipt = receipt;

  public void SetDate(DateOnly date) => Date = date;

  public void SetCountryISO3(string countryISO3) => CountryISO3 = countryISO3;

  public void SetOffice(RegistrationOffice? office) => Office = office;

  public void SetType(CommunicationType type) => Type = type;

  public void SetRegistryNumber(string? registryNumber) => RegistryNumber = registryNumber;
  
  public void SetDebtAmount(decimal? debtAmount) => DebtAmount = debtAmount;

  public void SetSenderSubjectId(int? senderSubjectId) => SenderSubjectId = senderSubjectId;

  public void SetContract(Contract? contract) => Contract = contract;

  public void SetContractCode(string? contractCode) => ContractCode = contractCode;

  public void SetRequestingSubjectId(int? requestingSubjectId) => RequestingSubjectId = requestingSubjectId;
    
  public void SetContractType(string? contractType) => ContractType = contractType;

  public void SetStartDate(DateOnly? startDate) => StartDate = startDate;

  public void SetEndDate(DateOnly? endDate) => EndDate = endDate;

  public void SetContractFee(decimal? contractFee) => ContractFee = contractFee;

  public void SetIsPayingEntireContractFee(bool isPayingEntireContractFee) => IsPayingEntireContractFee = isPayingEntireContractFee;

  public void SetRegistryFee(decimal? registryFee) => RegistryFee = registryFee;

  public void SetStampFee(decimal? stampFee) => StampFee = stampFee;

  public void SetRegistryFeePenalty(decimal? registryFeePenalty) => RegistryFeePenalty = registryFeePenalty;

  public void SetStampFeePenalty(decimal? stampFeePenalty) => StampFeePenalty = stampFeePenalty;

  public void SetRegistryFeeInterest(decimal? registryFeeInterest) => RegistryFeeInterest = registryFeeInterest;

  public void SetStampFeeInterest(decimal? stampFeeInterest) => StampFeeInterest = stampFeeInterest;

  public void SetContractSignatureDate(DateOnly? contractSignatureDate) => ContractSignatureDate = contractSignatureDate;

  public void SetNumberOfPages(int? numberOfPages) => NumberOfPages = numberOfPages;

  public void SetNumberOfCopies(int? numberOfCopies) => NumberOfCopies = numberOfCopies;

  public void SetAttachedDocumentId(string? attachedDocumentId) => AttachedDocumentId = attachedDocumentId;

  public void SetPayment(RegistrationPayment? payment) => Payment = payment;

  public void Confirm(DateOnly date, int requestingSubjectLegalRepresentativeId, int debtBankAccountId)
  {
    IsSent = true;
    Date = date;
    RequestingSubjectLegalRepresentativeId = requestingSubjectLegalRepresentativeId;
    DebtBankAccountId = debtBankAccountId;
  }

  public void CancelConfirmation()
  {
    IsSent = false;
    RequestingSubjectLegalRepresentativeId = null;
    DebtBankAccountId = null;
  }
}
