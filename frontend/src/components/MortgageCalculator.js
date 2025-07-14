import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalculator, FaChartLine, FaDownload, FaPrint, FaInfoCircle } from 'react-icons/fa';

const MortgageCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [downPayment, setDownPayment] = useState(1000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTerm, setLoanTerm] = useState(20);
  const [propertyValue, setPropertyValue] = useState(6000000);
  const [monthlyIncome, setMonthlyIncome] = useState(150000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(50000);
  const [showAmortization, setShowAmortization] = useState(false);
  const [showAffordability, setShowAffordability] = useState(false);

  const calculateMonthlyPayment = () => {
    const principal = loanAmount - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    if (monthlyRate === 0) return principal / numberOfPayments;
    
    const monthlyPayment = principal * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    return monthlyPayment;
  };

  const calculateTotalPayment = () => {
    const monthlyPayment = calculateMonthlyPayment();
    return monthlyPayment * loanTerm * 12;
  };

  const calculateTotalInterest = () => {
    return calculateTotalPayment() - (loanAmount - downPayment);
  };

  const calculateAffordability = () => {
    const availableIncome = monthlyIncome - monthlyExpenses;
    const maxMonthlyPayment = availableIncome * 0.4; // 40% rule
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    if (monthlyRate === 0) return maxMonthlyPayment * numberOfPayments;
    
    const maxLoanAmount = maxMonthlyPayment * 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1) / 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments));
    
    return maxLoanAmount;
  };

  const generateAmortizationSchedule = () => {
    const principal = loanAmount - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const monthlyPayment = calculateMonthlyPayment();
    
    let balance = principal;
    const schedule = [];
    
    for (let month = 1; month <= Math.min(numberOfPayments, 60); month++) { // Show first 5 years
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;
      
      schedule.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance)
      });
    }
    
    return schedule;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const monthlyPayment = calculateMonthlyPayment();
  const totalPayment = calculateTotalPayment();
  const totalInterest = calculateTotalInterest();
  const maxAffordableLoan = calculateAffordability();
  const amortizationSchedule = generateAmortizationSchedule();

  const downPaymentPercentage = (downPayment / propertyValue) * 100;
  const loanToValueRatio = ((loanAmount - downPayment) / propertyValue) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <FaCalculator className="w-6 h-6 mr-3 text-amber-500" />
          Mortgage Calculator
        </h2>
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.print()}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <FaPrint className="w-4 h-4 text-gray-600" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <FaDownload className="w-4 h-4 text-gray-600" />
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property Value
            </label>
            <div className="relative">
              <input
                type="range"
                min="1000000"
                max="50000000"
                step="100000"
                value={propertyValue}
                onChange={(e) => setPropertyValue(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>₹10L</span>
                <span>₹5Cr</span>
              </div>
            </div>
            <div className="mt-2 text-lg font-semibold text-gray-900">
              {formatCurrency(propertyValue)}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Down Payment
            </label>
            <div className="relative">
              <input
                type="range"
                min="0"
                max={propertyValue}
                step="100000"
                value={downPayment}
                onChange={(e) => setDownPayment(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>₹0</span>
                <span>{formatCurrency(propertyValue)}</span>
              </div>
            </div>
            <div className="mt-2 text-lg font-semibold text-gray-900">
              {formatCurrency(downPayment)} ({downPaymentPercentage.toFixed(1)}%)
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interest Rate (% per year)
            </label>
            <div className="relative">
              <input
                type="range"
                min="5"
                max="15"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>5%</span>
                <span>15%</span>
              </div>
            </div>
            <div className="mt-2 text-lg font-semibold text-gray-900">
              {interestRate}%
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Term (years)
            </label>
            <div className="relative">
              <input
                type="range"
                min="5"
                max="30"
                step="1"
                value={loanTerm}
                onChange={(e) => setLoanTerm(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>5 years</span>
                <span>30 years</span>
              </div>
            </div>
            <div className="mt-2 text-lg font-semibold text-gray-900">
              {loanTerm} years
            </div>
          </div>

          {/* Affordability Calculator */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FaInfoCircle className="w-5 h-5 mr-2 text-amber-500" />
              Affordability Calculator
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Income
                </label>
                <input
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="150000"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Expenses
                </label>
                <input
                  type="number"
                  value={monthlyExpenses}
                  onChange={(e) => setMonthlyExpenses(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="50000"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-amber-500 to-amber-600 text-white p-6 rounded-xl"
            >
              <h3 className="text-sm font-medium opacity-90">Monthly Payment</h3>
              <p className="text-2xl font-bold mt-1">{formatCurrency(monthlyPayment)}</p>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl"
            >
              <h3 className="text-sm font-medium opacity-90">Total Interest</h3>
              <p className="text-2xl font-bold mt-1">{formatCurrency(totalInterest)}</p>
            </motion.div>
          </div>

          {/* Detailed Breakdown */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Breakdown</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Loan Amount:</span>
                <span className="font-medium">{formatCurrency(loanAmount - downPayment)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Monthly Payment:</span>
                <span className="font-medium">{formatCurrency(monthlyPayment)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Payment:</span>
                <span className="font-medium">{formatCurrency(totalPayment)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Loan-to-Value Ratio:</span>
                <span className="font-medium">{loanToValueRatio.toFixed(1)}%</span>
              </div>
            </div>
          </div>

          {/* Affordability Result */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-2">Affordability Analysis</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-green-700">Max Affordable Loan:</span>
                <span className="font-medium text-green-900">{formatCurrency(maxAffordableLoan)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700">Max Property Value:</span>
                <span className="font-medium text-green-900">{formatCurrency(maxAffordableLoan + downPayment)}</span>
              </div>
              {monthlyPayment > (monthlyIncome - monthlyExpenses) * 0.4 && (
                <div className="text-amber-600 text-sm mt-2">
                  ⚠️ Monthly payment exceeds recommended 40% of available income
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAmortization(!showAmortization)}
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
            >
              <FaChartLine className="w-4 h-4 mr-2" />
              {showAmortization ? 'Hide' : 'Show'} Amortization
            </motion.button>
          </div>
        </div>
      </div>

      {/* Amortization Schedule */}
      <AnimatePresence>
        {showAmortization && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-8 border-t pt-8"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">Amortization Schedule (First 5 Years)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Month</th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-700">Payment</th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-700">Principal</th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-700">Interest</th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-700">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {amortizationSchedule.map((row, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-900">{row.month}</td>
                      <td className="px-4 py-3 text-right font-medium">{formatCurrency(row.payment)}</td>
                      <td className="px-4 py-3 text-right text-green-600">{formatCurrency(row.principal)}</td>
                      <td className="px-4 py-3 text-right text-red-600">{formatCurrency(row.interest)}</td>
                      <td className="px-4 py-3 text-right text-gray-600">{formatCurrency(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #f59e0b;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #f59e0b;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default MortgageCalculator; 