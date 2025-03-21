import { Component, HostListener } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { SidebarService } from "../../services/sidebar.service"

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent {
  constructor(public sidebarService: SidebarService) {}

  @HostListener("window:resize", ["$event"])
  onResize() {
    if (window.innerWidth >= 768) {
      this.sidebarService.open()
    } else {
      this.sidebarService.close()
    }
  }

  isMobile(): boolean {
    return window.innerWidth < 768
  }

  closeSidebar(): void {
    this.sidebarService.close()
  }

  closeOnMobile(): void {
    if (this.isMobile()) {
      this.sidebarService.close()
    }
  }
}

