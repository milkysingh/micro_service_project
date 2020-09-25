import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from '@milkysinghtickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
