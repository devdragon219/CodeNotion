namespace RealGimm.Core.Anag.SubjectCategoryAggregate;

[Flags]
public enum CategoryFunction
{
    None = 0,
    Officer = 1,
    AgreementParty = 2,
    Supplier = 4,
    Employee = 8,
    Landlord = 16,
    Tenant = 32,
    CompanyGroup = 64,
    Heir = 128,
    BuildingAdministrator = 256,
}
