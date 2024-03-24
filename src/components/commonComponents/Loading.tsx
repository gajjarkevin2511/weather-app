import { ILoadingComponentProps } from '@/types/types'
import React from 'react'

const Loading: React.FC<ILoadingComponentProps> = ({ text }) => {
  return <h1 className='loading'>{text}</h1>
}

export default Loading
