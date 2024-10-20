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


export enum SortByEnum {
  ID = 'Id',
  DESCRIPTION = 'description',
  STATUSS = 'status',
  CREATED_AT = 'createdAt'
}

export interface ITicketFilter {
  description:string;
  status:TicketStatusEnum | null;
  sortBy: SortByEnum;
  isDescending:boolean,
}

export const DEFAULT_TICKET_FILTER: ITicketFilter  = {
  description:'',
  isDescending: true,
  sortBy: SortByEnum.ID,
  status: null,
}