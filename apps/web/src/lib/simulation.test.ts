import { expect, describe, it } from 'vitest'
import { calculateSimulation } from './simulation'

describe('aMORA simulation', () => {
  it('must follow the exact monthly savings', () => {
    const result = calculateSimulation({
      title: 'My apt',
      propertyValue: 250000,
      downPaymentPercentage: 30,
      contractYears: 30,
      annualInterestRate: 10.5,
    })

    const expectedSavings = 37500 / (30 * 12) // = 104.17
    expect(result?.monthlySavingsAmount).toBeCloseTo(expectedSavings, 2)
  })

  it('must calculate all values as specified', () => {
    const result = calculateSimulation({
      title: 'Validação Completa',
      propertyValue: 500000,
      downPaymentPercentage: 20,
      contractYears: 25,
      annualInterestRate: 12,
    })

    expect(result?.downPaymentAmount).toBe(100000) // 500k * 20%
    expect(result?.financedAmount).toBe(400000) // 500k - 100k
    expect(result?.totalToSave).toBe(75000) // 500k * 15%
    expect(result?.monthlySavingsAmount).toBe(250) // 75k / (25*12)
  })
})
