import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormBuilder,  FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { Router } from "@angular/router"
import { LeaveService } from "../../services/leave.service"

@Component({
  selector: "app-new-leave",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./new-leave.component.html",
  styleUrls: ["./new-leave.component.scss"],
})
export class NewLeaveComponent implements OnInit {
  leaveForm!: FormGroup
  submitted = false

  constructor(
    private formBuilder: FormBuilder,
    private leaveService: LeaveService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.leaveForm = this.formBuilder.group({
      leaveType: ["", Validators.required],
      dateFrom : ["", Validators.required],
      dateTo: ["", Validators.required],
      reason: ["", Validators.required],
    })
  }

  get f() {
    return this.leaveForm.controls
  }

  onSubmit(): void {
    this.submitted = true
    console.log(this.leaveForm.value)
    if (this.leaveForm.invalid) {
      return
    }

    this.leaveService.addLeave(this.leaveForm.value).subscribe((res: any) => {
      console.log(res);
      if(res.status === "OK")
      {
        // console.log(this.leaveForm.value);
        alert("Leave added successfully");
        this.router.navigate(["/dashboard"]);
      }
    }, (error: any) => {
      console.log(error);
    });
  }

  // this.leaveService.addLeave({
    //   leaveType: this.leaveForm.value.type,
    //   dateFrom: this.leaveForm.value.startDate,
    //   dateTo: this.leaveForm.value.endDate,
    //   reason: this.leaveForm.value.reason
    // })

  resetForm(): void {
    this.submitted = false
    this.leaveForm.reset()
  }
}

