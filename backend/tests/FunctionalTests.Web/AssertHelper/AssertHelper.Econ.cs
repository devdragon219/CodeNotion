using RealGimm.Core.Econ.TaxCreditAggregate;
using RealGimm.Web.Econ.Models;

namespace RealGimm.FunctionalTests.Web;

internal static partial class AssertHelper
{
  public static class Econ
  {
    public static void TaxCreditEqual(AddTaxCreditInput input, TaxCredit entity)
    {
      Assert.Equal(input.ManagementSubjectId, entity.ManagementSubjectId);
      Assert.Equal(input.TaxCode, entity.TaxCode);
      Assert.Equal(input.Description, entity.Description);
      Assert.Equal(input.Notes, entity.Notes);

      var initialOperation = Assert.Single(entity.Operations);
      Assert.Equal(input.Amount, initialOperation.Amount);
      Assert.Equal(input.Date, initialOperation.Date);
    }
    
    public static void OperationEqual(OperationInput input, Operation entity)
    {
      Assert.Equal(input.Date, entity.Date);
      Assert.Equal(input.Amount, entity.Amount);
      Assert.Equal(input.Notes, entity.Notes);
    }
  }
}
