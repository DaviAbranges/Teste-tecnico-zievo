import { atom } from 'jotai';
import { ReactNode } from 'react';

export type ModalType = 'alert' | 'success' | 'error' | 'form';
export const modalAtom = atom(<
  {
    open: boolean;
    type: ModalType;
    closeOnConfirm?: boolean;
    onConfirm: () => void;
    content: {
      title: string;
      message?: string;
      element?: ReactNode;
      colors?: string;
      icon?: ReactNode;
      confirmButtonText?: string | boolean;
      cancelButtonText?: string | boolean;
    };
    onClose?: () => void;
  }
>{
  open: false,
  type: 'alert',
  closeOnConfirm: true,
  colors: '',
  onClose: () => {},
  onConfirm: () => {},
  showIcon: true,
  content: {
    title: '',
    message: '',
  },
});
