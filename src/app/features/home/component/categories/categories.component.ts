import { NgFor } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Categories, CategoryItem } from '@core/models/Categories.model';
import { HomeDataService } from '@core/services/home.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [NgFor],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit, OnDestroy {
  categories: CategoryItem[] = [];
  selectCategoryId!: number;
  @Output() categorySelected = new EventEmitter<number | null>();

  private destroy$ = new Subject<void>();

  constructor(private homeDataService: HomeDataService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.homeDataService.getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: Categories) => {
          if (data?.Categories?.length) {
            this.categories = data.Categories;
            this.selectCategoryId = this.categories[0].id;
            this.categorySelected.emit(this.selectCategoryId);
          }
        },
        error: (error) => {
          console.error('Error loading categories:', error);
        }
      });
  }

  selectCategory(categoryId: number): void {
    this.selectCategoryId = categoryId;
    this.categorySelected.emit(categoryId);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
