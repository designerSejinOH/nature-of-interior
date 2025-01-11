import React from 'react'
import classNames from 'classnames'
import type { HTMLAttributes } from 'react'
import { createElement } from 'react'
import logo from '@/svg/logo.svg'
import text from '@/svg/text.svg'
import check from '@/svg/check.svg'
import left from '@/svg/left.svg'
import textSize from '@/svg/textSize.svg'
import fontWeight from '@/svg/fontWeight.svg'
import fontStyle from '@/svg/fontStyle.svg'
import info from '@/svg/info.svg'
import arrowRight from '@/svg/arrowRight.svg'
import exit from '@/svg/exit.svg'

export const icons = {
  logo: logo,
  text: text,
  check: check,
  left: left,
  textSize: textSize,
  fontWeight: fontWeight,
  fontStyle: fontStyle,
  info: info,
  arrowRight: arrowRight,
  exit: exit,
}

interface IconProps {
  icon: string
  color?: string
  size?: number
  className?: string
  motion?: boolean
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export const Icon = ({ icon, color, size = 24, className, onClick, motion = true, ...rest }: IconProps) => {
  const baseIconClasses = ' flex items-center justify-center cursor-pointer '

  if (!icons[icon]) return null

  return (
    <div
      aria-label={icon}
      className={classNames(
        baseIconClasses,
        motion ? 'transition-all duration-200 ease-in-out focus:opacity-50 active:opacity-50 active:scale-90' : '',
      )}
      onClick={onClick}
      {...rest}
    >
      {createElement(icons[icon], {
        style: {
          width: size.toString(),
        },
        className: className,
      })}
    </div>
  )
}
