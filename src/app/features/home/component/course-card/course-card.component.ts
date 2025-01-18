import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CourseItem, Courses } from '@core/models/courses.model';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [NgIf, NgClass, NgFor],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.scss',
})
export class CourseCardComponent {
  @Input() course!: CourseItem;

  constructor(private router: Router) {}

  goToCourseDetails(course: CourseItem) {
    this.router.navigate(['/course-details', course.id], {
      state: { course },
    });
  }
}
