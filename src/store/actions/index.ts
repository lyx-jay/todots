import * as actionTypes from '../constant';

export const toggleAction = (index: number) => ({
  type: actionTypes.TOGGLE_TODO,
  index
})

export const addAction = (content: string) => ({
  type: actionTypes.ADD_TODO,
  content
})
export const completeAction = () => ({
  type: actionTypes.COMPLETEALL
})