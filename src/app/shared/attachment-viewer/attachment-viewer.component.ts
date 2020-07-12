import { FileModel } from './../../models/shared-models/file.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-attachment-viewer',
  templateUrl: './attachment-viewer.component.html',
  styleUrls: ['./attachment-viewer.component.css'],
})
export class AttachmentViewerComponent implements OnInit {
  loading: boolean;
  error: string;

  @Input() attachmentFile: FileModel;
  fileType: string;

  // tslint:disable-next-line: no-output-native
  @Output() close = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {
    this.loading = true;
    this.fileType = this.attachmentFile.fileName
      .substring(this.attachmentFile.fileName.lastIndexOf('.') + 1)
      .toLowerCase();
    this.loading = false;
  }

  onClose() {
    this.close.emit();
  }
}
