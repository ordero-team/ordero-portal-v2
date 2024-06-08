import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { isEmpty } from 'lodash';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';

@UntilDestroy()
@Component({
  selector: 'aka-scan-qr',
  templateUrl: './scan-qr.component.html',
  styleUrls: ['./scan-qr.component.scss'],
})
export class ScanQrComponent implements OnInit, OnDestroy, AfterViewInit {
  output = '';

  @ViewChild('action', { static: true }) action: NgxScannerQrcodeComponent;

  constructor(private _bottomSheetRef: MatBottomSheetRef<ScanQrComponent>, private _snackBar: MatSnackBar) {}

  ngAfterViewInit(): void {
    if (!this.action.isStart) {
      this.action.start();
    }
  }

  ngOnInit(): void {
    this.action.data.pipe(untilDestroyed(this)).subscribe(({ data }) => {
      if (!isEmpty(data)) {
        const regex = /^(http|https):\/\/[^ "]+$/;
        if (regex.test(data)) {
          window.location.href = data;
        } else {
          this._snackBar.open(`Invalid QR Code`, null, {
            duration: 3000,
          });
        }
        this.cancel();
      }
    });
  }

  capturedQr(result: string) {
    console.log(result);
  }

  startScanning(device) {
    console.log(device);
  }

  cancel() {
    this._bottomSheetRef.dismiss();
  }

  ngOnDestroy() {
    if (this.action.isStart) {
      this.action.stop();
    }
  }
}
