import { ChangeDetectorRef, Component, inject, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeaveService } from '../../services/leave.service';
import type { Leave } from '../../model/interface/leave';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  leaves?: Leave[] = [];
  filteredLeaves: Leave[] = [];
  startDate = '';
  endDate = '';
  selectedFilter = 'All';
  activeTab = "leaves"
  cdr = inject(ChangeDetectorRef);

  constructor(public leaveService: LeaveService) {}

  ngOnInit(): void {
    
    this.leaveService.getLeaves().subscribe(
      {
        next: (data) => {
          this.leaves = data;
          this.applyFilters();
          // console.log(this.leaves);
        },
        error: (error) => {
          console.error('Error fetching leaves:', error);   
          }
    });
  }

  setFilter(filter: string): void {
    this.selectedFilter = filter;
    this.applyFilters();
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab
  }

  applyFilters(): void {
    if (!this.leaves || this.leaves.length === 0) {
      this.filteredLeaves = [];
      return;
    }

    this.filteredLeaves = this.leaves.filter((leave) => {
      const matchesFilter =
        this.selectedFilter === 'All' ||
        leave.leaveType.includes(this.selectedFilter) ||
        leave.leaveStatus === this.selectedFilter;

      if (!this.startDate && !this.endDate) return matchesFilter;

      const leaveStart = new Date(leave.dateFrom);
      const leaveEnd = new Date(leave.dateTo);

      let filterStart, filterEnd;

      if (this.startDate) {
        filterStart = new Date(this.startDate);
        filterStart.setHours(0, 0, 0, 0);
      } else {
        filterStart = new Date(0);
      }

      if (this.endDate) {
        filterEnd = new Date(this.endDate);
        filterEnd.setHours(23, 59, 59, 999);
      } else {
        filterEnd = new Date(9999, 11, 31);
      }

      const dateOverlaps =
        (leaveStart >= filterStart && leaveStart <= filterEnd) ||
        (leaveEnd >= filterStart && leaveEnd <= filterEnd) ||
        (leaveStart <= filterStart && leaveEnd >= filterEnd);

      return matchesFilter && dateOverlaps;
    });
  }


deleteLeave(id: number) {
  const check = confirm("Do you want to delete this leave?")
  if(check)
  {
    this.leaveService.deleteLeave(id).subscribe(
      {
        next: () => {
          this.leaves = this.leaves?.filter((leave) => leave.leaveId !== id);
          this.filteredLeaves = this.filteredLeaves.filter((leave) => leave.leaveId !== id);
          // this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error deleting leave:', error);
        }
      });
    }
    else
    {
      return;
    }
}

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'Approved':
        return 'bg-success';
      case 'Pending':
        return 'bg-warning';
      case 'Rejected':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  }
}
