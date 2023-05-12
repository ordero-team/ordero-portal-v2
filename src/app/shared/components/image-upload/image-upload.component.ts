import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { ToastService } from '@cs/toast.service';
import { TranslateService } from '@ngx-translate/core';
import { has } from 'lodash';
import { NgxDropzoneComponent } from 'ngx-dropzone';

@Component({
  selector: 'aka-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent {
  currentImage: any;
  imageTypes = 'image/png,image/jpeg';
  isLoading = false;
  maxFileSize = 1000000; // in bytes

  @Input() label: string;
  @Input() icon: string;
  @Input() class: string;
  @Input() multiple = false;
  @Input() editLabel?: string = 'Edit Photo';
  @Input() editIcon?: string = 'outlineImage';
  @Input() showHint?: boolean = false;
  @Input() textHint?: string = 'Acceptable formats: jpeg & png only. Max. file size is 1MB';
  @Input() disabled?: boolean = false;
  @Input() disableClick?: boolean = false;
  @Input() withLabel?: boolean = true;

  @Output() select = new EventEmitter<any>();

  @ViewChild('dropzoneElement', { static: true }) drop: NgxDropzoneComponent;

  constructor(private toast: ToastService, private translate: TranslateService) {}

  @Input()
  get image() {
    return this.currentImage;
  }

  set image(value: any) {
    this.currentImage = value;
  }

  async onSelect(event) {
    this.isLoading = true;
    try {
      // Check if file rejected
      if (has(event, 'rejectedFiles') && event.rejectedFiles.length) {
        event.rejectedFiles.map((res) => {
          this.toast.warning(this.translate.instant(`general.imageUpload.error.${res.reason}`, res));
        });
      } else if (has(event, 'addedFiles') && event.addedFiles.length) {
        this.select.emit(event.addedFiles[0]);
        this.generateImage(event.addedFiles[0]);
      }
    } catch (error) {
      this.toast.error('Unable to upload image', error);
    }
    this.isLoading = false;
  }

  generateImage(file: File) {
    // Generate Image Preview
    const reader = new FileReader();

    reader.onload = (ev: any) => {
      this.currentImage = ev.target.result;
    };
    reader.readAsDataURL(file);
  }
}
