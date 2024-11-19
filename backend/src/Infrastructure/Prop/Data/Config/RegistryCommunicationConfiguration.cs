using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Prop.RegistryCommunicationAggregate;

namespace RealGimm.Infrastructure.Prop.Data.Config;

[PropConfig]
public class RegistryCommunicationConfiguration : IEntityTypeConfiguration<RegistryCommunication>
{
  public void Configure(EntityTypeBuilder<RegistryCommunication> builder)
  {
    builder.OwnsMany(communication => communication.Anomalies);

    builder.OwnsOne(communication => communication.Receipt);

    builder
      .HasMany(communication => communication.EstatesUnits)
      .WithOne()
      .OnDelete(DeleteBehavior.Cascade);
  }
}
