﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using RealGimm.Infrastructure.IAM.Data;

#nullable disable

namespace RealGimm.Infra.PgSql.IAM
{
    [DbContext(typeof(IAMDbContext))]
    partial class IAMDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasDefaultSchema("iam")
                .HasAnnotation("ProductVersion", "8.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.HasPostgresExtension(modelBuilder, "postgis");
            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("RealGimm.Core.IAM.GroupAggregate.Group", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Description")
                        .HasMaxLength(1024)
                        .HasColumnType("character varying(1024)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(120)
                        .HasColumnType("character varying(120)");

                    b.HasKey("Id");

                    b.ToTable("Groups", "iam");
                });

            modelBuilder.Entity("RealGimm.Core.IAM.GroupAggregate.GroupFeature", b =>
                {
                    b.Property<string>("Feature")
                        .HasColumnType("text");

                    b.Property<int>("GroupId")
                        .HasColumnType("integer");

                    b.Property<bool>("CanCreate")
                        .HasColumnType("boolean");

                    b.Property<bool>("CanDelete")
                        .HasColumnType("boolean");

                    b.Property<bool>("CanRead")
                        .HasColumnType("boolean");

                    b.Property<bool>("CanUpdate")
                        .HasColumnType("boolean");

                    b.HasKey("Feature", "GroupId");

                    b.HasIndex("GroupId");

                    b.ToTable("GroupFeature", "iam");
                });

            modelBuilder.Entity("RealGimm.Core.IAM.UserAggregate.Contact", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("ContactInfo")
                        .HasMaxLength(1024)
                        .HasColumnType("character varying(1024)");

                    b.Property<int>("ContactInfoType")
                        .HasColumnType("integer");

                    b.Property<int>("ContactType")
                        .HasColumnType("integer");

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("DeletionDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Notes")
                        .HasMaxLength(3192)
                        .HasColumnType("character varying(3192)");

                    b.Property<int?>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Contact", "iam");
                });

