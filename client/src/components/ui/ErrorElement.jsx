const styles = {
  backgroundColor: "#d12941",
  color: "#eaeaec",
  borderRadius: "6px",
  padding: "6px 12px",
  fontSize: "0.875rem",
  marginTop: "0px",
  marginBottom: "12px",
  lineHeight: "1.4",
};

export default function ErrorElement({ children }) {
  if (!children) return null; // no empty box
  return <p style={styles}>{children}</p>;
}
