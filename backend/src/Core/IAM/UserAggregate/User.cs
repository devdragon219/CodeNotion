using RealGimm.SharedKernel.Interfaces;
using RealGimm.Core.IAM.GroupAggregate;
using HotChocolate;
using System.ComponentModel.DataAnnotations;
using RealGimm.SharedKernel.Attributes;
using System.ComponentModel.DataAnnotations.Schema;
using RealGimm.SharedKernel;

namespace RealGimm.Core.IAM.UserAggregate;

public class User : EntityBase, IAggregateRoot, ISoftDeletable
{
  [MaxLength(StrFieldSizes.NAME), Required, FuzzySearchable]
  public string UserName { get; private set; }

  public UserType Type { get; private set; }
  public UserStatus Status { get; private set; } = UserStatus.Active;
  public OfficeAccess OfficeAccess { get; private set; }
  public int? SupplierSubjectId { get; private set; }

  [GraphQLIgnore, MaxLength(StrFieldSizes.HASH_OR_TOKEN)]
  public string? PasswordHash { get; private set; }

  [GraphQLIgnore, MaxLength(StrFieldSizes.HASH_OR_TOKEN)]
  public string? BearerToken { get; private set; }

  [GraphQLIgnore, MaxLength(StrFieldSizes.HASH_OR_TOKEN)]
  public string? ExternalAuthSub { get; private set; }

  [GraphQLIgnore, MaxLength(StrFieldSizes.HASH_OR_TOKEN)]
  public string? ExternalAuthIss { get; private set; }

  [GraphQLIgnore, MaxLength(StrFieldSizes.HASH_OR_TOKEN)]
  public string? ExternalAuthAud { get; private set; }

  public string? PreferredLanguageCode { get; private set; }

  [FuzzySearchable, MaxLength(StrFieldSizes.NAME)]
  public string? FirstName { get; private set; }

  [FuzzySearchable, MaxLength(StrFieldSizes.NAME)]
  public string? LastName { get; private set; }

  [GraphQLIgnore]
  public string FullName => $"{FirstName} {LastName}";

  [FuzzySearchable, MaxLength(StrFieldSizes.NOTES)]
  public string? SuspensionReason { get; private set; }

  public DateTime CreationDate { get; private set; }
  public DateTime? CeasedDate { get; private set; }
  public DateTime? LastPasswordUpdated { get; private set; }
  public DateTime? LastLoggedIn { get; private set; }
  public DateTime? LastLogInAttempt { get; private set; }
  public DateTime? LockedSince { get; private set; }
  public DateTime? LockedUntil { get; private set; }
  public DateTime? EnabledSince { get; private set; }
  public DateTime? DeletionDate { get; private set; }
  public DateTime? PasswordExpiredSince { get; private set; }

  [GraphQLIgnore]
  public int FailedLoginAttemptsCount { get; private set; }

  public NullSafeCollection<WidgetSection> MainDashboard { get; private set; } = [];
  public NullSafeCollection<WidgetSection> FacilityDashboard { get; private set; } = [];

  private readonly List<Contact> _contacts = new();
  private readonly List<Session> _sessions = new();

  public IReadOnlyList<Contact> Contacts => _contacts.AsReadOnly();
  public IReadOnlyList<Session> Sessions => _sessions.AsReadOnly();

  [GraphQLIgnore]
  public List<UserGroup> UserGroups { get; private set; } = new();

  public IReadOnlyCollection<Group> Groups => UserGroups
    .Select(ug => ug.Group)
    .ToList()
    .AsReadOnly();

  public int[]? Subjects { get; private set; }

  public int[]? OrgUnits { get; private set; }

  public User(string userName, UserType type, string? passwordHash)
  {
    UserName = userName.ToLowerInvariant();
    Type = type;
    PasswordHash = passwordHash;
    CreationDate = DateTime.UtcNow;
    EnabledSince = CreationDate;
  }

  public void SetUserName(string userName) => UserName = userName.ToLowerInvariant();

  public void MarkLogin(bool successful)
  {
    LastLogInAttempt = DateTime.UtcNow;
    if (successful)
    {
      LastLoggedIn = LastLogInAttempt;
    }
  }

  public void RemovePassword(DateTime? expirationOverride = null)
  {
    if (!PasswordExpiredSince.HasValue)
    {
      PasswordExpiredSince = expirationOverride ?? DateTime.UtcNow;
    }
    else if (PasswordExpiredSince.Value.AddDays(Constants.EXPIRED_PASSWORD_REMOVAL_DAYS) < DateTime.UtcNow)
    {
      PasswordExpiredSince = null;
      PasswordHash = null;
    }
  }

  public void SetPassword(string newPasswordHash)
  {
    var oldPasswordHash = PasswordHash;

    PasswordHash = newPasswordHash;

    if (!string.Equals(oldPasswordHash, newPasswordHash))
    {
      LastPasswordUpdated = DateTime.UtcNow;
      PasswordExpiredSince = null;
    }
  }

  public void SetLastPasswordUpdated(DateTime dateTime) => LastPasswordUpdated = dateTime;

  private void ResetCeased()
  {
    CeasedDate = null;
  }

  private void ResetActivation()
  {
    EnabledSince = null;
  }

  private void ResetSuspension()
  {
    LockedSince = null;
    SuspensionReason = null;
  }

