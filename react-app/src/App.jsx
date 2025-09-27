import { useState, useEffect } from 'react'

function App() {
  const [initialInvestment, setInitialInvestment] = useState(3000)
  const [annualReturn, setAnnualReturn] = useState(25)
  const [investmentPeriod, setInvestmentPeriod] = useState(20)
  const [yearlyData, setYearlyData] = useState([])
  const [totalAssets, setTotalAssets] = useState(0)

  const formatCurrency = (amount) => {
    if (amount >= 100000000) {
      return `${(amount / 100000000).toFixed(2)} 억원`
    } else if (amount >= 10000) {
      return `${(amount / 10000).toLocaleString()} 만원`
    } else {
      return `${amount.toLocaleString()} 원`
    }
  }

  const calculateCompoundInterest = () => {
    const data = []
    let currentAmount = initialInvestment * 10000 // 만원 단위를 원 단위로 변환
    
    for (let year = 1; year <= investmentPeriod; year++) {
      if (year === 1) {
        data.push({ year, amount: currentAmount })
      } else {
        currentAmount = currentAmount * (1 + annualReturn / 100)
        data.push({ year, amount: currentAmount })
      }
    }
    
    setYearlyData(data)
    setTotalAssets(data[data.length - 1]?.amount || 0)
  }

  useEffect(() => {
    calculateCompoundInterest()
  }, [initialInvestment, annualReturn, investmentPeriod])

  const adjustValue = (setValue, currentValue, increment) => {
    const newValue = currentValue + increment
    if (newValue >= 0) {
      setValue(newValue)
    }
  }

  const getDoubledYears = () => {
    const doubled = []
    let previousAmount = initialInvestment * 10000
    
    yearlyData.forEach((data) => {
      if (data.amount >= previousAmount * 2) {
        doubled.push(data.year)
        previousAmount = data.amount
      }
    })
    
    return doubled
  }

  const doubledYears = getDoubledYears()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-8 md:mb-12">
          💰 자동 복리 계산기
        </h1>

        {/* 입력 섹션 */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-xl mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            {/* 처음 투자금 */}
            <div className="text-center">
              <label className="block text-white text-sm font-medium mb-3">
                처음 투자금
              </label>
              <div className="flex items-center justify-center gap-2 mb-2">
                <button
                  onClick={() => adjustValue(setInitialInvestment, initialInvestment, -100)}
                  className="bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                >
                  −
                </button>
                <div className="bg-white/20 rounded-lg px-4 py-2 min-w-[100px]">
                  <span className="text-white font-bold text-xl">{initialInvestment.toLocaleString()}</span>
                </div>
                <button
                  onClick={() => adjustValue(setInitialInvestment, initialInvestment, 100)}
                  className="bg-green-500 hover:bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                >
                  +
                </button>
              </div>
              <span className="text-white/80 text-sm">만원</span>
            </div>

            {/* 연간 수익률 */}
            <div className="text-center">
              <label className="block text-white text-sm font-medium mb-3">
                연간 수익률
              </label>
              <div className="flex items-center justify-center gap-2 mb-2">
                <button
                  onClick={() => adjustValue(setAnnualReturn, annualReturn, -1)}
                  className="bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                >
                  −
                </button>
                <div className="bg-white/20 rounded-lg px-4 py-2 min-w-[80px]">
                  <span className="text-white font-bold text-xl">{annualReturn}</span>
                </div>
                <button
                  onClick={() => adjustValue(setAnnualReturn, annualReturn, 1)}
                  className="bg-green-500 hover:bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                >
                  +
                </button>
              </div>
              <span className="text-white/80 text-sm">%</span>
            </div>

            {/* 총 투자기간 */}
            <div className="text-center">
              <label className="block text-white text-sm font-medium mb-3">
                총 투자기간
              </label>
              <div className="flex items-center justify-center gap-2 mb-2">
                <button
                  onClick={() => adjustValue(setInvestmentPeriod, investmentPeriod, -1)}
                  className="bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                >
                  −
                </button>
                <div className="bg-white/20 rounded-lg px-4 py-2 min-w-[80px]">
                  <span className="text-white font-bold text-xl">{investmentPeriod}</span>
                </div>
                <button
                  onClick={() => adjustValue(setInvestmentPeriod, investmentPeriod, 1)}
                  className="bg-green-500 hover:bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                >
                  +
                </button>
              </div>
              <span className="text-white/80 text-sm">년</span>
            </div>
          </div>
        </div>

        {/* 결과 섹션 */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-xl mb-8">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-white mb-2">
              투자 기간 누적 총 자산
            </h2>
            <div className="text-3xl md:text-4xl font-bold text-yellow-300">
              {formatCurrency(totalAssets)}
            </div>
          </div>
        </div>

        {/* 연차별 복리 효과 */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-xl">
          <h3 className="text-xl font-semibold text-white mb-6 text-center">
            연차별 복리 효과의 과정
          </h3>
          
          <div className="grid gap-2 max-h-96 overflow-y-auto">
            <div className="grid grid-cols-2 gap-4 py-2 px-4 bg-white/10 rounded-lg mb-2">
              <div className="text-white font-semibold">연차</div>
              <div className="text-white font-semibold">금액</div>
            </div>
            
            {yearlyData.map((data) => {
              const isDoubled = doubledYears.includes(data.year)
              return (
                <div
                  key={data.year}
                  className={`grid grid-cols-2 gap-4 py-2 px-4 rounded-lg ${
                    isDoubled ? 'bg-red-500/20 border border-red-500/50' : 'bg-white/5'
                  }`}
                >
                  <div className={`${isDoubled ? 'text-red-300' : 'text-white'} font-medium`}>
                    {data.year} 년차
                  </div>
                  <div className={`${isDoubled ? 'text-red-300' : 'text-white'} font-bold`}>
                    {formatCurrency(data.amount)}
                  </div>
                </div>
              )
            })}
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-red-300 text-sm">
              * 빨간색 : 총 자산이 2배 이상
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App