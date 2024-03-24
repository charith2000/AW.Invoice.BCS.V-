import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorModeService {
  private isDarkMode = false;

  toggleColorMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }

  isDarkModeEnabled(): boolean {
    return this.isDarkMode;
  }
}
