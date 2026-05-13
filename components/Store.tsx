import React, { useState, useMemo, useRef } from 'react';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  FileText, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp,
  Package,
  CircleDashed,
  Settings2,
  Wrench,
  Cylinder,
  CornerDownRight,
  GitFork,
  Minimize2,
  Link,
  LayoutGrid,
  Plug2,
  Droplets,
  Download,
  Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import html2canvas from 'html2canvas';

interface Product {
  id: string;
  name: string;
  unit: 'branch' | 'piece';
  category: 'pipe' | 'elbow' | 'tee' | 'reducer' | 'valve' | 'nipple' | 'clamp' | 'accessory';
  basePrice?: number; // Placeholder for future use
}

const PRODUCTS: Product[] = [
  // Pipes API
  { id: 'p-12-api', name: 'لوله ۱/۲ اینچ سنگین (API)', unit: 'branch', category: 'pipe' },
  { id: 'p-34-api', name: 'لوله ۳/۴ اینچ سنگین (API)', unit: 'branch', category: 'pipe' },
  { id: 'p-1-api', name: 'لوله ۱ اینچ سنگین (API)', unit: 'branch', category: 'pipe' },
  { id: 'p-114-api', name: 'لوله ۱ ۱/۴ اینچ سنگین (API)', unit: 'branch', category: 'pipe' },
  { id: 'p-112-api', name: 'لوله ۱ ۱/۲ اینچ سنگین (API)', unit: 'branch', category: 'pipe' },
  { id: 'p-2-api', name: 'لوله ۲ اینچ سنگین (API)', unit: 'branch', category: 'pipe' },
  { id: 'p-212-api', name: 'لوله ۲ ۱/۲ اینچ سنگین (API)', unit: 'branch', category: 'pipe' },
  { id: 'p-3-api', name: 'لوله ۳ اینچ سنگین (API)', unit: 'branch', category: 'pipe' },
  { id: 'p-4-api', name: 'لوله ۴ اینچ سنگین (API)', unit: 'branch', category: 'pipe' },
  
  // Pipes Seamed (درزدار)
  { id: 'p-12-sd', name: 'لوله ۱/۲ اینچ درزدار', unit: 'branch', category: 'pipe' },
  { id: 'p-34-sd', name: 'لوله ۳/۴ اینچ درزدار', unit: 'branch', category: 'pipe' },
  { id: 'p-1-sd', name: 'لوله ۱ اینچ درزدار', unit: 'branch', category: 'pipe' },
  { id: 'p-114-sd', name: 'لوله ۱ ۱/۴ اینچ درزدار', unit: 'branch', category: 'pipe' },
  { id: 'p-112-sd', name: 'لوله ۱ ۱/۲ اینچ درزدار', unit: 'branch', category: 'pipe' },
  { id: 'p-2-sd', name: 'لوله ۲ اینچ درزدار', unit: 'branch', category: 'pipe' },
  { id: 'p-212-sd', name: 'لوله ۲ ۱/۲ اینچ درزدار', unit: 'branch', category: 'pipe' },
  { id: 'p-3-sd', name: 'لوله ۳ اینچ درزدار', unit: 'branch', category: 'pipe' },
  { id: 'p-4-sd', name: 'لوله ۴ اینچ درزدار', unit: 'branch', category: 'pipe' },

  // Elbows Maniseman (مانیسمان)
  { id: 'e-12-ms', name: 'زانو ۱/۲ اینچ مانیسمان', unit: 'piece', category: 'elbow' },
  { id: 'e-34-ms', name: 'زانو ۳/۴ اینچ مانیسمان', unit: 'piece', category: 'elbow' },
  { id: 'e-1-ms', name: 'زانو ۱ اینچ مانیسمان', unit: 'piece', category: 'elbow' },
  { id: 'e-114-ms', name: 'زانو ۱ ۱/۴ اینچ مانیسمان', unit: 'piece', category: 'elbow' },
  { id: 'e-112-ms', name: 'زانو ۱ ۱/۲ اینچ مانیسمان', unit: 'piece', category: 'elbow' },
  { id: 'e-2-ms', name: 'زانو ۲ اینچ مانیسمان', unit: 'piece', category: 'elbow' },
  { id: 'e-212-ms', name: 'زانو ۲ ۱/۲ اینچ مانیسمان', unit: 'piece', category: 'elbow' },
  { id: 'e-3-ms', name: 'زانو ۳ اینچ مانیسمان', unit: 'piece', category: 'elbow' },
  { id: 'e-4-ms', name: 'زانو ۴ اینچ مانیسمان', unit: 'piece', category: 'elbow' },
  
  // Elbows Seamed (درزدار)
  { id: 'e-12-sd-f', name: 'زانو ۱/۲ اینچ درزدار', unit: 'piece', category: 'elbow' },
  { id: 'e-34-sd-f', name: 'زانو ۳/۴ اینچ درزدار', unit: 'piece', category: 'elbow' },
  { id: 'e-1-sd-f', name: 'زانو ۱ اینچ درزدار', unit: 'piece', category: 'elbow' },
  { id: 'e-114-sd-f', name: 'زانو ۱ ۱/۴ اینچ درزدار', unit: 'piece', category: 'elbow' },
  { id: 'e-112-sd-f', name: 'زانو ۱ ۱/۲ اینچ درزدار', unit: 'piece', category: 'elbow' },
  { id: 'e-2-sd-f', name: 'زانو ۲ اینچ درزدار', unit: 'piece', category: 'elbow' },
  { id: 'e-212-sd-f', name: 'زانو ۲ ۱/۲ اینچ درزدار', unit: 'piece', category: 'elbow' },
  { id: 'e-3-sd-f', name: 'زانو ۳ اینچ درزدار', unit: 'piece', category: 'elbow' },
  { id: 'e-4-sd-f', name: 'زانو ۴ اینچ درزدار', unit: 'piece', category: 'elbow' },

  // Equal Tees (سه راهی مساوی) - Maniseman
  { id: 'te-12-ms', name: 'سه راهی مساوی ۱/۲ اینچ مانیسمان', unit: 'piece', category: 'tee' },
  { id: 'te-34-ms', name: 'سه راهی مساوی ۳/۴ اینچ مانیسمان', unit: 'piece', category: 'tee' },
  { id: 'te-1-ms', name: 'سه راهی مساوی ۱ اینچ مانیسمان', unit: 'piece', category: 'tee' },
  { id: 'te-114-ms', name: 'سه راهی مساوی ۱ ۱/۴ اینچ مانیسمان', unit: 'piece', category: 'tee' },
  { id: 'te-112-ms', name: 'سه راهی مساوی ۱ ۱/۲ اینچ مانیسمان', unit: 'piece', category: 'tee' },
  { id: 'te-2-ms', name: 'سه راهی مساوی ۲ اینچ مانیسمان', unit: 'piece', category: 'tee' },

  // Equal Tees (سه راهی مساوی) - Seamed
  { id: 'te-12-sd', name: 'سه راهی مساوی ۱/۲ اینچ درزدار', unit: 'piece', category: 'tee' },
  { id: 'te-34-sd', name: 'سه راهی مساوی ۳/۴ اینچ درزدار', unit: 'piece', category: 'tee' },
  { id: 'te-1-sd', name: 'سه راهی مساوی ۱ اینچ درزدار', unit: 'piece', category: 'tee' },
  { id: 'te-114-sd', name: 'سه راهی مساوی ۱ ۱/۴ اینچ درزدار', unit: 'piece', category: 'tee' },
  { id: 'te-112-sd', name: 'سه راهی مساوی ۱ ۱/۲ اینچ درزدار', unit: 'piece', category: 'tee' },
  { id: 'te-2-sd', name: 'سه راهی مساوی ۲ اینچ درزدار', unit: 'piece', category: 'tee' },

  // Reducing Tees (سه راهی نافی) - Maniseman
  { id: 'tr-34-12-ms', name: 'سه راهی نافی ۳/۴ در ۱/۲ مانیسمان', unit: 'piece', category: 'tee' },
  { id: 'tr-1-12-ms', name: 'سه راهی نافی ۱ در ۱/۲ مانیسمان', unit: 'piece', category: 'tee' },
  { id: 'tr-1-34-ms', name: 'سه راهی نافی ۱ در ۳/۴ مانیسمان', unit: 'piece', category: 'tee' },
  { id: 'tr-114-1-ms', name: 'سه راهی نافی ۱ ۱/۴ در ۱ مانیسمان', unit: 'piece', category: 'tee' },
  { id: 'tr-114-34-ms', name: 'سه راهی نافی ۱ ۱/۴ در ۳/۴ مانیسمان', unit: 'piece', category: 'tee' },
  { id: 'tr-114-12-ms', name: 'سه راهی نافی ۱ ۱/۴ در ۱/۲ مانیسمان', unit: 'piece', category: 'tee' },
  { id: 'tr-112-1-ms', name: 'سه راهی نافی ۱ ۱/۲ در ۱ مانیسمان', unit: 'piece', category: 'tee' },
  { id: 'tr-112-114-ms', name: 'سه راهی نافی ۱ ۱/۲ در ۱ ۱/۴ مانیسمان', unit: 'piece', category: 'tee' },
  { id: 'tr-112-34-ms', name: 'سه راهی نافی ۱ ۱/۲ در ۳/۴ مانیسمان', unit: 'piece', category: 'tee' },
  { id: 'tr-112-12-ms', name: 'سه راهی نافی ۱ ۱/۲ در ۱/۲ مانیسمان', unit: 'piece', category: 'tee' },
  { id: 'tr-2-1-ms', name: 'سه راهی نافی ۲ در ۱ مانیسمان', unit: 'piece', category: 'tee' },
  { id: 'tr-2-114-ms', name: 'سه راهی نافی ۲ در ۱ ۱/۴ مانیسمان', unit: 'piece', category: 'tee' },
  { id: 'tr-2-112-ms', name: 'سه راهی نافی ۲ در ۱ ۱/۲ مانیسمان', unit: 'piece', category: 'tee' },

  // Reducing Tees (سه راهی نافی) - Seamed
  { id: 'tr-34-12-sd-f', name: 'سه راهی نافی ۳/۴ در ۱/۲ درزدار', unit: 'piece', category: 'tee' },
  { id: 'tr-1-12-sd-f', name: 'سه راهی نافی ۱ در ۱/۲ درزدار', unit: 'piece', category: 'tee' },
  { id: 'tr-1-34-sd-f', name: 'سه راهی نافی ۱ در ۳/۴ درزدار', unit: 'piece', category: 'tee' },
  { id: 'tr-114-1-sd-f', name: 'سه راهی نافی ۱ ۱/۴ در ۱ درزدار', unit: 'piece', category: 'tee' },
  { id: 'tr-114-34-sd-f', name: 'سه راهی نافی ۱ ۱/۴ در ۳/۴ درزدار', unit: 'piece', category: 'tee' },
  { id: 'tr-114-12-sd-f', name: 'سه راهی نافی ۱ ۱/۴ در ۱/۲ درزدار', unit: 'piece', category: 'tee' },
  { id: 'tr-112-1-sd-f', name: 'سه راهی نافی ۱ ۱/۲ در ۱ درزدار', unit: 'piece', category: 'tee' },
  { id: 'tr-112-114-sd-f', name: 'سه راهی نافی ۱ ۱/۲ در ۱ ۱/۴ درزدار', unit: 'piece', category: 'tee' },
  { id: 'tr-112-34-sd-f', name: 'سه راهی نافی ۱ ۱/۲ در ۳/۴ درزدار', unit: 'piece', category: 'tee' },
  { id: 'tr-112-12-sd-f', name: 'سه راهی نافی ۱ ۱/۲ در ۱/۲ درزدار', unit: 'piece', category: 'tee' },
  { id: 'tr-2-1-sd-f', name: 'سه راهی نافی ۲ در ۱ درزدار', unit: 'piece', category: 'tee' },
  { id: 'tr-2-114-sd-f', name: 'سه راهی نافی ۲ در ۱ ۱/۴ درزدار', unit: 'piece', category: 'tee' },
  { id: 'tr-2-112-sd-f', name: 'سه راهی نافی ۲ در ۱ ۱/۲ درزدار', unit: 'piece', category: 'tee' },

  // Reducers (تبدیل) - Maniseman
  { id: 'r-34-12-ms', name: 'تبدیل ۳/۴ به ۱/۲ مانیسمان', unit: 'piece', category: 'reducer' },
  { id: 'r-1-34-ms', name: 'تبدیل ۱ به ۳/۴ مانیسمان', unit: 'piece', category: 'reducer' },
  { id: 'r-1-12-ms', name: 'تبدیل ۱ به ۱/۲ مانیسمان', unit: 'piece', category: 'reducer' },
  { id: 'r-114-1-ms', name: 'تبدیل ۱ ۱/۴ به ۱ مانیسمان', unit: 'piece', category: 'reducer' },
  { id: 'r-114-34-ms', name: 'تبدیل ۱ ۱/۴ به ۳/۴ مانیسمان', unit: 'piece', category: 'reducer' },
  { id: 'r-112-114-ms', name: 'تبدیل ۱ ۱/۲ به ۱ ۱/۴ مانیسمان', unit: 'piece', category: 'reducer' },
  { id: 'r-112-34-ms', name: 'تبدیل ۱ ۱/۲ به ۳/۴ مانیسمان', unit: 'piece', category: 'reducer' },
  { id: 'r-2-1-ms', name: 'تبدیل ۲ به ۱ مانیسمان', unit: 'piece', category: 'reducer' },
  { id: 'r-2-114-ms', name: 'تبدیل ۲ به ۱ ۱/۴ مانیسمان', unit: 'piece', category: 'reducer' },
  { id: 'r-2-112-ms', name: 'تبدیل ۲ به ۱ ۱/۲ مانیسمان', unit: 'piece', category: 'reducer' },
  { id: 'r-212-2-ms', name: 'تبدیل ۲ ۱/۲ به ۲ مانیسمان', unit: 'piece', category: 'reducer' },
  { id: 'r-3-212-ms', name: 'تبدیل ۳ به ۲ ۱/۲ مانیسمان', unit: 'piece', category: 'reducer' },
  { id: 'r-3-2-ms', name: 'تبدیل ۳ به ۲ مانیسمان', unit: 'piece', category: 'reducer' },
  { id: 'r-3-112-ms', name: 'تبدیل ۳ به ۱ ۱/۲ مانیسمان', unit: 'piece', category: 'reducer' },
  { id: 'r-4-3-ms', name: 'تبدیل ۴ به ۳ مانیسمان', unit: 'piece', category: 'reducer' },
  { id: 'r-4-212-ms', name: 'تبدیل ۴ به ۲ ۱/۲ مانیسمان', unit: 'piece', category: 'reducer' },

  // Reducers (تبدیل) - Seamed
  { id: 'r-34-12-sd', name: 'تبدیل ۳/۴ به ۱/۲ درزدار', unit: 'piece', category: 'reducer' },
  { id: 'r-1-34-sd', name: 'تبدیل ۱ به ۳/۴ درزدار', unit: 'piece', category: 'reducer' },
  { id: 'r-1-12-sd', name: 'تبدیل ۱ به ۱/۲ درزدار', unit: 'piece', category: 'reducer' },
  { id: 'r-114-1-sd', name: 'تبدیل ۱ ۱/۴ به ۱ درزدار', unit: 'piece', category: 'reducer' },
  { id: 'r-114-34-sd', name: 'تبدیل ۱ ۱/۴ به ۳/۴ درزدار', unit: 'piece', category: 'reducer' },
  { id: 'r-112-1-sd', name: 'تبدیل ۱ ۱/۲ به ۱ درزدار', unit: 'piece', category: 'reducer' },
  { id: 'r-112-34-sd', name: 'تبدیل ۱ ۱/۲ به ۳/۴ درزدار', unit: 'piece', category: 'reducer' },
  { id: 'r-2-1-sd', name: 'تبدیل ۲ به ۱ درزدار', unit: 'piece', category: 'reducer' },
  { id: 'r-2-114-sd', name: 'تبدیل ۲ به ۱ ۱/۴ درزدار', unit: 'piece', category: 'reducer' },
  { id: 'r-2-112-sd', name: 'تبدیل ۲ به ۱ ۱/۲ درزدار', unit: 'piece', category: 'reducer' },
  { id: 'r-3-212-sd', name: 'تبدیل ۳ به ۲ ۱/۲ درزدار', unit: 'piece', category: 'reducer' },
  { id: 'r-3-2-sd', name: 'تبدیل ۳ به ۲ درزدار', unit: 'piece', category: 'reducer' },
  { id: 'r-3-112-sd', name: 'تبدیل ۳ به ۱ ۱/۲ درزدار', unit: 'piece', category: 'reducer' },
  { id: 'r-4-3-sd', name: 'تبدیل ۴ به ۳ درزدار', unit: 'piece', category: 'reducer' },
  { id: 'r-4-212-sd', name: 'تبدیل ۴ به ۲ ۱/۲ درزدار', unit: 'piece', category: 'reducer' },

  // Valves
  { id: 'v-12', name: 'شیر ۱/۲ اینچ گازی', unit: 'piece', category: 'valve' },
  { id: 'v-34', name: 'شیر ۳/۴ اینچ گازی', unit: 'piece', category: 'valve' },
  { id: 'v-1', name: 'شیر ۱ اینچ گازی', unit: 'piece', category: 'valve' },
  { id: 'v-114', name: 'شیر ۱ ۱/۴ اینچ گازی', unit: 'piece', category: 'valve' },
  { id: 'v-112', name: 'شیر ۱ ۱/۲ اینچ گازی', unit: 'piece', category: 'valve' },
  { id: 'v-2', name: 'شیر ۲ اینچ گازی', unit: 'piece', category: 'valve' },
  { id: 'v-212', name: 'شیر ۲ ۱/۲ اینچ گازی', unit: 'piece', category: 'valve' },
  { id: 'v-3', name: 'شیر ۳ اینچ گازی', unit: 'piece', category: 'valve' },
  
  // Threaded Ends (سردنده) - Maniseman
  { id: 'ni-12-ms', name: 'سردنده ۱/۲ اینچ مانیسمان', unit: 'piece', category: 'nipple' },
  { id: 'ni-34-ms', name: 'سردنده ۳/۴ اینچ مانیسمان', unit: 'piece', category: 'nipple' },
  { id: 'ni-1-ms', name: 'سردنده ۱ اینچ مانیسمان', unit: 'piece', category: 'nipple' },
  { id: 'ni-114-ms', name: 'سردنده ۱ ۱/۴ اینچ مانیسمان', unit: 'piece', category: 'nipple' },
  { id: 'ni-112-ms', name: 'سردنده ۱ ۱/۲ اینچ مانیسمان', unit: 'piece', category: 'nipple' },
  { id: 'ni-2-ms', name: 'سردنده ۲ اینچ مانیسمان', unit: 'piece', category: 'nipple' },
  { id: 'ni-212-ms', name: 'سردنده ۲ ۱/۲ اینچ مانیسمان', unit: 'piece', category: 'nipple' },
  { id: 'ni-3-ms', name: 'سردنده ۳ اینچ مانیسمان', unit: 'piece', category: 'nipple' },
  { id: 'ni-4-ms', name: 'سردنده ۴ اینچ مانیسمان', unit: 'piece', category: 'nipple' },

  // Threaded Ends (سردنده) - Seamed
  { id: 'ni-12-sd', name: 'سردنده ۱/۲ اینچ درزدار', unit: 'piece', category: 'nipple' },
  { id: 'ni-34-sd', name: 'سردنده ۳/۴ اینچ درزدار', unit: 'piece', category: 'nipple' },
  { id: 'ni-1-sd', name: 'سردنده ۱ اینچ درزدار', unit: 'piece', category: 'nipple' },
  { id: 'ni-114-sd', name: 'سردنده ۱ ۱/۴ اینچ درزدار', unit: 'piece', category: 'nipple' },
  { id: 'ni-112-sd', name: 'سردنده ۱ ۱/۲ اینچ درزدار', unit: 'piece', category: 'nipple' },
  { id: 'ni-2-sd', name: 'سردنده ۲ اینچ درزدار', unit: 'piece', category: 'nipple' },
  { id: 'ni-212-sd', name: 'سردنده ۲ ۱/۲ اینچ درزدار', unit: 'piece', category: 'nipple' },
  { id: 'ni-3-sd', name: 'سردنده ۳ اینچ درزدار', unit: 'piece', category: 'nipple' },
  { id: 'ni-4-sd', name: 'سردنده ۴ اینچ درزدار', unit: 'piece', category: 'nipple' },

  // Clamps (بست) - Two-leg (بست دوپایه)
  { id: 'c-12-tp', name: 'بست دوپایه ۱/۲ اینچ', unit: 'piece', category: 'clamp' },
  { id: 'c-34-tp', name: 'بست دوپایه ۳/۴ اینچ', unit: 'piece', category: 'clamp' },
  { id: 'c-1-tp', name: 'بست دوپایه ۱ اینچ', unit: 'piece', category: 'clamp' },
  { id: 'c-114-tp', name: 'بست دوپایه ۱ ۱/۴ اینچ', unit: 'piece', category: 'clamp' },
  { id: 'c-112-tp', name: 'بست دوپایه ۱ ۱/۲ اینچ', unit: 'piece', category: 'clamp' },
  { id: 'c-2-tp', name: 'بست دوپایه ۲ اینچ', unit: 'piece', category: 'clamp' },
  { id: 'c-212-tp', name: 'بست دوپایه ۲ ۱/۲ اینچ', unit: 'piece', category: 'clamp' },
  { id: 'c-3-tp', name: 'بست دوپایه ۳ اینچ', unit: 'piece', category: 'clamp' },
  { id: 'c-4-tp', name: 'بست دوپایه ۴ اینچ', unit: 'piece', category: 'clamp' },

  // Clamps (بست) - Yellow (بست زرد)
  { id: 'c-12-yl', name: 'بست زرد ۱/۲ اینچ', unit: 'piece', category: 'clamp' },
  { id: 'c-34-yl', name: 'بست زرد ۳/۴ اینچ', unit: 'piece', category: 'clamp' },
  { id: 'c-1-yl', name: 'بست زرد ۱ اینچ', unit: 'piece', category: 'clamp' },
  { id: 'c-114-yl', name: 'بست زرد ۱ ۱/۴ اینچ', unit: 'piece', category: 'clamp' },
  { id: 'c-112-yl', name: 'بست زرد ۱ ۱/۲ اینچ', unit: 'piece', category: 'clamp' },
  { id: 'c-2-yl', name: 'بست زرد ۲ اینچ', unit: 'piece', category: 'clamp' },
  { id: 'c-212-yl', name: 'بست زرد ۲ ۱/۲ اینچ', unit: 'piece', category: 'clamp' },

  // Accessories (لوازم جانبی)
  { id: 'acc-1', name: 'سیم جوش', unit: 'piece', category: 'accessory' },
  { id: 'acc-2', name: 'نوار تفلون', unit: 'piece', category: 'accessory' },
  { id: 'acc-3', name: 'نوار سیتکو', unit: 'piece', category: 'accessory' },
  { id: 'acc-4', name: 'نوار پرایمر', unit: 'piece', category: 'accessory' },
  { id: 'acc-5', name: 'پرایمر مایع', unit: 'piece', category: 'accessory' },
  { id: 'acc-6', name: 'رنگ ۲۵۰گرم', unit: 'piece', category: 'accessory' },
  { id: 'acc-7', name: 'پیچ و رولپلاک', unit: 'piece', category: 'accessory' },
  { id: 'acc-8', name: 'صفحه پروفیل بر', unit: 'piece', category: 'accessory' },
  { id: 'acc-9', name: 'صفحه استیل بر', unit: 'piece', category: 'accessory' },
  { id: 'acc-10', name: 'مل', unit: 'piece', category: 'accessory' },
  { id: 'acc-11', name: 'لوله سفید یک متری', unit: 'piece', category: 'accessory' },
  { id: 'acc-12', name: 'لوازم کنتور (چپقی-زانو دنده ای-نیپل-مهره ماسوره)', unit: 'piece', category: 'accessory' },
];

