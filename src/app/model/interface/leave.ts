export interface Leave {
    leaveId: number
    leaveType: string
    dateFrom: string
    dateTo : string
    leaveStatus: string
  }

export interface AddLeave 
{
  leaveType: string,
  dateFrom: string,
  dateTo: string,
  reason: string
}