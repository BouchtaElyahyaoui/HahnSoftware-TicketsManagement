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

export interface IPaginatedResult {
  data: ITicket[],
  page: number,
  pageSize: number,
  totalCount: number,
  totalPages: number,
}