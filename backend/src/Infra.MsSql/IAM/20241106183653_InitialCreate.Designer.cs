﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using RealGimm.Infrastructure.IAM.Data;

#nullable disable

namespace RealGimm.Infra.MsSql.IAM
{
    [DbContext(typeof(IAMDbContext))]
    [Migration("20241106183653_InitialCreate")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasDefaultSchema("iam")
                .HasAnnotation("ProductVersion", "8.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("RealGimm.Core.IAM.GroupAggregate.Group", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasMaxLength(1024)
                        .HasColumnType("nvarchar(1024)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(120)
                        .HasColumnType("nvarchar(120)");

                    b.HasKey("Id");

                    b.ToTable("Groups", "iam");
                });

            modelBuilder.Entity("RealGimm.Core.IAM.GroupAggregate.GroupFeature", b =>
                {
                    b.Property<string>("Feature")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("GroupId")
                        .HasColumnType("int");

                    b.Property<bool>("CanCreate")
                        .HasColumnType("bit");

                    b.Property<bool>("CanDelete")
                        .HasColumnType("bit");

                    b.Property<bool>("CanRead")
                        .HasColumnType("bit");

                    b.Property<bool>("CanUpdate")
                        .HasColumnType("bit");

                    b.HasKey("Feature", "GroupId");

                    b.HasIndex("GroupId");

                    b.ToTable("GroupFeature", "iam");
                });

            modelBuilder.Entity("RealGimm.Core.IAM.UserAggregate.Contact", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ContactInfo")
                        .HasMaxLength(1024)
                        .HasColumnType("nvarchar(1024)");

                    b.Property<int>("ContactInfoType")
                        .HasColumnType("int");

                    b.Property<int>("ContactType")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DeletionDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Notes")
                        .HasMaxLength(3192)
                        .HasColumnType("nvarchar(3192)");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Contact", "iam");
                });

            modelBuilder.Entity("RealGimm.Core.IAM.UserAggregate.Session", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("LastRefreshIPAddress")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("LastRefreshLocation")
                        .HasMaxLength(1024)
                        .HasColumnType("nvarchar(1024)");

                    b.Property<string>("LastRefreshUserAgent")
                        .HasMaxLength(1024)
                        .HasColumnType("nvarchar(1024)");

                    b.Property<string>("LoginIPAddress")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("LoginLocation")
                        .HasMaxLength(1024)
                        .HasColumnType("nvarchar(1024)");

                    b.Property<string>("LoginUserAgent")
                        .HasMaxLength(1024)
                        .HasColumnType("nvarchar(1024)");

                    b.Property<string>("RefreshToken")
                        .IsRequired()
                        .HasMaxLength(250)
                        .HasColumnType("nvarchar(250)");

                    b.Property<DateTime>("RefreshTokenExpiration")
                        .HasColumnType("datetime2");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Session", "iam");
                });

            modelBuilder.Entity("RealGimm.Core.IAM.UserAggregate.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("BearerToken")
                        .HasMaxLength(250)
                        .HasColumnType("nvarchar(250)");

                    b.Property<DateTime?>("CeasedDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DeletionDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("EnabledSince")
                        .HasColumnType("datetime2");

                    b.Property<string>("ExternalAuthAud")
                        .HasMaxLength(250)
                        .HasColumnType("nvarchar(250)");

                    b.Property<string>("ExternalAuthIss")
                        .HasMaxLength(250)
                        .HasColumnType("nvarchar(250)");

                    b.Property<string>("ExternalAuthSub")
                        .HasMaxLength(250)
                        .HasColumnType("nvarchar(250)");

                    b.Property<int>("FailedLoginAttemptsCount")
                        .HasColumnType("int");

                    b.Property<string>("FirstName")
                        .HasMaxLength(120)
                        .HasColumnType("nvarchar(120)");

                    b.Property<DateTime?>("LastLogInAttempt")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("LastLoggedIn")
                        .HasColumnType("datetime2");

                    b.Property<string>("LastName")
                        .HasMaxLength(120)
                        .HasColumnType("nvarchar(120)");

                    b.Property<DateTime?>("LastPasswordUpdated")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("LockedSince")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("LockedUntil")
                        .HasColumnType("datetime2");

                    b.Property<int>("OfficeAccess")
                        .HasColumnType("int");

                    b.Property<string>("OrgUnits")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("PasswordExpiredSince")
                        .HasColumnType("datetime2");

                    b.Property<string>("PasswordHash")
                        .HasMaxLength(250)
                        .HasColumnType("nvarchar(250)");

                    b.Property<string>("PreferredLanguageCode")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<string>("Subjects")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("SupplierSubjectId")
                        .HasColumnType("int");

                    b.Property<string>("SuspensionReason")
                        .HasMaxLength(3192)
                        .HasColumnType("nvarchar(3192)");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasMaxLength(120)
                        .HasColumnType("nvarchar(120)");

                    b.HasKey("Id");

                    b.HasIndex("UserName")
                        .IsUnique();

                    b.ToTable("Users", "iam");
                });

            modelBuilder.Entity("RealGimm.Core.IAM.UserAggregate.UserGroup", b =>
                {
                    b.Property<int>("GroupId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("datetime2");

                    b.HasKey("GroupId", "UserId");

                    b.HasIndex("UserId");

                    b.ToTable("UserGroup", "iam");
                });

            modelBuilder.Entity("RealGimm.Core.IAM.UserAggregate.WidgetConfig", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("Order")
                        .HasColumnType("int");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("WidgetSectionRowId")
                        .HasColumnType("int");

                    b.Property<int>("Width")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("WidgetSectionRowId");

                    b.ToTable("WidgetConfig", "iam");
                });

            modelBuilder.Entity("RealGimm.Core.IAM.UserAggregate.WidgetSection", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("BackgroundColor")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("FacilityDashboardUserId")
                        .HasColumnType("int");

                    b.Property<int?>("MainDashboardUserId")
                        .HasColumnType("int");

                    b.Property<int>("Order")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("FacilityDashboardUserId");

                    b.HasIndex("MainDashboardUserId");

                    b.ToTable("WidgetSection", "iam");
                });

            modelBuilder.Entity("RealGimm.Core.IAM.UserAggregate.WidgetSectionRow", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("Order")
                        .HasColumnType("int");

                    b.Property<int?>("WidgetSectionId")
                        .HasColumnType("int");

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
                        .OnDelete(DeleteBehavior.ClientCascade);

                    b.HasOne("RealGimm.Core.IAM.UserAggregate.User", null)
                        .WithMany("MainDashboard")
                        .HasForeignKey("MainDashboardUserId")
                        .OnDelete(DeleteBehavior.ClientCascade);
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
