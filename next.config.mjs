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
      /* Служебный адрес на vercel.app открывает то же самое, что настоящий
         домен. Для поисковика это два сайта с одинаковым содержимым, и он
         начинает выбирать между ними, а сила делится надвое. Поэтому все,
         что открыто не на настоящем домене, помечаем "не заносить в поиск".

         Раньше это делал middleware, и ради одной пометки он запускался
         на каждой странице сайта. Здесь та же пометка ставится настройкой:
         Vercel добавляет ее сам, ничего не запуская. Человеку это ничего
         не меняет, по служебному адресу сайт открывается как прежде. */
      {
        source: "/:path*",
        has: [{ type: "host", value: "toddler-coloring-book.vercel.app" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
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
