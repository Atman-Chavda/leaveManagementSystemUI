import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private darkMode = new BehaviorSubject<boolean>(false)

  constructor() {
    // Check if user has a saved theme preference
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      this.darkMode.next(true)
      document.body.classList.add("dark-theme")
    }
  }

  toggleTheme(): void {
    const isDark = !this.darkMode.value
    this.darkMode.next(isDark)

    if (isDark) {
      document.body.classList.add("dark-theme")
      localStorage.setItem("theme", "dark")
    } else {
      document.body.classList.remove("dark-theme")
      localStorage.setItem("theme", "light")
    }
  }

  isDarkMode(): boolean {
    return this.darkMode.value
  }
}

