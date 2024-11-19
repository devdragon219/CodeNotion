namespace RealGimm.Core.Reports;

public record F24RecapRow(string SubjectName, string BaseCountryTaxIdCode, DateOnly PaymentDate, decimal Amount, string? IBAN);