import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import {  FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { Router } from "@angular/router"
import { LeaveService } from "../../services/leave.service"

@Component({
  selector: "app-oof",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./oof.component.html",
  styleUrls: ["./oof.component.scss"],
})
export class OofComponent implements OnInit {
  oofForm!: FormGroup
  submitted = false

  constructor(
    private formBuilder: FormBuilder,
    private leaveService: LeaveService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.oofForm = this.formBuilder.group({
      startDateTime: ["", Validators.required],
      endDateTime: ["", Validators.required],
      message: ["", Validators.required],
    })
  }

  get f() {
    return this.oofForm.controls
  }

  onSubmit(): void {
    this.submitted = true

    if (this.oofForm.invalid) {
      return
    }

    // Extract just the date part for the leave service
    const startDate = this.oofForm.value.startDateTime.split("T")[0]
    const endDate = this.oofForm.value.endDateTime.split("T")[0]

    // this.leaveService.addLeave({
    //   type: "Out of Office",
    //   startDate: startDate,
    //   endDate: endDate,
    //   status: "Pending",
    // })

    this.router.navigate(["/dashboard"])
  }

  resetForm(): void {
    this.submitted = false
    this.oofForm.reset()
  }
}

