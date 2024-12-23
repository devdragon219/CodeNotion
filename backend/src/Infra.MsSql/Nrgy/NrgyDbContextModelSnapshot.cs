﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using RealGimm.Infrastructure.Nrgy.Data;

#nullable disable

namespace RealGimm.Infra.MsSql.Nrgy
{
    [DbContext(typeof(NrgyDbContext))]
    partial class NrgyDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasDefaultSchema("nrgy")
                .HasAnnotation("ProductVersion", "8.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("RealGimm.Core.Nrgy.CostChargeAggregate.CostCharge", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateOnly>("DueDate")
                        .HasColumnType("date");

                    b.Property<string>("Fields")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("InvoiceNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("InvoicedConsumptionAmount")
                        .HasPrecision(18, 6)
                        .HasColumnType("decimal(18,6)");

                    b.Property<DateOnly>("PeriodEnd")
                        .HasColumnType("date");

                    b.Property<DateOnly>("PeriodStart")
                        .HasColumnType("date");

                    b.Property<DateOnly>("ReferenceDate")
                        .HasColumnType("date");

                    b.Property<int>("ServiceId")
                        .HasColumnType("int");

                    b.Property<decimal>("TotalAmount")
                        .HasPrecision(18, 6)
                        .HasColumnType("decimal(18,6)");

                    b.Property<decimal>("TotalVATAmount")
                        .HasPrecision(18, 6)
                        .HasColumnType("decimal(18,6)");

                    b.HasKey("Id");

                    b.HasIndex("ServiceId");

                    b.ToTable("CostCharges", "nrgy");
                });

