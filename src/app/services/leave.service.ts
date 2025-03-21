import { HttpClient } from "@angular/common/http"
import { inject, Injectable } from "@angular/core"
import { BehaviorSubject, type Observable } from "rxjs"
import { AddLeave, Leave } from "../model/interface/leave"


@Injectable({
  providedIn: "root",
})
export class LeaveService {
  

  empId = 1; // comming from cookie

  http = inject(HttpClient);

  getLeaves() {
    return this.http.get<Leave[]>(`https://localhost:7223/api/Leave/getempleaves/${this.empId}`);
  }

  addLeave(leave: AddLeave){
    return this.http.post<AddLeave>(`https://localhost:7223/api/Leave`, leave);
  }

  deleteLeave(id: number){
    return this.http.delete<Leave>(`https://localhost:7223/api/Leave/${id}`);
  }

  calculateDuration(startDate: string, endDate: string): number {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
    return diffDays
  }
}

