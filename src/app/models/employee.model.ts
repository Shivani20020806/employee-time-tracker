export interface TimeEntry {
  Id: number;
  EmployeeName: string;
  StarTimeUtc: string;
  EndTimeUtc: string;
  EntryNotes: string;
  DeletedOn: string | null;
}

export interface EmployeeData {
  name: string;
  totalHours: number;
  percentage: number;
}