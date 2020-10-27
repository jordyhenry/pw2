import {
  getNearestPOW2Value,
  getPreviousPOW2Value,
  getNextPOW2Value,
  isPOW2Value
} from '../PW2ValueConverter'

describe('Testing getNearestPOW2 function', () => {
  test('with non-pow2 values', () => {
    expect(getNearestPOW2Value(500)).toBe(512)
    expect(getNearestPOW2Value(600)).toBe(512)
    expect(getNearestPOW2Value(1000)).toBe(1024)
    expect(getNearestPOW2Value(1200)).toBe(1024)
    expect(getNearestPOW2Value(1937)).toBe(2048)
  })
  
  test('with pow2 values', () => {
    expect(getNearestPOW2Value(256)).toBe(256)
    expect(getNearestPOW2Value(512)).toBe(512)
    expect(getNearestPOW2Value(1024)).toBe(1024)
  })
  
  test('with invalid inputs values', () => {
    expect(getNearestPOW2Value(-Infinity)).toBe(0)
    expect(getNearestPOW2Value(Infinity)).toBe(0)
    
    expect(getNearestPOW2Value(-100)).toBe(2)
    expect(getNearestPOW2Value(0)).toBe(0)
  })
})

describe('Testing getNexPOW2 function', () => {
  test('with non-pow2 values', () => {
    expect(getNextPOW2Value(500)).toBe(512)
    expect(getNextPOW2Value(600)).toBe(1024)
    expect(getNextPOW2Value(1000)).toBe(1024)
    expect(getNextPOW2Value(1200)).toBe(2048)
    expect(getNextPOW2Value(1937)).toBe(2048)
  })
  
  test('with pow2 values', () => {
    expect(getNextPOW2Value(256)).toBe(512)
    expect(getNextPOW2Value(512)).toBe(1024)
    expect(getNextPOW2Value(1024)).toBe(2048)
  })
  
  test('with invalid inputs values', () => {
    expect(getNextPOW2Value(-Infinity)).toBe(0)
    expect(getNextPOW2Value(Infinity)).toBe(0)
    
    expect(getNextPOW2Value(-100)).toBe(2)
    expect(getNextPOW2Value(0)).toBe(2)
  })
})

describe('Testing getPreviousPOW2 function', () => {
  test('with non-pow2 values', () => {
    expect(getPreviousPOW2Value(500)).toBe(256)
    expect(getPreviousPOW2Value(600)).toBe(512)
    expect(getPreviousPOW2Value(1000)).toBe(512)
    expect(getPreviousPOW2Value(1200)).toBe(1024)
    expect(getPreviousPOW2Value(1937)).toBe(1024)
  })
  
  test('with pow2 values', () => {
    expect(getPreviousPOW2Value(256)).toBe(128)
    expect(getPreviousPOW2Value(512)).toBe(256)
    expect(getPreviousPOW2Value(1024)).toBe(512)
  })
  
  test('with invalid inputs values', () => {
    expect(getPreviousPOW2Value(-Infinity)).toBe(0)
    expect(getPreviousPOW2Value(Infinity)).toBe(0)
    expect(getPreviousPOW2Value(-100)).toBe(2)
    expect(getPreviousPOW2Value(0)).toBe(2)
  })
})

describe('Testing isPOW2 function', () => {
  test('with non-pow2 values', () => {
    expect(isPOW2Value(500)).toBe(false)
    expect(isPOW2Value(600)).toBe(false)
    expect(isPOW2Value(1000)).toBe(false)
    expect(isPOW2Value(1200)).toBe(false)
    expect(isPOW2Value(1937)).toBe(false)
  })
  
  test('with pow2 values', () => {
    expect(isPOW2Value(256)).toBe(true)
    expect(isPOW2Value(512)).toBe(true)
    expect(isPOW2Value(1024)).toBe(true)
  })
  
  test('with invalid inputs values', () => {
    expect(isPOW2Value(-Infinity)).toBe(false)
    expect(isPOW2Value(Infinity)).toBe(false)
    
    expect(isPOW2Value(-100)).toBe(false)
    expect(isPOW2Value(-256)).toBe(false)
    expect(isPOW2Value(0)).toBe(true)
  })
})