interface CartItem {
  productId: string;
  quantity: number;
}

export const Store: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showInvoiced, setShowInvoice] = useState(false);
  const [includeApi, setIncludeApi] = useState(false);
  const [includeManiseman, setIncludeManiseman] = useState(false);
  const [includeYellowClamp, setIncludeYellowClamp] = useState(false);

  // Accordion state
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (catId: string) => {
    setExpandedCategories(prev => 
      prev.includes(catId) 
        ? prev.filter(id => id !== catId) 
        : [...prev, catId]
    );
  };

  const toggleProduct = (productId: string) => {
    setCart(prev => {
      const exists = prev.find(item => item.productId === productId);
      if (exists) {
        return prev.filter(item => item.productId !== productId);
      } else {
        return [...prev, { productId, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.productId === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const setManualQuantity = (productId: string, val: string) => {
      const num = parseInt(val) || 0;
      setCart(prev => prev.map(item => {
          if (item.productId === productId) {
              return { ...item, quantity: num };
          }
          return item;
      }));
  };

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;

    // If there's an active search term, show the item regardless of toggles
    if (searchTerm.trim() !== '') return true;

    // Otherwise, respect the toggles
    if (p.id.endsWith('-api') && !includeApi) return false;
    if (p.id.endsWith('-ms') && !includeManiseman) return false;
    
    // Clamp logic: Switch between Yellow and Two-leg
    if (p.category === 'clamp') {
      if (includeYellowClamp) return p.id.endsWith('-yl');
      return p.id.endsWith('-tp');
    }

    if (p.id.endsWith('-yl') && !includeYellowClamp) return false;

    return true;
  });

  const categories = [
    { 
      id: 'pipe', 
      label: 'لوله‌ها', 
      icon: Cylinder,
      toggleLabel: 'نمایش لوله‌های API (توکار)',
      toggleValue: includeApi,
      setToggle: setIncludeApi
    },
    { 
      id: 'elbow', 
      label: 'زانوها', 
      icon: CornerDownRight,
      toggleLabel: 'نمایش قطعات مانیسمان (توکار)',
      toggleValue: includeManiseman,
      setToggle: setIncludeManiseman
    },
    { 
      id: 'tee', 
      label: 'سه‌راهی‌ها', 
      icon: GitFork,
      toggleLabel: 'نمایش قطعات مانیسمان (توکار)',
      toggleValue: includeManiseman,
      setToggle: setIncludeManiseman
    },
    { 
      id: 'reducer', 
      label: 'تبدیل‌ها', 
      icon: Minimize2,
      toggleLabel: 'نمایش قطعات مانیسمان (توکار)',
      toggleValue: includeManiseman,
      setToggle: setIncludeManiseman
    },
    { 
      id: 'nipple', 
      label: 'سردنده‌ها', 
      icon: Plug2,
      toggleLabel: 'نمایش قطعات مانیسمان (توکار)',
      toggleValue: includeManiseman,
      setToggle: setIncludeManiseman
    },
    { 
      id: 'clamp', 
      label: 'بست‌ها', 
      icon: Link,
      toggleLabel: 'نمایش بست زرد',
      toggleValue: includeYellowClamp,
      setToggle: setIncludeYellowClamp
    },
    { id: 'valve', label: 'شیرآلات', icon: Droplets },
    { id: 'accessory', label: 'لوازم جانبی', icon: LayoutGrid },
  ];

  const cartTotalItems = cart.length;
  const [isCapturing, setIsCapturing] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [senderInfo, setSenderInfo] = useState({ name: '', phone: '' });
  const [showSenderForm, setShowSenderForm] = useState(false);
  const [pendingAction, setPendingAction] = useState<'save' | 'share' | null>(null);
  const invoiceRef = useRef<HTMLDivElement>(null);

  const handleActionWithInfo = (action: 'save' | 'share') => {
    if (action === 'save') {
      handleSaveImage();
      return;
    }

    if (!senderInfo.name || !senderInfo.phone) {
      setPendingAction(action);
      setShowSenderForm(true);
    } else {
      handleTelegramInquiry();
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSenderForm(false);
    if (pendingAction === 'save') handleSaveImage();
    else if (pendingAction === 'share') handleTelegramInquiry();
    setPendingAction(null);
  };

  const handleSaveImage = async () => {
    if (!invoiceRef.current || isCapturing) return;
    
    setIsCapturing(true);
    const element = invoiceRef.current;
    
    try {
      // Small delay to ensure any layout changes are settled
      await new Promise(resolve => setTimeout(resolve, 200));

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        onclone: (clonedDoc) => {
           // 1. Force-replace oklch variables with HEX fallbacks in a global style
           const style = clonedDoc.createElement('style');
           style.innerHTML = `
             :root, * { 
               --color-blue-600: #2563eb !important;
               --color-slate-900: #0f172a !important;
               --color-slate-700: #334155 !important;
               --color-slate-500: #64748b !important;
               --color-slate-100: #f1f5f9 !important;
               --color-slate-50: #f8fafc !important;
             }
             /* Remove all oklch references from CSS variables that html2canvas might try to parse */
             * { color-scheme: light !important; }
             .bg-blue-600 { background-color: #2563eb !important; }
             .text-blue-600 { color: #2563eb !important; }
           `;
           clonedDoc.head.appendChild(style);

           // 2. Be extremely aggressive: strip oklch from ALL computed styles manually
           clonedDoc.querySelectorAll('*').forEach(el => {
              const htmlEl = el as HTMLElement;
              // Hide no-print elements
              if (htmlEl.classList.contains('no-print')) {
                htmlEl.style.display = 'none';
                return;
              }
              
              // html2canvas fails when it sees "oklch" in any property it tries to parse.
              // We'll iterate through all styles and if they contain oklch, we set them to a safe fallback or clear them.
              const styles = window.getComputedStyle(el);
              if (styles.backgroundColor.includes('oklch')) htmlEl.style.backgroundColor = '#ffffff';
              if (styles.color.includes('oklch')) htmlEl.style.color = '#1e293b';
              if (styles.borderColor.includes('oklch')) htmlEl.style.borderColor = '#e2e8f0';
              if (styles.fill.includes('oklch')) htmlEl.style.fill = 'currentColor';
              if (styles.stroke.includes('oklch')) htmlEl.style.stroke = 'currentColor';
           });
        }
      });
      
      const image = canvas.toDataURL('image/png');
      
      const link = document.createElement('a');
      link.href = image;
      link.download = `pish-faktor-${new Date().getTime()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error: any) {
      console.error('Error saving image:', error);
      alert(`خطا در ذخیره تصویر: ${error.message || 'نامشخص'}\nمشکل معمولاً مربوط به مفسر رنگ "oklch" در پوسته‌ی جدید است. در حال تلاش برای بهینه‌سازی...`);
    } finally {
      setIsCapturing(false);
    }
  };

  const handleTelegramInquiry = async () => {
    if (isSending) return;
    
    setIsSending(true);
    
    const cartItems = cart.map(item => {
      const product = PRODUCTS.find(p => p.id === item.productId);
      return {
        name: product?.name || 'کالای ناشناخته',
        quantity: item.quantity,
        unit: product?.unit || 'piece'
      };
    });

    try {
      // Use standard endpoint
      const endpoint = '/api/inquiry';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: senderInfo.name,
          phone: senderInfo.phone,
          cart: cartItems,
          totalItems: cart.reduce((sum, item) => sum + item.quantity, 0)
        })
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Non-JSON response received:", text);
        throw new Error("پاسخ سرور نامعتبر است. احتمالا مشکلی در متغیرهای محیطی تلگرام وجود دارد یا سرور متوقف شده است.");
      }

      const data = await response.json();

      if (data.success) {
        alert('استعلام شما با موفقیت ارسال شد. بزودی با شما تماس خواهیم گرفت.');
      } else {
        alert(data.message || 'خطا در ارسال استعلام.');
        handleNativeShare();
      }
    } catch (error: any) {
      console.error('Error sending inquiry:', error);
      alert(`خطا در ارتباط با سرور: ${error.message || 'نامشخص'}\nلطفا اتصال خود را بررسی کنید و از تنظیم بودن TOKEN و CHAT_ID در بخش Settings اطمینان حاصل کنید.`);
    } finally {
      setIsSending(false);
    }
  };

  const handleNativeShare = async () => {
    if (!invoiceRef.current) return;
    
    // Check if Web Share API is available
    if (navigator.share && window.isSecureContext) {
      try {
        const canvas = await html2canvas(invoiceRef.current, { scale: 2 });
        canvas.toBlob(async (blob) => {
          if (!blob) {
            window.print();
            return;
          }
          const file = new File([blob], 'invoice.png', { type: 'image/png' });
          
          try {
            await navigator.share({
              files: [file],
              title: 'Gasino Invoice',
              text: `پیش‌فاکتور ملزومات گاز\nنام: ${senderInfo.name}\nشماره تماس: ${senderInfo.phone}`
            });
          } catch (shareError) {
             console.log('Share error, falling back back to print:', shareError);
             window.print();
          }
        });
      } catch (error) {
        console.error('Error sharing:', error);
        window.print();
      }
    } else {
      window.print();
    }
  };

  if (showInvoiced) {
    return (
      <div className="max-w-3xl mx-auto animate-in fade-in zoom-in duration-300">
        <div ref={invoiceRef} className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-slate-100">
          <div className="bg-blue-600 p-8 text-white flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-black mb-1">پیش‌فاکتور ملزومات گاز</h2>
              <div className="flex flex-col gap-1">
                <p className="text-blue-100 text-sm">لیست برآوردی پروژه بر اساس استعلام کاربر</p>
                {senderInfo.name && (
                  <div className="flex items-center gap-4 mt-2 bg-white/10 p-2 rounded-lg text-xs">
                    <span>فرستنده: <span className="font-bold">{senderInfo.name}</span></span>
                    <span>شماره تماس: <span className="font-bold">{senderInfo.phone}</span></span>
                  </div>
                )}
              </div>
            </div>
            <button 
              onClick={() => setShowInvoice(false)}
              className="bg-white/20 hover:bg-white/30 p-2 rounded-xl transition-colors no-print"
            >
              <Plus className="rotate-45 w-6 h-6" />
            </button>
          </div>
          
          <div className="p-8">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-100 text-slate-400 text-sm">
                  <th className="py-4 font-bold">شرح کالا</th>
                  <th className="py-4 font-bold">تعداد/مقدار</th>
                  <th className="py-4 font-bold text-center">واحد</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => {
                  const product = PRODUCTS.find(p => p.id === item.productId);
                  if (!product) return null;
                  return (
                    <tr key={item.productId} className="border-b border-slate-50">
                      <td className="py-5 font-bold text-slate-700">{product.name}</td>
                      <td className="py-5 font-black text-blue-600">{item.quantity}</td>
                      <td className="py-5 text-slate-500 text-center">
                        {product.unit === 'branch' ? 'شاخه' : 'عدد'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {cart.length === 0 && (
              <div className="py-20 text-center text-slate-400">
                <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>لیست خالی است</p>
              </div>
            )}

            <div className="mt-12 text-slate-500 text-sm italic">
              <p>توجه: این لیست صرفاً جهت برآورد متریال بوده و فاقد ارزش قانونی برای معامله است.</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center items-center no-print px-4">
            <button 
                onClick={() => handleActionWithInfo('save')}
                disabled={isCapturing}
                className={`w-full md:w-auto ${isCapturing ? 'bg-slate-400' : 'bg-green-600 hover:bg-green-700'} text-white px-8 py-4 rounded-2xl font-black flex items-center justify-center gap-3 active:scale-95 transition-all shadow-lg shadow-green-100 disabled:cursor-not-allowed`}
            >
              {isCapturing ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Download className="w-6 h-6" />
              )}
              {isCapturing ? 'در حال پردازش...' : 'ذخیره لیست (تصویر)'}
            </button>
            
            <button 
                onClick={() => handleActionWithInfo('share')}
                disabled={isSending}
                className={`w-full md:w-auto ${isSending ? 'bg-slate-400' : 'bg-slate-900 hover:bg-slate-800'} text-white px-8 py-4 rounded-2xl font-black flex items-center justify-center gap-3 active:scale-95 transition-all shadow-lg shadow-slate-100 disabled:cursor-not-allowed`}
            >
              {isSending ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Share2 className="w-6 h-6" />
              )}
              {isSending ? 'در حال ارسال...' : 'استعلام قیمت پیش‌فاکتور'}
            </button>
        </div>

        {/* Sender Info Modal */}
        <AnimatePresence>
          {showSenderForm && (
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl overflow-hidden"
              >
                <div className="bg-slate-900 p-6 text-white text-center">
                  <h3 className="text-xl font-black mb-1">اطلاعات فرستنده</h3>
                  <p className="text-slate-400 text-xs">جهت درج در ذیل پیش‌فاکتور، اطلاعات خود را وارد کنید</p>
                </div>
                <form onSubmit={handleFormSubmit} className="p-8 space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 mr-2">نام و نام خانوادگی</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all font-bold"
                      placeholder="مثال: علی محمدی"
                      value={senderInfo.name}
                      onChange={(e) => setSenderInfo(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 mr-2">شماره تماس</label>
                    <input 
                      required
                      type="tel" 
                      dir="ltr"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all font-bold text-right"
                      placeholder="09123456789"
                      value={senderInfo.phone}
                      onChange={(e) => setSenderInfo(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button 
                      type="button"
                      onClick={() => {
                        setShowSenderForm(false);
                        setPendingAction(null);
                      }}
                      className="flex-1 bg-slate-100 text-slate-500 py-4 rounded-2xl font-black hover:bg-slate-200 transition-colors"
                    >
                      انصراف
                    </button>
                    <button 
                      type="submit"
                      className="flex-3 bg-blue-600 text-white py-4 rounded-2xl font-black shadow-lg shadow-blue-100 hover:bg-blue-700 transition-colors"
                    >
                      تایید و ادامه
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 mb-1">فروشگاه</h2>
          <p className="text-slate-500 font-medium">انتخاب لوله و اتصالات جهت استعلام قیمت و پیش‌فاکتور</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <input 
              type="text" 
              placeholder="جستجوی کالا..."
              className="bg-white border border-slate-200 rounded-2xl py-3 pr-10 pl-4 w-48 md:w-64 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm font-bold"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Plus className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5 rotate-45" />
          </div>
          
          <button 
            onClick={() => setShowInvoice(true)}
            disabled={cart.length === 0}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm transition-all
              ${cart.length > 0 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-100 active:scale-95' 
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'}
            `}
          >
            <FileText className="w-5 h-5" />
            <div className="flex flex-col items-start leading-tight">
              <span>پیش‌فاکتور</span>
              <span className="text-[9px] font-medium opacity-80">استعلام قیمت کلی</span>
            </div>
            {cart.length > 0 && (
              <span className="bg-white text-blue-600 w-5 h-5 rounded-full flex items-center justify-center text-[10px] mr-1">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {categories.map((cat) => {
            const catProducts = filteredProducts.filter(p => p.category === cat.id);
            const isExpanded = expandedCategories.includes(cat.id);
            const hasToggle = !!cat.toggleLabel;

            if (catProducts.length === 0 && searchTerm !== '') return null;

            return (
              <div key={cat.id} className="bg-white rounded-[1.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <button 
                  onClick={() => toggleCategory(cat.id)}
                  className="w-full flex items-center justify-between p-5 hover:bg-slate-50/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl border transition-colors ${isExpanded ? 'bg-blue-600 text-white border-blue-600' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                      <cat.icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-black text-lg">{cat.label}</h3>
                    <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold">
                        {catProducts.length} کالا
                    </span>
                  </div>
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-5 pb-5 border-t border-slate-50 pt-4">
                        {hasToggle && (
                            <div className="flex justify-end mb-4">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <div className="relative inline-flex items-center">
                                        <input 
                                        type="checkbox" 
                                        className="sr-only peer"
                                        checked={cat.toggleValue}
                                        onChange={(e) => cat.setToggle?.(e.target.checked)}
                                        />
                                        <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                                    </div>
                                    <span className="text-xs font-bold text-slate-500 group-hover:text-blue-600 transition-colors">
                                        {cat.toggleLabel}
                                    </span>
                                </label>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {catProducts.map((product) => {
                            const inCart = cart.find(item => item.productId === product.id);
                            return (
                              <div 
                                key={product.id}
                                onClick={() => !inCart && toggleProduct(product.id)}
                                className={`
                                  cursor-pointer flex items-center justify-between p-4 rounded-2xl border transition-all duration-300
                                  ${inCart 
                                    ? 'bg-blue-50 border-blue-200 ring-2 ring-blue-500/10' 
                                    : 'bg-white border-slate-100 hover:border-blue-200 hover:shadow-sm'}
                                `}
                              >
                                <div className="flex items-center gap-4">
                                  <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleProduct(product.id);
                                    }}
                                    className={`
                                      w-6 h-6 rounded-lg flex items-center justify-center transition-colors
                                      ${inCart ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-300'}
                                    `}
                                  >
                                    <CheckCircle2 className={`w-4 h-4 ${inCart ? 'opacity-100' : 'opacity-0'}`} />
                                  </button>
                                  <div>
                                    <p className={`font-bold text-xs ${inCart ? 'text-blue-700' : 'text-slate-700'}`}>
                                      {product.name}
                                    </p>
                                    <p className="text-[10px] text-slate-400 mt-0.5">
                                       واحد: {product.unit === 'branch' ? 'شاخه' : 'تعداد'}
                                    </p>
                                  </div>
                                </div>

                                {inCart && (
                                  <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-xl shadow-sm border border-blue-100" onClick={e => e.stopPropagation()}>
                                    <button 
                                      onClick={() => updateQuantity(product.id, -1)}
                                      className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    >
                                      <Minus className="w-4 h-4" />
                                    </button>
                                    <input 
                                        type="number"
                                        className="w-10 text-center font-black text-sm text-slate-700 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        value={inCart.quantity}
                                        onChange={(e) => setManualQuantity(product.id, e.target.value)}
                                    />
                                    <button 
                                      onClick={() => updateQuantity(product.id, 1)}
                                      className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    >
                                      <Plus className="w-4 h-4" />
                                    </button>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                          {catProducts.length === 0 && (
                            <div className="col-span-full py-10 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 text-center">
                              <p className="text-slate-400 text-xs font-medium">محصولی در این فیلتر یافت نشد</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Selected List - Sidebar desktop */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl sticky top-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-600 p-2 rounded-xl">
                <ShoppingCart className="text-white w-5 h-5" />
              </div>
              <h3 className="font-black text-lg">سبد استعلام</h3>
              <span className="mr-auto bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-xs font-bold">
                {cart.length} کالا
              </span>
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto no-scrollbar mb-6">
              {cart.map((item) => {
                const product = PRODUCTS.find(p => p.id === item.productId);
                if (!product) return null;
                return (
                  <div key={item.productId} className="group flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all">
                    <div>
                      <p className="font-bold text-xs text-slate-700">{product.name}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{item.quantity} {product.unit === 'branch' ? 'شاخه' : 'عدد'}</p>
                    </div>
                    <button 
                      onClick={() => toggleProduct(product.id)}
                      className="p-1 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
              {cart.length === 0 && (
                <div className="py-12 text-center">
                  <Package className="w-10 h-10 mx-auto text-slate-200 mb-3" />
                  <p className="text-slate-400 text-xs font-medium">کالایی انتخاب نشده است</p>
                </div>
              )}
            </div>

            <button 
              disabled={cart.length === 0}
              onClick={() => setShowInvoice(true)}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-300 transition-all shadow-lg shadow-slate-100"
            >
              <FileText className="w-5 h-5" />
              <div className="flex flex-col items-center leading-tight">
                <span>مشاهده پیش‌فاکتور نهایی</span>
                <span className="text-[10px] font-medium opacity-60">استعلام قیمت کلی</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
