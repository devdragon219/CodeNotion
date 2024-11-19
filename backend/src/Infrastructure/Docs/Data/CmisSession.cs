using Microsoft.Extensions.Logging;
using PortCMIS;
using PortCMIS.Client;
using PortCMIS.Exceptions;
using RealGimm.Core.Common.ConfigAggregate;
using RealGimm.Core.Common.Interfaces;
using RealGimm.Infrastructure.Docs.Types;

namespace RealGimm.Infrastructure.Docs.Data;

public class CmisSession : IConfigurableModule
{
  public static readonly string CMIS_ATOMURL = "cmis-atom-url";
  public static readonly string CMIS_USERNAME = "cmis-username";
  public static readonly string CMIS_PASSWORD = "cmis-password";
  public static readonly string CMIS_BASE_DIRECTORY = "cmis-basedir";
  private string? _queryName;
  private IObjectType? _documentType;
  private readonly ILogger<CmisSession> _logger;
  private readonly ICmisConfigProvider _configProvider;

  public CmisSession(ILogger<CmisSession> logger,
    ICmisConfigProvider configProvider)
  {
    _logger = logger;
    _configProvider = configProvider;
  }

  public async Task EnsureInitializedAsync(CancellationToken cancellationToken)
  {
    if (_session is not null) return;

    await _configProvider.InitializeAsync(cancellationToken);
    var atomUrl = _configProvider.AtomUrl;
    var username = _configProvider.Username;
    var password = _configProvider.Password;

    if (string.IsNullOrEmpty(atomUrl))
    {
      throw new InvalidOperationException("Atom URL is not configured for CMIS repository");
    }

    ISessionFactory sessionFactory = PortCMIS.Client.Impl.SessionFactory.NewInstance();

    Dictionary<string, string> parameters = new()
    {
      [SessionParameter.BindingType] = BindingType.AtomPub,
      [SessionParameter.AtomPubUrl] = atomUrl!,
      [SessionParameter.PreemptivAuthentication] = "true"
    };

    if (!string.IsNullOrEmpty(username) && !string.IsNullOrEmpty(password))
    {
      parameters.Add(SessionParameter.User, username);
      parameters.Add(SessionParameter.Password, password);
    }

    var repositories = sessionFactory.GetRepositories(parameters);

    _session = repositories[0].CreateSession();

    // Heuristic auto-detection of dialects
    if (_session.RepositoryInfo.VendorName.ToLowerInvariant().Contains("alfresco"))
    {
      _cmisDialect = CmisDialect.ALFRESCO;
    }
  }

  public string DocumentType => _cmisDialect switch
  {
    CmisDialect.ALFRESCO => "D:" + CmisTypes.RG_DOCUMENT,
    _ => CmisTypes.RG_DOCUMENT,
  };

  private ISession? _session = null;
  private CmisDialect _cmisDialect;
  public ISession Session
  {
    get
    {
      if (_session == null)
      {
        throw new InvalidOperationException("Ensure the CMIS session has been successfully initialized");
      }

      return _session;
    }
  }

  public string DocumentQueryName => _queryName ?? DocumentType;

  public string[] ConfigurationParameters => new[] {
    CMIS_ATOMURL,
    CMIS_USERNAME,
    CMIS_PASSWORD
  };

  public ConfigFunction Function => ConfigFunction.CMISEndpoint;

  public IObjectType EnsureDocumentTypeExists()
  {
    if (_documentType is not null) return _documentType;

    try
    {
      var documentType = Session!.GetTypeDefinition(DocumentType);
      if (documentType != null)
      {
        _queryName = documentType.QueryName;
        _documentType = documentType;
        return documentType;
      }
    }
    catch (CmisObjectNotFoundException)
    {
      _logger.LogInformation("Document type {docType} does not exist in CMIS repository.",
        DocumentType);
    }

    if (Session.RepositoryInfo.CmisVersion == PortCMIS.Enums.CmisVersion.Cmis_1_0)
    {
      throw new InvalidOperationException("This CMIS repository does not support type management");
    }

    try
    {
      return Session.CreateType(new RgDocument());
    }
    catch (CmisNotSupportedException cmex)
    {
      _logger.LogError(cmex, "This CMIS repository does not support type creation");
      throw;
    }
  }

  public IFolder? GetOrCreateFolder(params string?[] pathComponent)
  {
    //First check if base folder is set
    var containerPath = $"/{_configProvider.BaseDirectory ?? string.Empty}";

    IFolder? containerFolder = Session.GetObjectByPath(containerPath) as IFolder
      ?? throw new NotSupportedException($"Unable to find base folder {containerPath}");

    foreach (var pc in pathComponent.Where(p => !string.IsNullOrEmpty(p)))
    {
      IFolder? newContainer = null;

      var newPath = $"{containerPath.TrimEnd('/')}/{pc}";

      try
      {
        newContainer = Session.GetObjectByPath(newPath) as IFolder;
      }
      catch (CmisObjectNotFoundException) { }

      //Check if we can create a sub-folder inside the current one

      if (newContainer is null)
      {
        if (!containerFolder.HasAllowableAction(PortCMIS.Enums.Action.CanCreateFolder))
        {
          throw new NotSupportedException($"Unable to create {newPath} folder");
        }

        try
        {
          newContainer = containerFolder
              .CreateFolder(new Dictionary<string, object>{
                    {PropertyIds.ObjectTypeId, "cmis:folder"},
                    {PropertyIds.Name, pc!}
              });
        }
        catch (CmisNameConstraintViolationException e)
        {
          _logger.LogWarning(e, "Duplicate folder name exception");
          newContainer = Session.GetObjectByPath($"{containerPath}/{pc}") as IFolder;

          if (newContainer is null)
          {
            throw new NotSupportedException($"Invalid sequence trying to create {containerPath}/{pc} folder");
          }
        }
      }

      containerFolder = newContainer;
      containerPath = newPath;
    }

    return containerFolder;
  }
}