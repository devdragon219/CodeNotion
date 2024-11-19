using RealGimm.FunctionalTests.Web.Extensions;

namespace RealGimm.FunctionalTests.Web;

internal static partial class GraphQLHelper
{
  public static class Admin
  {
    public static string UserFragment(
      bool includeWidgetConfig = false,
      bool includeContacts = false,
      bool includeSessions = false,
      bool includeGroups = false)
      => $$"""
          id
          userName
          type
          status
          preferredLanguageCode
          firstName
          lastName
          suspensionReason
          ceasedDate
          lastPasswordUpdated
          lastLoggedIn
          lastLogInAttempt
          lockedSince
          lockedUntil
          deletionDate
          passwordExpiredSince
          subjects
          orgUnits
          """
          .AppendLineIfTrue(includeWidgetConfig, new(() => $$"""
          mainDashboard {
            {{WidgetSectionFragment()}}
          }
          """))
          .AppendLineIfTrue(includeWidgetConfig, new(() => $$"""
          facilityDashboard {
            {{WidgetSectionFragment()}}
          }
          """))
          .AppendLineIfTrue(includeContacts, new(() => $$"""
          contacts {
            {{Common.ContactFragment()}}
          }
          """))
          .AppendLineIfTrue(includeSessions, new(() => $$"""
          sessions {
            {{SessionFragment()}}
          }
          """))
          .AppendLineIfTrue(includeGroups, new(() => $$"""
          groups {
            {{GroupFragment()}}
          }
          """));

    public static string WidgetSectionFragment() => $$"""
      id
      title
      backgroundColor
      rows {
        {{WidgetSectionRowFragment()}}
      }  
      """;

    public static string WidgetSectionRowFragment() => $$"""
      id
      widgets {
        {{WidgetConfigFragment()}}
      }  
      """;

    public static string WidgetConfigFragment() => """
      id
      width
      type   
      """;

    public static string SessionFragment() => """
      id
      loginUserAgent
      loginIPAddress
      loginLocation
      lastRefreshIPAddress
      lastRefreshLocation
      lastRefreshUserAgent
      refreshTokenExpiration
      """;

    public static string GroupFragment(bool includeFeatures = false, bool includeUsers = false) => """
      id
      name
      description
      """
      .AppendLineIfTrue(includeFeatures, new(() => $$"""
      features {
        {{GroupFeatureFragment()}}
      }
      """))
      .AppendLineIfTrue(includeUsers, new(() => $$"""
      users {
        {{UserFragment()}}
      }
      """));

    public static string GroupFeatureFragment(bool includeGroup = false) => """
      feature
      groupId
      canRead
      canCreate
      canUpdate
      canDelete
      """
      .AppendLineIfTrue(includeGroup, new(() => $$"""
      group {
        {{GroupFragment()}}
      }
      """));
  }
}
