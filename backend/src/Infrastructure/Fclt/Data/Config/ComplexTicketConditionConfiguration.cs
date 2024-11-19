using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Fclt.SLAAggregate;

namespace RealGimm.Infrastructure.Fclt.Data.Config;

[FcltConfig]
public class ComplexTicketConditionConfiguration : IEntityTypeConfiguration<ComplexTicketCondition>,
  IDatabaseDependentConfiguration
{
  public SupportedDbDialect DbDialect { get; set; }

  public void Configure(EntityTypeBuilder<ComplexTicketCondition> builder)
  {
    builder.HasBaseType<TicketCondition>();

    builder
      .HasMany(condition => condition.InternalConditions)
      .WithOne()
      .OnDelete(DbDialect == SupportedDbDialect.MsSqlServer
        ? DeleteBehavior.ClientCascade
        : DeleteBehavior.Cascade);
  }
}