  public void IncreaseFailedLoginAttemptsCount() => FailedLoginAttemptsCount++;

  public void ResetFailedLoginAttemptsCountAsync() => FailedLoginAttemptsCount = 0;

  public void SetName(string? firstName, string? lastName)
  {
    FirstName = firstName;
    LastName = lastName;
  }

  public void SetType(UserType type)
  {
    Type = type;
  }

  public void SetOfficeAccess(OfficeAccess officeAccess) => OfficeAccess = officeAccess;

  public void SetSupplierSubjectId(int? supplierSubjectId) => SupplierSubjectId = supplierSubjectId;

  public void SetSubjectsAndOrgUnits(int[]? managementSubjects, int[]? managementOrgUnits)
  {
    Subjects = managementSubjects;
    OrgUnits = managementOrgUnits;
  }

  public void CleanExpiredSessions()
  {
    foreach (var s in Sessions.ToList())
    {
      if (s.RefreshTokenExpiration < DateTime.UtcNow)
      {
        _sessions.Remove(s);
      }
    }
  }

  public void RevokeSession(Session s)
  {
    _sessions.Remove(s);
  }

  public void RevokeAllSessions() => _sessions.Clear();

  public void AddSession(Session s)
  {
    _sessions.Add(s);
  }

  public void Activate(UserStatus userStatus, DateTime? enabledSince)
  {
    if (userStatus != UserStatus.Active && enabledSince.HasValue) throw new ArgumentException("User status 'Active' is required for 'EnabledSince' field");
    if (userStatus == UserStatus.Active && !enabledSince.HasValue) throw new ArgumentException("Invalid 'EnabledSince' DateTime value for user status 'Active'");
    if (userStatus == UserStatus.Active)
    {
      Status = userStatus;
      EnabledSince = enabledSince;

      ResetCeased();
      ResetSuspension();
    }
  }

  public void Cease(UserStatus userStatus, DateTime? ceasedDate)
  {
    if (userStatus != UserStatus.Ceased && ceasedDate.HasValue) throw new ArgumentException("User status 'Ceased' is required for 'CeasedDate' field");
    if (userStatus == UserStatus.Ceased && !ceasedDate.HasValue) throw new ArgumentException("Invalid 'Ceased' DateTime value for user status 'Ceased'");
    if (userStatus == UserStatus.Ceased)
    {
      Status = userStatus;
      CeasedDate = ceasedDate;

      ResetSuspension();
      ResetActivation();
    }
  }

  public bool Unlock(string newPasswordHash)
  {
    if (PasswordExpiredSince.HasValue)
    {
      PasswordHash = newPasswordHash;
      LastPasswordUpdated = DateTime.UtcNow;
      PasswordExpiredSince = null;
      Status = UserStatus.Active;
      SuspensionReason = null;
      FailedLoginAttemptsCount = 0;
      return true;
    } else {
      return false;
    }
  }

  public void Suspend(UserStatus userStatus, DateTime? lockedSince, string? suspensionReason)
  {
    if (userStatus != UserStatus.Suspended && lockedSince.HasValue)
      throw new ArgumentException("User status 'Suspended' is required for 'LockedSince' field");

    if (userStatus == UserStatus.Suspended && !lockedSince.HasValue)
      throw new ArgumentException("Invalid 'LockedSince' DateTime value for user status 'Suspended'");

    if (userStatus == UserStatus.Suspended && string.IsNullOrEmpty(suspensionReason))
      throw new ArgumentException("Invalid 'SuspensionReason' value for user status 'Suspended'");

    if (userStatus == UserStatus.Suspended)
    {
      Status = userStatus;
      LockedSince = lockedSince;
      SuspensionReason = suspensionReason;

      ResetCeased();
      ResetActivation();
    }
  }

  public void SetLimitDates(DateTime? enabledSince, DateTime? lockedSince, DateTime? ceasedDate)
  {
    EnabledSince = enabledSince;
    LockedSince = lockedSince;
    CeasedDate = ceasedDate;
  }

  public void SetExternalAuth(string subject, string issuer, string audience)
  {
    ExternalAuthIss = issuer;
    ExternalAuthSub = subject;
    ExternalAuthAud = audience;
  }

  public void AddContact(Contact contact)
  {
    ArgumentNullException.ThrowIfNull(contact);

    _contacts.Add(contact);
  }

  public void ClearContacts()
  {
    _contacts.Clear();
  }

  public void AddGroup(Group group)
  {
    if (!UserGroups.Any(g => g.GroupId == group.Id))
    {
      var ugroup = new UserGroup();
      ugroup.SetGroup(group);
      ugroup.SetUser(this);

      UserGroups.Add(ugroup);
    }
  }

  public void RemoveGroup(Group group)
  {
    var relation = UserGroups.FirstOrDefault(g => g.GroupId == group.Id);
    if (relation != null)
    {
      UserGroups.Remove(relation);
    }
  }

  public void RemoveAllGroups()
  {
    UserGroups.RemoveRange(0, UserGroups.Count);
  }

  public void MarkAsDeleted()
  {
    if (UserGroups.Any()) RemoveAllGroups();

    if (!DeletionDate.HasValue)
    {
      DeletionDate = DateTime.UtcNow;
    }
  }
}
