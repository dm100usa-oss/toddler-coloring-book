/* Счетчик посещаемости Google Analytics.

   Стоит в заголовке каждой страницы сайта: и в основной части на трех
   языках, и в отдельном крыле страниц для других стран. Номер один на
   весь сайт, у сайта в аналитике свой отдельный раздел, данные
   magicofdiscoveries.com с этими не смешиваются.

   Код вставлен обычным текстом прямо в заголовок, а не через
   отложенную загрузку: так его видит проверка Google, и счетчик
   срабатывает с первой секунды. */

export const GA_ID = "G-179GJ3S7BQ";

/* Счет действий посетителя. Один общий слушатель на всю страницу,
   поэтому ловит нужные нажатия везде: на главной, в статьях, в
   подборщике и на страницах для других стран, и новые кнопки
   подхватывает сам, ничего дописывать в них не нужно.

   go_to_amazon          ушел по ссылке в любой магазин Amazon
   free_sheet_download   скачал бесплатный лист (ссылка с пометкой
                         "скачать", кроме выдачи купленного файла)
   begin_checkout        нажал кнопку оплаты файла для печати

   Покупка считается отдельно, на странице после оплаты: только там
   известно, что деньги действительно получены. */
const ACTIONS = `document.addEventListener('click', function (e) {
  var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
  if (!a) return;
  var url;
  try { url = new URL(a.href, location.href); } catch (err) { return; }
  if (url.hostname.indexOf('amazon.') !== -1) {
    gtag('event', 'go_to_amazon', { link_url: url.href, link_domain: url.hostname, transport_type: 'beacon' });
  } else if (a.hasAttribute('download') && url.pathname.indexOf('/api/') !== 0) {
    gtag('event', 'free_sheet_download', { file_name: url.pathname, transport_type: 'beacon' });
  }
}, true);
document.addEventListener('submit', function (e) {
  var f = e.target;
  if (!f || !f.action || f.action.indexOf('/api/checkout') === -1) return;
  var book = f.elements.book ? f.elements.book.value : '';
  var format = f.elements.format ? f.elements.format.value : '';
  gtag('event', 'begin_checkout', { items: [{ item_id: book, item_variant: format }], transport_type: 'beacon' });
}, true);`;

export function GoogleTag() {
  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');
${ACTIONS}`,
        }}
      />
    </>
  );
}