            modelBuilder.Entity("RealGimm.Core.IAM.UserAggregate.Session", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("LastRefreshIPAddress")
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("LastRefreshLocation")
                        .HasMaxLength(1024)
                        .HasColumnType("character varying(1024)");

                    b.Property<string>("LastRefreshUserAgent")
                        .HasMaxLength(1024)
                        .HasColumnType("character varying(1024)");

                    b.Property<string>("LoginIPAddress")
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("LoginLocation")
                        .HasMaxLength(1024)
                        .HasColumnType("character varying(1024)");

                    b.Property<string>("LoginUserAgent")
                        .HasMaxLength(1024)
                        .HasColumnType("character varying(1024)");

                    b.Property<string>("RefreshToken")
                        .IsRequired()
                        .HasMaxLength(250)
                        .HasColumnType("character varying(250)");

                    b.Property<DateTime>("RefreshTokenExpiration")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int?>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Session", "iam");
                });

            modelBuilder.Entity("RealGimm.Core.IAM.UserAggregate.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("BearerToken")
                        .HasMaxLength(250)
                        .HasColumnType("character varying(250)");

                    b.Property<DateTime?>("CeasedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("DeletionDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("EnabledSince")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("ExternalAuthAud")
                        .HasMaxLength(250)
                        .HasColumnType("character varying(250)");

                    b.Property<string>("ExternalAuthIss")
                        .HasMaxLength(250)
                        .HasColumnType("character varying(250)");

                    b.Property<string>("ExternalAuthSub")
                        .HasMaxLength(250)
                        .HasColumnType("character varying(250)");

                    b.Property<int>("FailedLoginAttemptsCount")
                        .HasColumnType("integer");

                    b.Property<string>("FirstName")
                        .HasMaxLength(120)
                        .HasColumnType("character varying(120)");

                    b.Property<DateTime?>("LastLogInAttempt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("LastLoggedIn")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("LastName")
                        .HasMaxLength(120)
                        .HasColumnType("character varying(120)");

                    b.Property<DateTime?>("LastPasswordUpdated")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("LockedSince")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("LockedUntil")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("OfficeAccess")
                        .HasColumnType("integer");

                    b.Property<int[]>("OrgUnits")
                        .HasColumnType("integer[]");

                    b.Property<DateTime?>("PasswordExpiredSince")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("PasswordHash")
                        .HasMaxLength(250)
                        .HasColumnType("character varying(250)");

                    b.Property<string>("PreferredLanguageCode")
                        .HasColumnType("text");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.Property<int[]>("Subjects")
                        .HasColumnType("integer[]");

                    b.Property<int?>("SupplierSubjectId")
                        .HasColumnType("integer");

                    b.Property<string>("SuspensionReason")
                        .HasMaxLength(3192)
                        .HasColumnType("character varying(3192)");

                    b.Property<int>("Type")
                        .HasColumnType("integer");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasMaxLength(120)
                        .HasColumnType("character varying(120)");

                    b.HasKey("Id");

                    b.HasIndex("UserName")
                        .IsUnique();

                    b.ToTable("Users", "iam");
                });

            modelBuilder.Entity("RealGimm.Core.IAM.UserAggregate.UserGroup", b =>
                {
                    b.Property<int>("GroupId")
                        .HasColumnType("integer");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("GroupId", "UserId");

                    b.HasIndex("UserId");

                    b.ToTable("UserGroup", "iam");
                });

            modelBuilder.Entity("RealGimm.Core.IAM.UserAggregate.WidgetConfig", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("Order")
                        .HasColumnType("integer");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int?>("WidgetSectionRowId")
                        .HasColumnType("integer");

                    b.Property<int>("Width")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("WidgetSectionRowId");

                    b.ToTable("WidgetConfig", "iam");
                });

            modelBuilder.Entity("RealGimm.Core.IAM.UserAggregate.WidgetSection", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("BackgroundColor")
                        .HasColumnType("text");

                    b.Property<int?>("FacilityDashboardUserId")
                        .HasColumnType("integer");

                    b.Property<int?>("MainDashboardUserId")
                        .HasColumnType("integer");

                    b.Property<int>("Order")
                        .HasColumnType("integer");

                    b.Property<string>("Title")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("FacilityDashboardUserId");

                    b.HasIndex("MainDashboardUserId");

                    b.ToTable("WidgetSection", "iam");
                });

            modelBuilder.Entity("RealGimm.Core.IAM.UserAggregate.WidgetSectionRow", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("Order")
                        .HasColumnType("integer");

                    b.Property<int?>("WidgetSectionId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("WidgetSectionId");

                    b.ToTable("WidgetSectionRow", "iam");
                });

            modelBuilder.Entity("RealGimm.Core.IAM.GroupAggregate.GroupFeature", b =>
                {
                    b.HasOne("RealGimm.Core.IAM.GroupAggregate.Group", "Group")
                        .WithMany("Features")
                        .HasForeignKey("GroupId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Group");
                });

            modelBuilder.Entity("RealGimm.Core.IAM.UserAggregate.Contact", b =>
                {
                    b.HasOne("RealGimm.Core.IAM.UserAggregate.User", null)
                        .WithMany("Contacts")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("RealGimm.Core.IAM.UserAggregate.Session", b =>
                {
                    b.HasOne("RealGimm.Core.IAM.UserAggregate.User", null)
                        .WithMany("Sessions")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("RealGimm.Core.IAM.UserAggregate.UserGroup", b =>
                {
                    b.HasOne("RealGimm.Core.IAM.GroupAggregate.Group", "Group")
                        .WithMany("UserGroups")
                        .HasForeignKey("GroupId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("RealGimm.Core.IAM.UserAggregate.User", "User")
                        .WithMany("UserGroups")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Group");

                    b.Navigation("User");
                });

            modelBuilder.Entity("RealGimm.Core.IAM.UserAggregate.WidgetConfig", b =>
                {
                    b.HasOne("RealGimm.Core.IAM.UserAggregate.WidgetSectionRow", null)
                        .WithMany("Widgets")
                        .HasForeignKey("WidgetSectionRowId");
                });

            modelBuilder.Entity("RealGimm.Core.IAM.UserAggregate.WidgetSection", b =>
                {
                    b.HasOne("RealGimm.Core.IAM.UserAggregate.User", null)
                        .WithMany("FacilityDashboard")
                        .HasForeignKey("FacilityDashboardUserId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("RealGimm.Core.IAM.UserAggregate.User", null)
                        .WithMany("MainDashboard")
                        .HasForeignKey("MainDashboardUserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("RealGimm.Core.IAM.UserAggregate.WidgetSectionRow", b =>
                {
                    b.HasOne("RealGimm.Core.IAM.UserAggregate.WidgetSection", null)
                        .WithMany("Rows")
                        .HasForeignKey("WidgetSectionId");
                });

            modelBuilder.Entity("RealGimm.Core.IAM.GroupAggregate.Group", b =>
                {
                    b.Navigation("Features");

                    b.Navigation("UserGroups");
                });

            modelBuilder.Entity("RealGimm.Core.IAM.UserAggregate.User", b =>
                {
                    b.Navigation("Contacts");

                    b.Navigation("FacilityDashboard");

                    b.Navigation("MainDashboard");

                    b.Navigation("Sessions");

                    b.Navigation("UserGroups");
                });

            modelBuilder.Entity("RealGimm.Core.IAM.UserAggregate.WidgetSection", b =>
                {
                    b.Navigation("Rows");
                });

            modelBuilder.Entity("RealGimm.Core.IAM.UserAggregate.WidgetSectionRow", b =>
                {
                    b.Navigation("Widgets");
                });
#pragma warning restore 612, 618
        }
    }
}
