﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using RealGimm.Infrastructure.Econ.Data;

#nullable disable

namespace RealGimm.Infra.MsSql.Econ
{
    [DbContext(typeof(EconDbContext))]
    partial class EconDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasDefaultSchema("econ")
                .HasAnnotation("ProductVersion", "8.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("RealGimm.Core.Econ.InvoiceAggregate.Invoice", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateOnly>("Date")
                        .HasColumnType("date");

                    b.Property<DateTime?>("DeletionDate")
                        .HasColumnType("datetime2");

                    b.Property<int?>("EstateUnitId")
                        .HasColumnType("int");

                    b.Property<string>("InternalCode")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Name")
                        .HasMaxLength(120)
                        .HasColumnType("nvarchar(120)");

                    b.Property<string>("PaymentTerms")
                        .HasMaxLength(3192)
                        .HasColumnType("nvarchar(3192)");

                    b.Property<DateOnly?>("Since")
                        .HasColumnType("date");

                    b.Property<int?>("TransactorBankAccountId")
                        .HasColumnType("int");

                    b.Property<int>("TransactorPaymentType")
                        .HasColumnType("int");

                    b.Property<int>("TransactorSubjectId")
                        .HasColumnType("int");

                    b.Property<DateOnly?>("Until")
                        .HasColumnType("date");

                    b.HasKey("Id");

                    b.ToTable("Invoices", "econ");
                });

            modelBuilder.Entity("RealGimm.Core.Econ.InvoiceAggregate.PaymentInstallment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<decimal>("Amount")
                        .HasPrecision(18, 6)
                        .HasColumnType("decimal(18,6)");

                    b.Property<DateOnly>("DueDate")
                        .HasColumnType("date");

                    b.Property<int>("InstallmentNumber")
                        .HasColumnType("int");

                    b.Property<int?>("InvoiceId")
                        .HasColumnType("int");

                    b.Property<string>("Notes")
                        .HasMaxLength(3192)
                        .HasColumnType("nvarchar(3192)");

                    b.Property<DateOnly?>("Since")
                        .HasColumnType("date");

                    b.Property<DateOnly?>("Until")
                        .HasColumnType("date");

                    b.HasKey("Id");

                    b.HasIndex("InvoiceId");

                    b.ToTable("PaymentInstallment", "econ");
                });

            modelBuilder.Entity("RealGimm.Core.Econ.TaxCreditAggregate.Operation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<decimal>("Amount")
                        .HasPrecision(18, 6)
                        .HasColumnType("decimal(18,6)");

                    b.Property<int?>("AssetTaxPaymentId")
                        .HasColumnType("int");

                    b.Property<DateOnly>("Date")
                        .HasColumnType("date");

                    b.Property<string>("Notes")
                        .HasMaxLength(3192)
                        .HasColumnType("nvarchar(3192)");

                    b.Property<DateOnly?>("Since")
                        .HasColumnType("date");

                    b.Property<int?>("TaxCreditId")
                        .HasColumnType("int");

                    b.Property<DateOnly?>("Until")
                        .HasColumnType("date");

                    b.HasKey("Id");

                    b.HasIndex("TaxCreditId");

                    b.ToTable("Operation", "econ");
                });

            modelBuilder.Entity("RealGimm.Core.Econ.TaxCreditAggregate.TaxCredit", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime?>("DeletionDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasMaxLength(1024)
                        .HasColumnType("nvarchar(1024)");

                    b.Property<int>("ManagementSubjectId")
                        .HasColumnType("int");

                    b.Property<string>("Notes")
                        .HasMaxLength(3192)
                        .HasColumnType("nvarchar(3192)");

                    b.Property<string>("TaxCode")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("Id");

                    b.ToTable("TaxCredits", "econ");
                });

            modelBuilder.Entity("RealGimm.Core.Econ.InvoiceAggregate.PaymentInstallment", b =>
                {
                    b.HasOne("RealGimm.Core.Econ.InvoiceAggregate.Invoice", null)
                        .WithMany("PaymentInstallments")
                        .HasForeignKey("InvoiceId");
                });

            modelBuilder.Entity("RealGimm.Core.Econ.TaxCreditAggregate.Operation", b =>
                {
                    b.HasOne("RealGimm.Core.Econ.TaxCreditAggregate.TaxCredit", null)
                        .WithMany("Operations")
                        .HasForeignKey("TaxCreditId");
                });

            modelBuilder.Entity("RealGimm.Core.Econ.InvoiceAggregate.Invoice", b =>
                {
                    b.Navigation("PaymentInstallments");
                });

            modelBuilder.Entity("RealGimm.Core.Econ.TaxCreditAggregate.TaxCredit", b =>
                {
                    b.Navigation("Operations");
                });
#pragma warning restore 612, 618
        }
    }
}
