using RealGimm.Web.Prop.Models;
using RealGimm.Core.Prop.ContractTypeAggregate;
using RealGimm.Core.Prop.RegistrationOfficeAggregate;
using RealGimm.Core.Prop.BillAggregate;
using RealGimm.Core.Prop.AdministrationAggregate;
using RealGimm.Core.Prop.AdministrationTermAggregate;
using RealGimm.Core.Prop.RegistrationPaymentAggregate;

namespace RealGimm.FunctionalTests.Web;

internal static partial class AssertHelper
{
  public static partial class Prop
  {
    public static void ContractTypeEqual(ContractTypeInput input, ContractType contractType)
    {
      if (input.Id is not null)
      {
        Assert.Equal(input.Id, contractType.Id);
      }

      Assert.Equal(input.Description, contractType.Description);
      Assert.Equal(input.InternalCode, contractType.InternalCode);
      Assert.Equal(input.IsActive, contractType.IsActive);
      Assert.Equal(input.IsStampTax, contractType.IsStampTax);
      Assert.Equal(input.IsRegistrationTax, contractType.IsRegistrationTax);
      Assert.Equal(input.Nature, contractType.Nature);
      Assert.Equal(input.UsageTypeId, contractType.UsageTypeId);
      Assert.Equal(input.IsRentChargeApplicable, contractType.IsRentChargeApplicable);
      Assert.Equal(input.IsAbsoluteRevaluation, contractType.IsAbsoluteRevaluation);
      Assert.Equal(input.IsRevaluationApplicable, contractType.IsRevaluationApplicable);
      Assert.Equal(input.RevaluationRatePercent, contractType.RevaluationRatePercent);
      Assert.Equal(input.RevaluationCalculationMonth, contractType.RevaluationCalculationMonth);
      Assert.Equal(input.RevaluationIndexMonth, contractType.RevaluationIndexMonth);
      Assert.Equal(input.RegistrationTaxPercent, contractType.RegistrationTaxPercent);
      Assert.Equal(input.RegistrationTaxTenantPercent, contractType.RegistrationTaxTenantPercent);
      Assert.Equal(input.RegistrationTaxIncomeType, contractType.RegistrationTaxIncomeType);
    }

    public static void RegistrationOfficeEqual(RegistrationOfficeInput input, RegistrationOffice regOffice)
    {
      if (input.Id is not null)
      {
        Assert.Equal(input.Id, regOffice.Id);
      }

      Assert.Equal(input.Description, regOffice.Description);
      Assert.Equal(input.ExternalCode, regOffice.ExternalCode);
      Assert.Equal(input.CityId, regOffice.CityId);
    }

    public static void BillEqual(BillInput input, Bill bill)
    {
      Assert.Equal(input.Year, bill.Year);
      Assert.Equal(input.TransactorSubjectId, bill.TransactorSubjectId);
      Assert.Equal(input.MainCounterpartSubjectId, bill.MainCounterpartSubjectId);
      Assert.Equal(input.IsOccupiedWithoutRight, bill.IsOccupiedWithoutRight);
      Assert.Equal(input.IsInvoiced, bill.IsInvoiced);
      Assert.Equal(input.TransactorPaymentType, bill.TransactorPaymentType);
      Assert.Equal(input.EmissionType, bill.EmissionType);
      Assert.Equal(input.ContractBillingPeriod, bill.ContractBillingPeriod);
      Assert.Equal(input.TotalAmount, bill.TotalAmount);

      CollectionsEqual(input.BillRows, bill.BillRows, BillRowEqual);
    }

    public static void BillRowEqual(BillRowInput input, BillRow billRow)
    {
      if (input.Id.HasValue)
      {
        Assert.Equal(input.Id, billRow.Id);
      }

      Assert.Equal(input.BillItemTypeId, billRow.ItemType.Id);
      Assert.Equal(input.VATRateId, billRow.VATRateId);
      Assert.Equal(input.Amount, billRow.Amount);
      Assert.Equal(input.Since, billRow.Since);
      Assert.Equal(input.Until, billRow.Until);
      Assert.Equal(input.Notes, billRow.Notes);
    }

