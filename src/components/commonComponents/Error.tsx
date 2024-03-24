import { IErrorComponentProps } from '@/types/types'
import React from 'react'

const Error: React.FC<IErrorComponentProps> = ({ text }) => {
  return <span className='error'>{text}</span>
}

export default Error
