import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { ToastType, AlertType } from '../enums';


@Injectable({
  providedIn: 'root'
})


export class ToastService {
  
  title: string = '';

  toastType: any = ToastType.success;

  options: any = {
    toast: true,
    position: 'top-end',
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false,
  };

  alertType: any = AlertType.toast;

  

  constructor() {}

  public show(title: string,toastType : any,options? : any, alertType? : any):void {
    
    this.title = title;
    this.toastType = toastType;
    this.options = options ? options : this.options;
    this.alertType = alertType ? alertType : this.alertType;

    if(this.alertType === AlertType.popup){
      Swal.fire(this.title, '', this.toastType);
    }else if(this.alertType === AlertType.toast){
      const Toast = Swal.mixin(this.options);
      Toast.fire(this.title, '', this.toastType);
    }
  }


}

// export default new HttpService();