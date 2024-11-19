using RealGimm.FunctionalTests.Web.Extensions;

namespace RealGimm.FunctionalTests.Web;

internal static partial class GraphQLHelper
{
  public static string ResultFragment(string? valueFragment = null)
    => """
        isSuccess
        status
        validationErrors {
          identifier
          errorMessage
          errorCode
          severity
        }
        """
        .AppendLineIfTrue(valueFragment is not null, new($$"""
        value {
          {{valueFragment}}
        }
        """));

  public static string FileUrlOutputFragment()
    => """
        resourceUrl
        """;
  
  public static string PagableListFragment(string nodeFragment)
    => $$"""
        nodes {
          {{nodeFragment}}
        }
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        """;
}
