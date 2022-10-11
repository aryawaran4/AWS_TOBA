const PROXY_CONFIG = [
  {
    context: ["/oauth", "/api"],
    target: "http://202.90.199.132",
    secure: true,
    changeOrigin: true,
  },
];

module.exports = PROXY_CONFIG;
