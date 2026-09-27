/* Счетчик посещаемости Google Analytics.

   Стоит в заголовке каждой страницы сайта: и в основной части на трех
   языках, и в отдельном крыле страниц для других стран. Номер один на
   весь сайт, у сайта в аналитике свой отдельный раздел, данные
   magicofdiscoveries.com с этими не смешиваются.

   Код вставлен обычным текстом прямо в заголовок, а не через
   отложенную загрузку: так его видит проверка Google, и счетчик
   срабатывает с первой секунды. */

export const GA_ID = "G-179GJ3S7BQ";

export function GoogleTag() {
  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`,
        }}
      />
    </>
  );
}
