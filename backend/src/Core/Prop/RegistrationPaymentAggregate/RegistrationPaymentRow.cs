using System.ComponentModel.DataAnnotations;

namespace RealGimm.Core.Prop.RegistrationPaymentAggregate;

public class RegistrationPaymentRow : EntityBase
{
  public RegistrationPayment Payment { get; private set; } = default!;

  [Required, MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  //For Italian F24 model, "Codice Tributo"
  public string PaymentRowCode { get; private set; } = default!;

  [MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  //For Italian F24 model, "Sezione"
  public string? PaymentRowSection { get; private set; }

  [MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  //For Italian F24 model, "Codice Ente"
  public string? PaymentRowReceivingEntity { get; private set; }

  //For Italian F24 model, "Anno di riferimento"
  public int ReferenceYear { get; private set; }

  //For Italian F24 model, "Rateazione/periodo"
  public int? ReferencePeriod { get; private set; }

  //For Italian F24 model, "Importo versato"
  public decimal AmountDue { get; private set; }

  //For Italian F24 model, "Importo a credito/compensato"
  public decimal? AmountCleared { get; private set; }

  public void SetPaymentRowCode(string paymentRowCode) => PaymentRowCode = paymentRowCode;

  public void SetPaymentRowSection(string? paymentRowSection) => PaymentRowSection = paymentRowSection;

  public void SetPaymentRowReceivingEntity(string? paymentRowReceivingEntity) => PaymentRowReceivingEntity = paymentRowReceivingEntity;

  public void SetReferenceYear(int referenceYear) => ReferenceYear = referenceYear;

  public void SetReferencePeriod(int? referencePeriod) => ReferencePeriod = referencePeriod;

  public void SetAmountDue(decimal amountDue) => AmountDue = amountDue;

  public void SetAmountCleared(decimal? amountCleared) => AmountCleared = amountCleared;

}
