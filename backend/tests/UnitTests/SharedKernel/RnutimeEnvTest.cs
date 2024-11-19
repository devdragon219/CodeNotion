using RealGimm.SharedKernel;
using Xunit;

namespace RealGimm.UnitTests.SharedKernel;

public class RuntimeEnvTest
{
    [Fact]
    public void CheckRecognition()
    {
      var dict = new Dictionary<string, object?>();

      Assert.False(RuntimeEnv.IsDevelopment(dict));

      dict.Add(RuntimeEnv.ENV, null);

      Assert.False(RuntimeEnv.IsDevelopment(dict));

      dict[RuntimeEnv.ENV] = RuntimeEnv.PROD;

      Assert.False(RuntimeEnv.IsDevelopment(dict));

      dict[RuntimeEnv.ENV] = RuntimeEnv.DEV;

      Assert.True(RuntimeEnv.IsDevelopment(dict));
    }
}