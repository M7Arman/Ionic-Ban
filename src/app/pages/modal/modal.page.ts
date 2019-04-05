import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  devices: any[];
  constructor(private navParams: NavParams, private modalCtrl: ModalController) {
  }

  ngOnInit() {
    this.devices = this.navParams.get('devices');
    console.log('navParams :', this.navParams);
    console.log('this.devices :', this.devices);
  }

  dismissModal(data?: any): void {
    this.modalCtrl.dismiss(data);
  }

  get filteredDevices() {
    return this.devices.filter(device => !!device.name);
  }

  public selectDevice(device: any) {
    this.dismissModal({ device: device });
  }

}
