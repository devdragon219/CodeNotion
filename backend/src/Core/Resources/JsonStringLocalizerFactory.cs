using Microsoft.Extensions.Localization;

namespace RealGimm.Core.Resources;

public class JsonStringLocalizerFactory : IStringLocalizerFactory
{
    public IStringLocalizer Create(Type resourceSource) =>
        new JsonStringLocalizer(resourceSource.Name);

    public IStringLocalizer Create(string baseName, string location) =>
        new JsonStringLocalizer(baseName);
}
