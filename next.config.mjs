/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Раздел "книга" убран: книга это и есть главная страница. Старые
     адреса раздела не должны отвечать "страницы нет" — их знают
     поисковики и, возможно, чьи-то закладки. Они переброшены
     на главную того же языка, постоянным перебросом: раздел убран
     навсегда, а не на время. */
  async redirects() {
    return [
      { source: "/en/coloring-book", destination: "/en", permanent: true },
      { source: "/es/libro-para-colorear", destination: "/es", permanent: true },
      { source: "/en/coloring-book/:path*", destination: "/en", permanent: true },
      { source: "/es/libro-para-colorear/:path*", destination: "/es", permanent: true },
    ];
  },
};

export default nextConfig;
