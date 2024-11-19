using RealGimm.Core.Anag;
using Xunit;

namespace RealGimm.UnitTests.Core;

public class BankAccountValidatorTest
{
    [Fact]
    public void CheckCases()
    {
        Assert.True(BankAccountValidator.CheckIBAN("GB82WEST12345698765432"));

        Assert.False(BankAccountValidator.CheckIBAN("GB82WEST12355698765432"));

        Assert.False(BankAccountValidator.CheckIBAN(string.Empty));
        Assert.False(BankAccountValidator.CheckIBAN("example@example.com"));
        Assert.False(BankAccountValidator.CheckIBAN("+1 (123) 456-7890"));
        Assert.False(BankAccountValidator.CheckIBAN("AAAAAAAAAAAAAAAAAAAAA"));

        Assert.False(BankAccountValidator.CheckIBAN("7"));
    }
}