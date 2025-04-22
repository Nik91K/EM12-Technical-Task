import './TransactionChart.css'
import { Pie } from 'react-chartjs-2'

const data = {
    labels: ['+', '-'],
    datasets: [
      {
        label: 'Expenses',
        data: [300, 150],
        backgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  }
  

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
    },
  },
}

const TransactionChart = () => {

    return (
        <div className="transaction-chart">
            <h2>Transaction Chart</h2>
            <Pie data={data} options={options} />
        </div>
    )
}

export default TransactionChart
