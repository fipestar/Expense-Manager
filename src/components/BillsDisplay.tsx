type BillsDisplayProps = {
    value: number
    type?: 'expense' | 'income'
}

export default function BillsDisplay({ value, type = 'expense' }: BillsDisplayProps) {
  const formatValue = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(Math.abs(amount))
  }

  return (
    <p className={`text-3xl font-black ${
      type === 'expense' ? 'text-red-600' : 'text-green-600'
    }`}>
      {value < 0 && '-'}{formatValue(value)}
    </p>
  )
}
