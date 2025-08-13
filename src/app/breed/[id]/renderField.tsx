const renderField = (key: string, value: unknown, labels: Record<string, string>) => {
  if (value === undefined || value === null) return null

  const label = labels?.[key] || key

  if (typeof value === 'object') {
    if (!value) return null
    return (
      <div key={key} className="mb-2">
        <strong>{label}:</strong>
        <ul className="ml-4 list-disc">
          {Object.entries(value).map(([subKey, subValue]) => (
            <li key={subKey}>
              <span className="capitalize">{subKey}:</span>{' '}
              {String(subValue) || 'N/A'}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <p key={key} className="mb-2">
      <strong>{label}:</strong> {value ? String(value) : 'N/A'}
    </p>
  )
}

export default renderField
