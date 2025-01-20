import { SafeHtml } from "@angular/platform-browser";

export interface Banners{
banners : BannerItem [];
}


export  interface BannerItem {
  id: number;
  brief: string;
  image: string;
  title: SafeHtml;
}
