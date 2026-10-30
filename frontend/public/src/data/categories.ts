import { Category } from '../types/recipe';

export interface CategoryInfo {
  id: Category;
  name: string;
  description: string;
  count: number;
  image: string;
  iconName: string;
}

export const CATEGORIES_DATA: CategoryInfo[] = [
  {
    id: 'Makanan Utama',
    name: 'Makanan Utama',
    description: 'Sajian lezat mengenyangkan untuk santap siang dan malam.',
    count: 12,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    iconName: 'Utensils'
  },
  {
    id: 'Sarapan',
    name: 'Sarapan',
    description: 'Menu praktis dan berenergi untuk memulai harimu.',
    count: 6,
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=600&q=80',
    iconName: 'Sun'
  },
  {
    id: 'Makanan Tradisional',
    name: 'Makanan Tradisional',
    description: 'Kekayaan cita rasa warisan nusantara kaya rempah.',
    count: 10,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80',
    iconName: 'Soup'
  },
  {
    id: 'Camilan',
    name: 'Camilan',
    description: 'Kudapan gurih & renyah untuk menemani waktu santai.',
    count: 5,
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=600&q=80',
    iconName: 'Cookie'
  },
  {
    id: 'Dessert',
    name: 'Dessert',
    description: 'Hidangan manis penutup hari yang memanjakan lidah.',
    count: 6,
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=600&q=80',
    iconName: 'Cake'
  },
  {
    id: 'Minuman',
    name: 'Minuman',
    description: 'Pelepas dahaga yang menyegarkan tubuh dan pikiran.',
    count: 4,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80',
    iconName: 'Coffee'
  },
  {
    id: 'Makanan Sehat',
    name: 'Makanan Sehat',
    description: 'Nutrisi seimbang, rendah kalori, dan penuh serat alami.',
    count: 6,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
    iconName: 'Salad'
  },
  {
    id: 'Seafood',
    name: 'Seafood',
    description: 'Olahan laut segar kaya protein dan bumbu gurih.',
    count: 4,
    image: 'https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=600&q=80',
    iconName: 'Fish'
  }
];
