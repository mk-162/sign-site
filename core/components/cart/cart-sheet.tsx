'use client';

import { Minus, Plus, ShoppingBag, ShoppingCart, Trash2, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useOptimistic, startTransition } from 'react';

import { Button } from '~/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '~/components/ui/sheet';
import { Separator } from '~/components/ui/separator';

export interface CartSheetItem {
  id: string;
  name: string;
  image?: { src: string; alt: string };
  quantity: number;
  price: string;
  priceValue: number;
  subtitle?: string;
  href?: string;
}

interface CartSheetProps {
  items: CartSheetItem[];
  itemCount: number;
  subtotal: string;
  checkoutUrl?: string;
  currencyCode?: string;
  updateQuantityAction?: (id: string, quantity: number) => Promise<void>;
  removeItemAction?: (id: string) => Promise<void>;
  children?: React.ReactNode;
}

export function CartSheet({
  items,
  itemCount,
  subtotal,
  checkoutUrl = '/checkout',
  updateQuantityAction,
  removeItemAction,
  children,
}: CartSheetProps) {
  const [open, setOpen] = useState(false);
  const [optimisticItems, setOptimisticItems] = useOptimistic<CartSheetItem[], { type: 'update' | 'remove'; id: string; quantity?: number }>(
    items,
    (state, action) => {
      if (action.type === 'remove') {
        return state.filter((item) => item.id !== action.id);
      }
      if (action.type === 'update' && action.quantity !== undefined) {
        return state.map((item) =>
          item.id === action.id ? { ...item, quantity: action.quantity! } : item
        );
      }
      return state;
    }
  );

  const optimisticCount = optimisticItems.reduce((sum, item) => sum + item.quantity, 0);
  const optimisticSubtotal = optimisticItems.reduce((sum, item) => sum + item.priceValue * item.quantity, 0);

  const handleUpdateQuantity = async (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    startTransition(() => {
      setOptimisticItems({ type: 'update', id, quantity: newQuantity });
    });
    if (updateQuantityAction) {
      await updateQuantityAction(id, newQuantity);
    }
  };

  const handleRemoveItem = async (id: string) => {
    startTransition(() => {
      setOptimisticItems({ type: 'remove', id });
    });
    if (removeItemAction) {
      await removeItemAction(id);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {children || (
          <button className="relative p-2 hover:bg-slate-700/50 rounded-full transition-colors">
            <ShoppingCart className="h-6 w-6 text-white" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-black h-5 w-5 flex items-center justify-center rounded-full border-2 border-[#1e293b]">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </button>
        )}
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex w-full flex-col sm:max-w-md bg-white border-l border-slate-200"
      >
        <SheetHeader className="border-b border-slate-200 pb-4">
          <SheetTitle className="flex items-center gap-2 text-xl font-black text-slate-900">
            <ShoppingCart className="h-5 w-5 text-orange-500" />
            Your Basket
            <span className="text-sm font-normal text-slate-500">
              ({optimisticCount} {optimisticCount === 1 ? 'item' : 'items'})
            </span>
          </SheetTitle>
        </SheetHeader>

        {optimisticItems.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <div className="rounded-full bg-slate-100 p-6">
              <ShoppingBag className="h-12 w-12 text-slate-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Your basket is empty</h3>
              <p className="text-sm text-slate-500">
                Looks like you haven&apos;t added anything yet.
              </p>
            </div>
            <SheetClose asChild>
              <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white">
                <Link href="/">Start Shopping</Link>
              </Button>
            </SheetClose>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4">
              <div className="space-y-4">
                {optimisticItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 rounded-lg border border-slate-200 bg-slate-50 p-3"
                  >
                    {/* Image */}
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border bg-white">
                      {item.image ? (
                        <Image
                          src={item.image.src}
                          alt={item.image.alt}
                          fill
                          className="object-contain p-1"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <ShoppingBag className="h-8 w-8 text-slate-300" />
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <Link
                          href={item.href || '#'}
                          className="font-medium text-slate-900 hover:text-orange-600 line-clamp-2 text-sm"
                          onClick={() => setOpen(false)}
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-slate-400 hover:text-red-500 transition-colors p-1 -mr-1 -mt-1"
                          aria-label="Remove item"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>

                      {item.subtitle && (
                        <p className="text-xs text-slate-500 mt-0.5">{item.subtitle}</p>
                      )}

                      <div className="mt-auto flex items-center justify-between pt-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="h-7 w-7 rounded border border-slate-300 bg-white flex items-center justify-center hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            className="h-7 w-7 rounded border border-slate-300 bg-white flex items-center justify-center hover:bg-slate-50 transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="font-bold text-slate-900">{item.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 pt-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Subtotal</span>
                <span className="text-xl font-black text-slate-900">{subtotal}</span>
              </div>
              <p className="text-xs text-slate-500 text-center">
                Shipping & taxes calculated at checkout
              </p>
              <div className="grid gap-2">
                <Button
                  asChild
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold h-12"
                >
                  <Link href={checkoutUrl} onClick={() => setOpen(false)}>
                    Checkout
                  </Link>
                </Button>
                <SheetClose asChild>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-slate-300 hover:bg-slate-50"
                  >
                    <Link href="/cart" onClick={() => setOpen(false)}>
                      View Full Basket
                    </Link>
                  </Button>
                </SheetClose>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
