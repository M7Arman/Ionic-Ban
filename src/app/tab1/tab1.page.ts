import { Component, NgZone } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';
import { BLE } from '@ionic-native/ble/ngx';
import { ModalPage } from '../pages/modal/modal.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  devices: any[] = [];
  statusMessage: string;
  temp = 0;
  selectedDevice: any;

  constructor(
    private toastCtrl: ToastController,
    private ble: BLE,
    private ngZone: NgZone,
    public modalController: ModalController) {
  }

  public ionViewDidEnter() {
    this.scan();
  }

  public async onTmpChange(event: any): Promise<any> {
    this.temp = event.target.value;
  }

  public async devicesListClick() {
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: { devices: this.devices }
    });
    await modal.present();
    const data: any = await modal.onDidDismiss();
    this.selectedDevice = data.name;
    await this.showToast(this.selectedDevice.name);
  }

  private async presentModal(devices: string[]) {
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: { devices: devices }
    });
    await modal.present();
  }

  private scan() {
    this.setStatus('Scanning for Bluetooth LE Devices');
    this.devices = [];  // clear list

    this.ble.scan([], 5).subscribe(
      device => this.onDeviceDiscovered(device),
      error => this.scanError(error)
    );

    setTimeout(this.setStatus.bind(this), 10000, 'Scan complete');
  }

  private async onDeviceDiscovered(device) {
    this.ngZone.run(() => {
      this.devices.push(device);
    });
  }

  // If location permission is denied, you'll end up here
  private async scanError(error) {
    this.setStatus('Error ' + error);
  }

  private async setStatus(message: string) {
    this.showToast(message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }

  private async showToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      position: 'bottom',
      duration: 3000
    });
    await toast.present();
  }

  private deviceSelected(device) {
    console.log(JSON.stringify(device) + ' selected');
  }

}
