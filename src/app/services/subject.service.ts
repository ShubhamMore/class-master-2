import { SubjectModel } from '../models/course.model';
import { Injectable } from '@angular/core';
import { HttpService } from './shared-services/http.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SubjectService {
  private subjects = new BehaviorSubject<SubjectModel[]>([]);
  private subject = new BehaviorSubject<SubjectModel>(null);
  private subjectId: string;

  setSubjectId(subjectId: string) {
    this.subjectId = subjectId;
  }

  getSubjectId() {
    return this.subjectId;
  }

  deleteSubjectId() {
    this.subjectId = null;
  }

  setSubjectsData(subjects: SubjectModel[]) {
    this.subjects.next(subjects);
  }

  getSubjectsData() {
    return this.subjects;
  }

  deleteSubjectsData() {
    this.subjects.next([]);
  }

  setSubjectData(subject: SubjectModel) {
    this.subject.next(subject);
  }

  getSubjectData() {
    return this.subject;
  }

  deleteSubjectData() {
    this.subject.next(null);
  }

  constructor(private httpService: HttpService) {}
}
