function Footer() {
  return (
    <footer
      style={{
        marginTop: "60px",
        padding: "30px 20px",
        textAlign: "center",
        borderTop: "1px solid #ddd",
        color: "#666",
      }}
    >
      <p>© {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
    </footer>
  );
}

export default Footer;