using RealGimm.Core.Anag.SubjectAggregate;

namespace RealGimm.Web.Anag.Extensions;

public class PhysicalSubjectExtension : ObjectTypeExtension<PhysicalSubject>
{
  protected override void Configure(IObjectTypeDescriptor<PhysicalSubject> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor
      .Ignore(p => p.CompanyGroupParent)
      .Ignore(p => p.DomainEvents);
  }
}
