// Client-safe header configuration
// This file contains only static configuration that can be imported by client components

import {
  Wrench,
  Tag,
  ClipboardList,
  Pencil,
  LucideIcon,
} from 'lucide-react';

// Department groups for the "All Departments" mega menu
// Groups categories into logical sections with icons
export interface DepartmentGroup {
  key: string;
  label: string;
  icon: LucideIcon;
  categoryNames: string[];
}

export const DEPARTMENT_GROUPS: DepartmentGroup[] = [
  {
    key: 'workplaceSafety',
    label: 'Workplace Safety',
    icon: Wrench,
    categoryNames: ['Floor Marking & Graphics', 'Barriers & Access Control', 'Mirrors & Visibility'],
  },
  {
    key: 'labelsId',
    label: 'Labels & Identification',
    icon: Tag,
    categoryNames: ['Labels & Stickers', 'Safety Tags', 'Symbols & Identification'],
  },
  {
    key: 'displaysEquipment',
    label: 'Displays & Equipment',
    icon: ClipboardList,
    categoryNames: ['Notice Boards & Displays', 'Safety Equipment & Kits', 'Sign Accessories'],
  },
  {
    key: 'custom',
    label: 'Custom',
    icon: Pencil,
    categoryNames: ['Custom Signs & Messages'],
  },
];
