using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.CrossModule;
using RealGimm.IntegrationTests.Docs.Data;

namespace RealGimm.IntegrationTests.Docs.Mutations;
public abstract class AsstDocumentTests : DocsTestBase
{
  public AsstDocumentTests(CmisRepoFixture data) : base(data) { }
  protected static Address CreateAddress()
  {
    var address = new Address();
    address.SetType(AddressType.Primary);
    address.SetToponymy("Via Giovanni Labus 6");
    address.SetCity("Milan", null);
    address.SetLocalPostCode("20147");
    address.SetCounty("Milan", countyGuid: null);
    address.SetCountry("IT", "Italy");
    address.SetNumbering("1");

    return address;
  }

  public static Estate CreateEstate(int id, int managementSubjectId)
  {
    var estate = new Estate();
    estate.SetName(Guid.NewGuid().ToString());
    estate.SetStatus(EstateStatus.Operational);
    estate.SetType(EstateType.Building);
    estate.SetOwnership(EstateOwnership.Mixed);
    var emut = new EstateMainUsageType();
    emut.SetName("Main Usage");
    emut.SetInternalCode("C001");
    estate.SetMainUsageType(emut);
    var eut = new EstateUsageType();
    eut.SetName("Usage");
    eut.SetInternalCode("C001");
    estate.SetUsageType(eut);
    estate.SetManagement(managementSubjectId, null);

    estate.SetInternalCode("EST_202312");

    var ns = new Stair();
    ns.SetDescription("Stair0");
    estate.AddStairs(ns);

    ns = new Stair();
    ns.SetDescription("Stair1");
    estate.AddStairs(ns);

    ns = new Stair();
    ns.SetDescription("Stair2");
    estate.AddStairs(ns);

    var nf = new Floor();
    nf.SetName("Floor0");
    nf.SetPosition(0);
    estate.AddFloor(nf);

    nf = new Floor();
    nf.SetName("Floor1");
    nf.SetPosition(1);
    estate.AddFloor(nf);

    nf = new Floor();
    nf.SetName("Floor2");
    nf.SetPosition(3);
    estate.AddFloor(nf);

    estate.AddAddress(CreateAddress());

    estate.Id = id;

    return estate;
  }

  protected static EstateUnit CreateEstateUnit(int id, Estate estate)
  {
    var estateUnit = new EstateUnit();
    estateUnit.SetName("EU2024_02F");
    estateUnit.SetInternalCode("EU2024_02");
    estateUnit.SetType(EstateUnitType.Other);
    estateUnit.SetStatus(EstateUnitStatus.Disused);
    estateUnit.SetUsageType(estate.UsageType);

    estateUnit.SetOwnership(
      EstateUnitOwnershipType.Loan,
      DateOnly.Parse("2024-01-01"),
      0.1d,
      null);

    estateUnit.SetExternalCode("EU2024_02");
    estateUnit.SetNotes("EstateUnit 02");
    estateUnit.SetSharedArea(true);
    estateUnit.SetEstate(estate);
    estateUnit.SetAddress(estate.Addresses[0], "38");
    estateUnit.SetStair(estate.Stairs[0]);
    estateUnit.AddFloor(estate.Floors[0]);

    estateUnit.Id = id;

    return estateUnit;
  }
}
