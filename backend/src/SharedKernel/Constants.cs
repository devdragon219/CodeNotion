using System.Drawing;

namespace RealGimm.SharedKernel;

public static class Constants
{
  public const string REDACTED_FIELD = "XXXXXXXXXX";
  public static readonly Color BACKGROUND_COLOR = Color.FromArgb(255, 193, 7);
  public static readonly Color FOREGROUND_COLOR = Color.FromArgb(36, 104, 228);
  public static readonly Color LIGHTGRAY = Color.LightGray;
  public const int MINIMUM_CODE_VALUE = 500;
  public const string SKIP_ACCESS_FILTER = "tag-skip-access-filter";
  public const string SKIP_DEFAULT_ORDERING = "tag-skip-default-ordering";
  public const int MAX_REQUEST_BODY_SIZE = 512 * 1024 * 1024;
  public const string NOTIFICATION_PREFIX = "notify-";
  public const int COUNT_OF_LAST_NOTIFICATIONS_TO_SHOW = 10;
  public const int COUNT_OF_LAST_CONTRACT_EXPIRIES_TO_SHOW = 5;  
  public const int COUNT_OF_USAGE_TYPES_DISTRIBUTION = 2;
  public const int COUNT_OF_ESTATE_UNIT_TYPES_DISTRIBUTION = 2;
  public const string LABEL_WIDGET_OTHER = "Other";
  public const string FIELD_REQUIRES_MATERIALIZATION = "field-requires-materialization";
  public static readonly TimeSpan DEFAULT_EXPORT_DURATION_XML = TimeSpan.FromMinutes(10);
  public static readonly TimeSpan DEFAULT_EXPORT_DURATION_EXCEL = TimeSpan.FromMinutes(10);
  public static readonly TimeSpan DEFAULT_EXPORT_DURATION_ZIP = TimeSpan.FromMinutes(90);
  public static readonly TimeSpan DEFAULT_REPORT_DURATION = TimeSpan.FromMinutes(10);
  public static readonly TimeSpan DEFAULT_IMPORT_TEMPLATE_DURATION = TimeSpan.FromMinutes(10);
  public const string EXPORT_NUMBERFORMAT_CURRENCY = "#,##0.00\\ [$€-2]";
  public const int MAX_FAILED_LOGIN_ATTEMPS_COUNT = 15;
  public const int DEFAULT_PASSWORD_EXPIRATION_DAYS = 30;
  public const int REMINDER_DAYS_BEFORE_PASSWORD_EXPIRATION = 10;
  public const int EXPIRED_PASSWORD_REMOVAL_DAYS = 90;
  public static readonly int[] CONTRACTS_EXPIRATION_DAYS_ARRAY = [30, 15, 7];
  public static readonly int[] COST_CHARGES_EXPIRATION_DAYS_ARRAY = [30, 15, 7];
}
