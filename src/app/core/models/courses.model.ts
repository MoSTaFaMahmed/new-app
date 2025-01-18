export interface Courses{
  Courses : CourseItem [];
  }


  export  interface CourseItem {
    id: number;
    hours: number;
    image: string;
    level: string;
    price: number;
    title: string;
    author: string;
    category: string;
    discount: number;
    lectures: number;
    addToCart: boolean;
    categoryID: number;
    description: string;
    ratingCount: number;
    showOnHomepage : boolean;
  }
