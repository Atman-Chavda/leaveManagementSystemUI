import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { ThemeService } from "../../services/theme.service"
import { SidebarService } from "../../services/sidebar.service"

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  constructor(
    public themeService: ThemeService,
    private sidebarService: SidebarService,
  ) {}

  toggleTheme(): void {
    this.themeService.toggleTheme()
  }

  toggleSidebar(): void {
    this.sidebarService.toggle()
  }
}

