using Bogus;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RealGimm.Core.CrossModule;
using RealGimm.Core.IAM.UserAggregate;
using RealGimm.Infrastructure.Anag.Data;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Infrastructure.IAM.Data;

public class IAMDemoDataFiller : IDemoDataFiller
{
  private static readonly Faker<Contact> _fakeContact = new Faker<Contact>().UseSeed(0);
  public int ExecutionOrder => 10;
  private readonly IAMDbContext _context;
  private readonly AnagDbContext _anagDbContext;
  private readonly IPasswordAndHashGenerator _passwordGenerator;
  private readonly ILogger<IAMDemoDataFiller> _logger;

  static IAMDemoDataFiller()
  {
    _fakeContact.CustomInstantiator(f => new Contact(
      ContactType.Main,
      f.Phone.PhoneNumber("##########"),
      f.PickRandomParam(
        ContactInfoType.LandlinePhone,
        ContactInfoType.MobilePhone
      )));
  }

  public IAMDemoDataFiller(IAMDbContext context,
    AnagDbContext anagDbContext,
    ILogger<IAMDemoDataFiller> logger,
    IPasswordAndHashGenerator passwordGenerator)
  {
    _context = context;
    _anagDbContext = anagDbContext;
    _logger = logger;
    _passwordGenerator = passwordGenerator;
  }

  public async Task FillAsync(bool shortData, CancellationToken cancellationToken)
  {
    var faker = new Faker<User>().UseSeed(0);

    //Retrieve management subjects for the users
    var managementSubjects = _anagDbContext.Subjects
      .Where(m => m.PersonType == Core.Anag.SubjectAggregate.PersonType.ManagementSubject)
      .Select(m => m.Id)
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .ToArray();

    //Also, bind all management subjects to the Admin user
    // that was automatically created with fixed ID 1
    var admin = _context.Users.FirstOrDefault(u => u.Id == 1);

    if(admin is not null)
    {
      admin.SetSubjectsAndOrgUnits(managementSubjects, null);
      _logger.LogInformation("Attached {ManagementSubjectCount} management subjects to user id 1",
        managementSubjects.Length);
    }

    faker.CustomInstantiator(f =>
    {
      var passAndHash = _passwordGenerator.MakePasswordAndHash();

      var r = new User(f.Internet.Email(),
        UserType.Internal,
        passAndHash.PasswordHash
        );

      r.AddContact(_fakeContact.Generate());
      r.AddContact(_fakeContact.Generate());

      r.SetName(f.Name.FirstName(), f.Name.LastName());
      r.SetOfficeAccess(OfficeAccess.Both);
      r.SetSubjectsAndOrgUnits(f.PickRandom(managementSubjects, 3).ToArray(), null);

      _logger.LogInformation("For user [{Username}] password [{Password}]",
        r.UserName,
        passAndHash.Password);

      return r;
    });

    var data = faker.Generate(shortData ? 10 : 50);
    await _context.AddRangeAsync(data, cancellationToken);
    await _context.SaveChangesAsync(cancellationToken);

    _logger.LogInformation("Users created.");
  }
}
