using RealGimm.Core.Anag;
using RealGimm.Core.CrossModule;
using Xunit;

namespace RealGimm.UnitTests.Core;

public class ContactValidatorTest
{
    [Fact]
    public void CheckEmailCases()
    {
        Assert.True(ContactValidator.CheckEmail("example@example.com"));

        Assert.False(ContactValidator.CheckEmail("GB82WEST12355698765432"));

        Assert.False(ContactValidator.CheckEmail(string.Empty));
        Assert.False(ContactValidator.CheckEmail("AAAAAAAAAAAAA"));
        Assert.False(ContactValidator.CheckEmail("+1 (123) 456-7890"));
        Assert.False(ContactValidator.CheckEmail("7"));
    }

    [Fact]
    public void CheckTelephoneCases()
    {
        Assert.True(ContactValidator.CheckPhone("+1 (123) 456-7890"));

        Assert.False(ContactValidator.CheckPhone("GB82WEST12355698765432"));

        Assert.False(ContactValidator.CheckPhone(string.Empty));
        Assert.False(ContactValidator.CheckPhone("example@example.com"));
        Assert.False(ContactValidator.CheckPhone("AAAAAAAAAAAAA"));
        Assert.False(ContactValidator.CheckPhone("7"));
    }
}
