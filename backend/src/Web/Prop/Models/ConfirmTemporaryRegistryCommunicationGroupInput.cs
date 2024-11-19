namespace RealGimm.Web.Prop.Models;

public record ConfirmTemporaryRegistryCommunicationGroupInput(
  int ManagementSubjectId,
  DateOnly Date,
  int RequestingSubjectLegalRepresentativeId,
  int DebtBankAccountId);
