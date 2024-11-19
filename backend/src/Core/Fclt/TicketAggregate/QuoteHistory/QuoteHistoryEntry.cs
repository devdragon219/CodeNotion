﻿using HotChocolate.Types;

namespace RealGimm.Core.Fclt.TicketAggregate.QuoteHistory;

[InterfaceType]
public abstract class QuoteHistoryEntry : EntityBase
{
  public DateTime Timestamp { get; private set; }
  public int UserId { get; private set; }

  public void SetTimestamp(DateTime timestamp) => Timestamp = timestamp;

  public void SetUserId(int userId) => UserId = userId;
}
