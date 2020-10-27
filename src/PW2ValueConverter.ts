const checkInvalidInputs = (inputValue: number): boolean => {
  return (inputValue === -Infinity || inputValue === Infinity || inputValue === undefined)
}

const calculateNextPOW2Value = (inputValue: number): number => {
  return Math.pow( 2, Math.ceil( Math.log( inputValue ) / Math.log( 2 ) ) )
}

const calculatePreviousPOW2Value = (inputValue: number): number => {
  return Math.pow( 2, Math.floor( Math.log( inputValue ) / Math.log( 2 ) ) )
}

export const getPreviousPOW2Value = (inputValue: number): number =>
{
  if(checkInvalidInputs(inputValue)) return 0
  if (inputValue <= 2) return 2
  
  const previousPOW2 = calculatePreviousPOW2Value(inputValue)
  return (previousPOW2 === inputValue) ? getPreviousPOW2Value(inputValue - 1) : previousPOW2
}

export const getNextPOW2Value = (inputValue:number): number  =>
{
  if(checkInvalidInputs(inputValue)) return 0
  if (inputValue < 2) return 2
  
  const nextPOW2 = calculateNextPOW2Value(inputValue)
  return (nextPOW2 === inputValue) ? getNextPOW2Value(inputValue + 1) : nextPOW2
}

export const getNearestPOW2Value = (inputValue: number): number =>
{
  if (isPOW2Value(inputValue)) return inputValue

  const previousValue = getPreviousPOW2Value(inputValue)
  const nextValue = getNextPOW2Value(inputValue)

  const nextValueDiff = nextValue - inputValue
  const previousValueDiff = inputValue - previousValue
  
  return ( nextValueDiff <= previousValueDiff ) ? nextValue : previousValue
}

export const isPOW2Value = (inputValue: number): boolean => {
  if(checkInvalidInputs(inputValue)) return false

  const previousPOW2 = calculatePreviousPOW2Value(inputValue)
  const nextPOW2 = calculateNextPOW2Value(inputValue)

  return previousPOW2 === nextPOW2
}