            modelBuilder.Entity("RealGimm.Core.Nrgy.ReadingAggregate.Reading", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("IsEstimated")
                        .HasColumnType("bit");

                    b.Property<string>("Notes")
                        .HasMaxLength(3192)
                        .HasColumnType("nvarchar(3192)");

                    b.Property<DateTime>("ReadingTimestamp")
                        .HasColumnType("datetime2");

                    b.Property<int>("UtilityServiceId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UtilityServiceId");

                    b.ToTable("Readings", "nrgy");
                });

            modelBuilder.Entity("RealGimm.Core.Nrgy.UtilityServiceAggregate.UtilityService", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("AccountingItemId")
                        .HasColumnType("int");

                    b.Property<DateOnly>("ActivationDate")
                        .HasColumnType("date");

                    b.Property<string>("ContractNominalTension")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("ContractPowerMaximum")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("ContractPowerNominal")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<DateOnly?>("DeactivationDate")
                        .HasColumnType("date");

                    b.Property<DateOnly?>("DeactivationRequestDate")
                        .HasColumnType("date");

                    b.Property<decimal?>("Deposit")
                        .HasPrecision(18, 6)
                        .HasColumnType("decimal(18,6)");

                    b.Property<string>("Description")
                        .HasMaxLength(1024)
                        .HasColumnType("nvarchar(1024)");

                    b.Property<string>("EstateIds")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("EstateUnitIds")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("InternalCode")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<bool>("IsFreeMarket")
                        .HasColumnType("bit");

                    b.Property<string>("Notes")
                        .HasMaxLength(3192)
                        .HasColumnType("nvarchar(3192)");

                    b.Property<int>("OrgUnitId")
                        .HasColumnType("int");

                    b.Property<int>("ProviderSubjectId")
                        .HasColumnType("int");

                    b.Property<int>("ReferenceSubjectId")
                        .HasColumnType("int");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<string>("UtilityContractCode")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("UtilityDeliveryPointCode")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("UtilityMeterSerial")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<int>("UtilityTypeId")
                        .HasColumnType("int");

                    b.Property<string>("UtilityUserCode")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("Id");

                    b.HasIndex("UtilityTypeId");

                    b.ToTable("UtilityServices", "nrgy");
                });

            modelBuilder.Entity("RealGimm.Core.Nrgy.UtilityTypeAggregate.UtilityType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("Category")
                        .HasColumnType("int");

                    b.Property<string>("ChargeFields")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(1024)
                        .HasColumnType("nvarchar(1024)");

                    b.Property<string>("ExpenseClass")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("ExternalCode")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<bool>("HasHeatingAccountingSystem")
                        .HasColumnType("bit");

                    b.Property<string>("InternalCode")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("MeasurementUnit")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("MeasurementUnitDescription")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<int>("MeteringType")
                        .HasColumnType("int");

                    b.Property<int>("TimeOfUseRateCount")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("UtilityTypes", "nrgy");
                });

            modelBuilder.Entity("RealGimm.Core.Nrgy.CostChargeAggregate.CostCharge", b =>
                {
                    b.HasOne("RealGimm.Core.Nrgy.UtilityServiceAggregate.UtilityService", "Service")
                        .WithMany()
                        .HasForeignKey("ServiceId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.OwnsOne("RealGimm.Core.Nrgy.CostChargeAggregate.CostChargeConsumption", "ActualConsumption", b1 =>
                        {
                            b1.Property<int>("CostChargeId")
                                .HasColumnType("int");

                            b1.Property<DateOnly>("Since")
                                .HasColumnType("date");

                            b1.Property<DateOnly>("Until")
                                .HasColumnType("date");

                            b1.HasKey("CostChargeId");

                            b1.ToTable("CostCharges", "nrgy");

                            b1.WithOwner()
                                .HasForeignKey("CostChargeId");

                            b1.OwnsMany("RealGimm.Core.Nrgy.ReadingAggregate.ReadingValue", "Values", b2 =>
                                {
                                    b2.Property<int>("CostChargeConsumptionCostChargeId")
                                        .HasColumnType("int");

                                    b2.Property<int>("Id")
                                        .ValueGeneratedOnAdd()
                                        .HasColumnType("int");

                                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b2.Property<int>("Id"));

                                    b2.Property<int>("TOURateIndex")
                                        .HasColumnType("int");

                                    b2.Property<decimal?>("Value")
                                        .HasPrecision(18, 6)
                                        .HasColumnType("decimal(18,6)");

                                    b2.HasKey("CostChargeConsumptionCostChargeId", "Id");

                                    b2.ToTable("CostCharge_ActualConsumption_Values", "nrgy");

                                    b2.WithOwner()
                                        .HasForeignKey("CostChargeConsumptionCostChargeId");
                                });

                            b1.Navigation("Values");
                        });

                    b.OwnsOne("RealGimm.Core.Nrgy.CostChargeAggregate.CostChargeConsumption", "ExpectedConsumption", b1 =>
                        {
                            b1.Property<int>("CostChargeId")
                                .HasColumnType("int");

                            b1.Property<DateOnly>("Since")
                                .HasColumnType("date");

                            b1.Property<DateOnly>("Until")
                                .HasColumnType("date");

                            b1.HasKey("CostChargeId");

                            b1.ToTable("CostCharges", "nrgy");

                            b1.WithOwner()
                                .HasForeignKey("CostChargeId");

                            b1.OwnsMany("RealGimm.Core.Nrgy.ReadingAggregate.ReadingValue", "Values", b2 =>
                                {
                                    b2.Property<int>("CostChargeConsumptionCostChargeId")
                                        .HasColumnType("int");

                                    b2.Property<int>("Id")
                                        .ValueGeneratedOnAdd()
                                        .HasColumnType("int");

                                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b2.Property<int>("Id"));

                                    b2.Property<int>("TOURateIndex")
                                        .HasColumnType("int");

                                    b2.Property<decimal?>("Value")
                                        .HasPrecision(18, 6)
                                        .HasColumnType("decimal(18,6)");

                                    b2.HasKey("CostChargeConsumptionCostChargeId", "Id");

                                    b2.ToTable("CostCharge_ExpectedConsumption_Values", "nrgy");

                                    b2.WithOwner()
                                        .HasForeignKey("CostChargeConsumptionCostChargeId");
                                });

                            b1.Navigation("Values");
                        });

                    b.Navigation("ActualConsumption");

                    b.Navigation("ExpectedConsumption");

                    b.Navigation("Service");
                });

            modelBuilder.Entity("RealGimm.Core.Nrgy.ReadingAggregate.Reading", b =>
                {
                    b.HasOne("RealGimm.Core.Nrgy.UtilityServiceAggregate.UtilityService", "UtilityService")
                        .WithMany()
                        .HasForeignKey("UtilityServiceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.OwnsMany("RealGimm.Core.Nrgy.ReadingAggregate.ReadingValue", "Values", b1 =>
                        {
                            b1.Property<int>("ReadingId")
                                .HasColumnType("int");

                            b1.Property<int>("Id")
                                .ValueGeneratedOnAdd()
                                .HasColumnType("int");

                            SqlServerPropertyBuilderExtensions.UseIdentityColumn(b1.Property<int>("Id"));

                            b1.Property<int>("TOURateIndex")
                                .HasColumnType("int");

                            b1.Property<decimal?>("Value")
                                .HasPrecision(18, 6)
                                .HasColumnType("decimal(18,6)");

                            b1.HasKey("ReadingId", "Id");

                            b1.ToTable("Readings_Values", "nrgy");

                            b1.WithOwner()
                                .HasForeignKey("ReadingId");
                        });

                    b.Navigation("UtilityService");

                    b.Navigation("Values");
                });

            modelBuilder.Entity("RealGimm.Core.Nrgy.UtilityServiceAggregate.UtilityService", b =>
                {
                    b.HasOne("RealGimm.Core.Nrgy.UtilityTypeAggregate.UtilityType", "UtilityType")
                        .WithMany()
                        .HasForeignKey("UtilityTypeId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("UtilityType");
                });
#pragma warning restore 612, 618
        }
    }
}
