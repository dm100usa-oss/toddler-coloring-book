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
  /* Два указания браузеру, о которых просила проверка безопасности.
     Первое запрещает гадать о типе файла: если сервер сказал, что это
     картинка, браузер не станет пробовать выполнить ее как код.
     Второе запрещает показывать наш сайт внутри чужого окна: так
     чужой сайт не может подсунуть посетителю нашу страницу под своим
     видом. На внешний вид и на скорость не влияет ни то, ни другое. */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
