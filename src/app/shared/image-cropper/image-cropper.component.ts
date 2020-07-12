import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.css'],
})
export class ImageCropperComponent implements OnInit {
  @Input() image: string;

  croppedImage: string;

  // tslint:disable-next-line: no-output-native
  @Output() close = new EventEmitter<void>();
  @Output() crop = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  imageCropped(image: any) {
    this.croppedImage = image.base64;
  }

  onCrop() {
    this.crop.emit(this.croppedImage);
  }

  onClose() {
    this.close.emit();
  }
}
