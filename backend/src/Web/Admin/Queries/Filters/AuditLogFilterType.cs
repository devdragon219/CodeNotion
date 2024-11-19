using HotChocolate.Data.Filters;
using RealGimm.Core.Common.AuditLogAggregate;

namespace RealGimm.Web.Admin.Queries.Filters;

public class AuditLogFilterType : FilterInputType<AuditLog>
{
    protected override void Configure(IFilterInputTypeDescriptor<AuditLog> descriptor)
    {
        descriptor.BindFieldsExplicitly();
        descriptor.Field(f => f.AuditDate);
        descriptor.Field(f => f.Action);
        descriptor.Field(f => f.EntityType);
        descriptor.Field(f => f.TablePk);
    }
}
