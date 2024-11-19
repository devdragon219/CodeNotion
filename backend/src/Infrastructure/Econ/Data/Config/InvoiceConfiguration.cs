using RealGimm.Core.Econ.InvoiceAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace RealGimm.Infrastructure.Econ.Data.Config;

[EconConfig]
public class InvoiceConfiguration : IEntityTypeConfiguration<Invoice>
{
  public void Configure(EntityTypeBuilder<Invoice> builder)
  {
  }
}
