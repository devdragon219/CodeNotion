using System.Reflection;

namespace RealGimm.Core.IAM;

public static class Features
{
  public const string ANAG_SUBJECT_BASE = "121";
  public const string ANAG_SUBJECT_CATEGORY = "131";
  public const string ANAG_SUBJECT_ORGUNIT = "126";
  public const string ASST_ESTATE_BASE = "211";
  public const string ASST_ESTATE_CATALOGUE = "212";
  public const string ASST_ESTATEUNIT_BASE = "214";
  public const string ASST_ESTATEUNIT_VARIATION = "215";
  public const string ASST_CADASTRALUNIT_BASE = "217";
  public const string ASST_CATALOGUE_CONFIG = "230";
  public const string ASST_CADASTRAL_LAND_CATEGORY = "240";
  public const string ASST_ASSET_TAX_BASE = "250";
  public const string COMMON_VATRATES = "311";
  public const string COMMON_INTERESTRATES = "321";
  public const string COMMON_ACCOUNTINGITEMS = "322";
  public const string COMMON_BILLITEMTYPES = "323";
  public const string COMMON_REVALUATIONDATA = "324";
  public const string COMMON_CITIES = "331";
  public const string COMMON_TAX_RATES = "341";
  public const string COMMON_REPORT_GENERATORS = "351";
  public const string DOCUMENTS_BASE = "401";
  public const string PROP_CONTRACT_BASE = "501";
  public const string PROP_CONTRACT_TYPES = "511";
  public const string PROP_REGISTRATION_OFFICES = "512";
  public const string PROP_BILL_BASE = "521";
  public const string PROP_ADMINISTRATION_BASE = "531";
  public const string PROP_REGISTRY_COMMUNICATION = "541";
  public const string PROP_REGISTRATION_PAYMENT = "551";
  public const string NRGY_TYPE_BASE = "601";
  public const string NRGY_SERVICE_BASE = "611";
  public const string NRGY_COSTCHARGE_BASE = "621";
  public const string ECON_TAX_CREDIT_BASE = "701";
  public const string FCLT_ESTATE_UNIT_GROUP_BASE = "800";
  public const string FCLT_CONTRACT_BASE = "810";
  public const string FCLT_CONTRACT_TEMPLATES = "811";
  public const string FCLT_CONTRACT_TYPES = "812";
  public const string FCLT_SLA_BASE = "820";
  public const string FCLT_CONFIG = "830";
  public const string FCLT_PENALTY_BASE = "840";
  public const string FCLT_PRICE_LIST_BASE = "850";
  public const string FCLT_PRICE_LIST_ARTICLES = "851";
  public const string FCLT_TICKET = "860";
  public const string FCLT_SERVICE_CATEGORY = "865";
  public const string FCLT_SERVICE = "870";
  public const string ADMIN_SETTINGS = "911";
  public const string ADMIN_USERS_AND_GROUPS = "921";
  public const string ADMIN_AUDIT_LOG = "922";
  public const string ADMIN_CONFIG = "923";

  public static IEnumerable<string> UserFeatureList()
  {
    return typeof(Features)
        .GetFields(BindingFlags.Public | BindingFlags.Static | BindingFlags.FlattenHierarchy)
        .Where(f => f.IsLiteral && !f.IsInitOnly && f.FieldType == typeof(string) && !f.Name.StartsWith("ADMIN_"))
        .Select(f => (f.GetRawConstantValue() as string) ?? string.Empty);
  }

  public static IEnumerable<string> AdminFeatureList()
  {
    return typeof(Features)
        .GetFields(BindingFlags.Public | BindingFlags.Static | BindingFlags.FlattenHierarchy)
        .Where(f => f.IsLiteral && !f.IsInitOnly && f.FieldType == typeof(string) && f.Name.StartsWith("ADMIN_"))
        .Select(f => (f.GetRawConstantValue() as string) ?? string.Empty);
  }

  public static IEnumerable<string> AllFeatureList()
  {
    return typeof(Features)
        .GetFields(BindingFlags.Public | BindingFlags.Static | BindingFlags.FlattenHierarchy)
        .Where(f => f.IsLiteral && !f.IsInitOnly && f.FieldType == typeof(string))
        .Select(f => (f.GetRawConstantValue() as string) ?? string.Empty);
  }
}
