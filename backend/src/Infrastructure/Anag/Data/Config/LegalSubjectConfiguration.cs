using RealGimm.Core.Anag.SubjectAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace RealGimm.Infrastructure.Anag.Data.Config;

[AnagConfig]
public class LegalSubjectConfiguration : IEntityTypeConfiguration<LegalSubject>
{
  public void Configure(EntityTypeBuilder<LegalSubject> builder)
  {
    builder.Property(p => p.BaseCountryTaxIdCode)
      .HasColumnName("BaseCountryTaxIdCode");

    builder.Property(p => p.AdditionalTaxIdCode)
      .HasColumnName("AdditionalTaxIdCode");

    builder.Property(p => p.BaseCountryISO)
      .HasColumnName("BaseCountryISO")
      .HasConversion(ValueConverters.UpperNullableConverter);

    builder.Property(p => p.Location)
      .HasColumnName("Location");

    builder.Property(p => p.BusinessStart)
      .HasColumnName("BusinessStart");

    builder.Property(p => p.ShareCapital)
      .HasColumnName("ShareCapital");

    builder.Property(p => p.CompaniesHouseIdCode)
      .HasColumnName("CompaniesHouseIdCode");

    builder.Property(p => p.AdditionalGovIdCode)
      .HasColumnName("AdditionalGovIdCode");

    builder.Property(p => p.InterGroupSignature)
      .HasColumnName("InterGroupSignature");
      
    builder.Property(p => p.BankingId1)
      .HasColumnName("BankingId1");

    builder.Property(p => p.BankingId2)
      .HasColumnName("BankingId2");
  }
}
