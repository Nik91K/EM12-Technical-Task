import './TransactionChart.css'
import {Chart as ChartJS, ArcElement, Tooltip, Legend, } from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend)
import { Pie } from 'react-chartjs-2'

const TransactionChart = ({income, expense}: {income: number, expense: number}) => {
    const data = {
      labels: ['Дохід', 'Витрата'],
        datasets: [
            {
            label: 'Expenses',
            data: [income, expense],
            backgroundColor: ['#4CAF50', '#F44336']
            },
        ],
    }
      
    const options = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: false,
        },
      },
    }

  return (
    <div className="transaction-chart">
      <h2>Transaction Chart</h2>
      <Pie data={data} options={options} />
    </div>
  )
}

export default TransactionChart
