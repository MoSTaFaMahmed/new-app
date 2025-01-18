import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CategoriesComponent } from '../categories/categories.component';
import { CourseCardComponent } from '../course-card/course-card.component';
import { NgFor, NgIf } from '@angular/common';
import { CourseItem, Courses } from '@core/models/courses.model';
import { Categories, CategoryItem } from '@core/models/Categories.model';
import { HomeDataService } from '@core/services/home.service';
import { CartService } from '@core/services/cart.service';
import { ToastService } from '@core/services/utilites/toast.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CategoriesComponent, CourseCardComponent, NgFor, NgIf],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent implements OnInit, OnDestroy {
  @Input() isMobile: boolean = false;

  courses: CourseItem[] = [];
  filteredCourses: CourseItem[] = [];
  categories: CategoryItem[] = [];
  selectedCategoryId: number | null = null;

  isLoading = true;
  private destroy$ = new Subject<void>();

  constructor(
    private homeDataService: HomeDataService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.isLoading = true;

    this.homeDataService.getCourses()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: Courses) => {
          this.courses = data.Courses;
          this.filteredCourses = data.Courses;
        },
        error: (error) => {
          console.error('Error loading courses:', error);
          this.toastService.showToast('Failed to load courses.', 'error');
        },
        complete: () => {
          this.isLoading = false;
        }
      });

    this.homeDataService.getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: Categories) => {
          this.categories = data.Categories;
        },
        error: (error) => {
          console.error('Error loading categories:', error);
          this.toastService.showToast('Failed to load categories.', 'error');
        }
      });
  }

  filterByCategory(categoryId: number | null): void {
    this.selectedCategoryId = categoryId;
    this.filteredCourses = Number(categoryId)
      ? this.courses.filter((course) => course.categoryID == categoryId)
      : this.courses;
  }



  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
