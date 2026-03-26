'use client'

import { MouseEventHandler, useState } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: unknown[]) { return twMerge(clsx(inputs)) }

export interface TaskItem {
  id: number
  title: string
  subTitle: string
  img: string
  tag?: string
}

const COLLAPSED_OFFSETS = [
  'top-6',
  'top-[calc(1.5rem+0.75rem)]',
  'top-[calc(1.5rem+1.5rem)]',
  'top-[calc(1.5rem+3rem)]',
]

const EXPANDED_OFFSETS = [
  'top-6',
  'top-[calc(1.5rem+112px+1rem)]',
  'top-[calc(1.5rem+224px+2rem)]',
  'top-[calc(1.5rem+336px+3rem)]',
]

interface StackedArticleCardsProps {
  items: TaskItem[]
  className?: string
  onItemClick?: (item: TaskItem) => void
}

export default function StackedArticleCards({ items, className, onItemClick }: StackedArticleCardsProps) {
  const [isActive, setIsActive] = useState(false)

  const handleCollapse: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    setIsActive(false)
  }

  return (
    <div
      className={cn('relative w-full', isActive ? 'min-h-[520px]' : 'min-h-[160px]', className)}
      onClick={() => !isActive && setIsActive(true)}
    >
      {items.slice(0, 4).map((item, index) => (
        <div
          key={item.id}
          className={cn(
            'absolute left-0 right-0 flex h-28 cursor-pointer items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur-xl transition-all duration-700 ease-[cubic-bezier(0.075,0.82,0.165,1)] hover:bg-white/10',
            isActive ? EXPANDED_OFFSETS[index] : COLLAPSED_OFFSETS[index]
          )}
          onClick={(e) => { if (isActive) { e.stopPropagation(); onItemClick?.(item); } }}
        >
          <div className='size-16 shrink-0 overflow-hidden rounded-xl ring-1 ring-white/10'>
            <img
              src={item.img}
              alt={item.title}
              className='h-full w-full object-cover transition-transform duration-500 hover:scale-110'
            />
          </div>
          <div className='min-w-0 flex-1'>
            {item.tag && (
              <span className='text-[10px] text-white/30 uppercase tracking-widest'>{item.tag}</span>
            )}
            <p className='truncate text-sm font-semibold text-white'>{item.title}</p>
            <p className='line-clamp-2 text-xs text-white/40 mt-0.5 leading-relaxed'>{item.subTitle}</p>
          </div>
        </div>
      ))}

      <button
        className={cn(
          'absolute left-0 right-0 top-[calc(1.5rem+448px+4rem)] flex items-center justify-center transition-all duration-300',
          isActive ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={handleCollapse}
      >
        <span className='text-xs text-white/30 border border-white/10 rounded-full px-4 py-1.5 hover:text-white/60 transition-colors'>
          Recolher
        </span>
      </button>
    </div>
  )
}
