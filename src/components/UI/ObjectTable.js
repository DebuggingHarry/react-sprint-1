function ObjectTable({
  data,
  attributes = [],
  keyField = null,
  className = "",
  emptyMessage = "No data.",
}) {
  const renderValue = (v) => (v === null || v === undefined ? "-" : String(v));

  if (Array.isArray(data)) {
    if (data.length === 0) return <div>{emptyMessage}</div>;
    const cols = attributes;
    return (
      <table className={className}>
        <thead>
          <tr>
            {cols.map((c) => (
              <th key={c.key}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => {
            const rk =
              keyField && item && item[keyField] != null ? item[keyField] : idx;
            return (
              <tr key={rk}>
                {cols.map((c) => (
                  <td key={c.key}>
                    {renderValue(item ? item[c.key] : undefined)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  if (typeof data === "object") {
    const rows =
      attributes.length > 0
        ? attributes
        : Object.keys(data).map((k) => ({ key: k, label: k }));
    return (
      <table className={className}>
        <tbody>
          {rows.map((r) => (
            <tr key={r.key}>
              <th style={{ textAlign: "left", paddingRight: "8px" }}>
                {r.label}
              </th>
              <td>{renderValue(data[r.key])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return <div>{emptyMessage}</div>;
}

export default ObjectTable;
