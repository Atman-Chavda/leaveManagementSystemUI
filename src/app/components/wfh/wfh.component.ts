import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { Router } from "@angular/router"
import { LeaveService } from "../../services/leave.service"

@Component({
  selector: "app-wfh",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./wfh.component.html",
  styleUrls: ["./wfh.component.scss"],
})
export class WfhComponent implements OnInit {
  wfhForm!: FormGroup
  submitted = false

  constructor(
    private formBuilder: FormBuilder,
    private leaveService: LeaveService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.wfhForm = this.formBuilder.group({
      date: ["", Validators.required],
      reason: ["", Validators.required],
    })
  }

  get f() {
    return this.wfhForm.controls
  }

  onSubmit(): void {
    this.submitted = true

    if (this.wfhForm.invalid) {
      return
    }

    const date = this.wfhForm.value.date

    // this.leaveService.addLeave({
    //   type: "Work From Home",
    //   startDate: date,
    //   endDate: date,
    //   status: "Pending",
    // })

    this.router.navigate(["/dashboard"])
  }

  resetForm(): void {
    this.submitted = false
    this.wfhForm.reset()
  }
}

