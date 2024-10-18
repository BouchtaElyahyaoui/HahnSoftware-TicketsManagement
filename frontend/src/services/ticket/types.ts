export enum TicketStatusEnum {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

export interface ITicket {
  id:number;
  description:string;
  status: TicketStatusEnum;
  createdAt: string;
}