    public static void AdministrationEqual(AdministrationInput input, Administration administration)
    {
      Assert.Equal(input.EstateId, administration.EstateId);
      Assert.Equal(input.PaymentType, administration.PaymentType);
      Assert.Equal(input.AdministrationType, administration.AdministrationType);
      Assert.Equal(input.AdministratorSubjectId, administration.AdministratorSubjectId);
      Assert.Equal(input.AdministratorBankAccountId, administration.AdministratorBankAccountId);
      Assert.Equal(input.Since, administration.Since);
      Assert.Equal(input.Until, administration.Until);
      Assert.Equal(input.IsPaymentDataIncluded, administration.IsPaymentDataIncluded);
    }

    public static void AdministrationTermEqual(AdministrationTermInput input, AdministrationTerm administrationTerm)
    {
      Assert.Equal(input.TermType, administrationTerm.TermType);
      Assert.Equal(input.Name, administrationTerm.Name);
      Assert.Equal(input.Since, administrationTerm.Since);
      Assert.Equal(input.Until, administrationTerm.Until);
      Assert.Equal(input.ExpectedAmount, administrationTerm.ExpectedAmount);
      CollectionsEqual(input.Installments, administrationTerm.Installments, TermInstallmentEqual);
    }

    public static void TermInstallmentEqual(TermInstallmentInput input, TermInstallment termInstallment)
    {
      if (input.Id.HasValue)
      {
        Assert.Equal(input.Id, termInstallment.Id);
      }

      Assert.Equal(input.InstallmentNumber, termInstallment.InstallmentNumber);
      Assert.Equal(input.BillItemTypeId, termInstallment.BillItemType.Id);
      Assert.Equal(input.DueDate, termInstallment.DueDate);
      Assert.Equal(input.Amount, termInstallment.Amount);
      Assert.Equal(input.Since, termInstallment.Since);
      Assert.Equal(input.Until, termInstallment.Until);
      Assert.Equal(input.Notes, termInstallment.Notes);
    }

    public static void RegistrationPaymentEqual(RegistrationPaymentInput input, RegistrationPayment registrationPayment)
    {
      if (input.Id is not null)
      {
        Assert.Equal(input.Id, registrationPayment.Id);
      }

      Assert.Equal(input.PaymentYear, registrationPayment.PaymentYear);
      Assert.Equal(input.PaymentCode, registrationPayment.PaymentCode);
      Assert.Equal(input.ValueDate, registrationPayment.ValueDate);
      Assert.Equal(input.TaxAmount, registrationPayment.TaxAmount);
      Assert.Equal(input.SanctionAmount, registrationPayment.SanctionAmount);
      Assert.Equal(input.TotalAmount, registrationPayment.TotalAmount);
      Assert.Equal(input.PaymentYear, registrationPayment.PaymentYear);
      CollectionsEqual(input.Rows, registrationPayment.Rows, RegistrationPaymentRowEqual);
    }
    
    public static void RegistrationPaymentRowEqual(RegistrationPaymentRowInput input, RegistrationPaymentRow registrationPaymentRow)
    {
      if (input.Id.HasValue)
      {
        Assert.Equal(input.Id, registrationPaymentRow.Id);
        Assert.Equal(input.PaymentRowCode, registrationPaymentRow.PaymentRowCode);
        Assert.Equal(input.PaymentRowSection, registrationPaymentRow.PaymentRowSection);
        Assert.Equal(input.PaymentRowReceivingEntity, registrationPaymentRow.PaymentRowReceivingEntity);
        Assert.Equal(input.ReferenceYear, registrationPaymentRow.ReferenceYear);
        Assert.Equal(input.ReferencePeriod, registrationPaymentRow.ReferencePeriod);
        Assert.Equal(input.AmountDue, registrationPaymentRow.AmountDue);
        Assert.Equal(input.AmountCleared, registrationPaymentRow.AmountCleared);
      }
    }
  }
}
