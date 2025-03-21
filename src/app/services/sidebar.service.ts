import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class SidebarService {
  private isOpen = new BehaviorSubject<boolean>(true)

  constructor() {
    // Check if we're on mobile and set sidebar closed by default
    if (window.innerWidth < 768) {
      this.isOpen.next(false)
    }
  }

  toggle(): void {
    this.isOpen.next(!this.isOpen.value)
  }

  isExpanded(): boolean {
    return this.isOpen.value
  }

  open(): void {
    this.isOpen.next(true)
  }

  close(): void {
    this.isOpen.next(false)
  }
}

