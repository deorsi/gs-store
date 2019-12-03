const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://great-scott.herokuapp.com"
    : "http://localhost:3000";

export default baseUrl;
