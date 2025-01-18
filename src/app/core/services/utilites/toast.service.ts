import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastContainer!: HTMLDivElement;

  constructor() {
    this.createToastContainer();
  }

  private createToastContainer() {
    this.toastContainer = document.createElement('div');
    this.toastContainer.className = 'custom-toast-container';
    document.body.appendChild(this.toastContainer);
  }

  showToast(message: string, type: 'success' | 'error' = 'error', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `custom-toast ${type}`;
    toast.innerText = message;

    this.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => this.toastContainer.removeChild(toast), 500);
    }, duration);
  }
}
