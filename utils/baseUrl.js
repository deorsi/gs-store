const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://great-scott.now.sh"
    : "http://localhost:3000";

export default baseUrl;
