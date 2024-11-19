using RealGimm.FunctionalTests.Web.Extensions;

namespace RealGimm.FunctionalTests.Web;

internal static partial class GraphQLHelper
{
  public static class Econ
  {
    public static string TaxCreditFragment(bool includeOperations = false)
      => """
          id
          managementSubjectId
          taxCode
          description
          notes
          """
          .AppendLineIfTrue(includeOperations, new(() => $$"""
          operations {
            {{OperationFragment()}}
          }
          """));

    public static string OperationFragment()
      => """
          id
          date
          amount
          assetTaxPaymentId
          notes
          since
          until
          """;

    public static string GroupedOperationOutputFragment()
      => """
          ids
          date
          amount
          notes
          """;
  }
}
