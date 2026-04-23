

function Select({ value, onChange }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="active">Активний</option>
      <option value="completed">Завершений</option>
      <option value="all">Всі</option>
    </select>
  );
}

export default Select;