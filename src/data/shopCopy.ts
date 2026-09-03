import type { UiLang } from "@/data/dictionaries";

/* ---------------------------------------------------------------------------
   Слова, которые покупатель видит после оплаты.

   Лежат отдельно от общего словаря сайта намеренно: один и тот же текст
   идет и на страницу благодарности, и в письмо со ссылкой. Держать его
   в одном месте надежнее, чем сводить два похожих набора.

   Текст здесь тот же, что в магазине каталога издательства. Человек
   может купить книгу и там, и тут, и письмо должно приходить одинаковое.
--------------------------------------------------------------------------- */

export type ShopCopy = {
  /** Заголовок страницы после оплаты. */
  title: string;
  /** Первая строка: что произошло и что делать. */
  lead: string;
  /** Надпись на кнопке скачивания. */
  download: string;
  /** Сколько ссылка живет. */
  expiry: string;
  /** Письмо тоже отправлено, проверьте папку со спамом. */
  emailed: string;
  /** Что делать, если файл не скачался. */
  help: string;
  /** Заголовок письма. */
  emailSubject: string;
  emailLeadKids: string;
  emailLeadGeneral: string;
  emailCloseKids: string;
  emailCloseGeneral: string;
  /** Строка "Формат:" перед размером листа. */
  emailFormat: string;
  /** Что делать, если файл не скачался. Для письма, с ответом на него. */
  emailHelp: string;
  /** Подпись под письмом. */
  emailSign: string;
  /** Если оплата не прошла или ссылку открыли без заказа. */
  notFound: string;
  backHome: string;
  /* Оплату не удалось даже начать: Stripe не ответил или отказал.
     Покупателю про причину знать нечего, деньги не списаны. Причину
     пишем в журнал сайта, ее видно в настройках Vercel. */
  failTitle: string;
  failText: string;
  failBack: string;
};

export const shopCopy: Record<UiLang, ShopCopy> = {
  en: {
    title: "Thank you. Your book is ready.",
    lead: "Payment went through. The file is yours to keep, print at home as many times as you like.",
    download: "Download the PDF",
    expiry:
      "The link stays active for 30 days and works up to 5 times. We suggest saving the file to your computer or phone right away, so it is always with you.",
    emailed:
      "We have also sent the link to your email. If it is not there in a few minutes, check the spam folder.",
    help: "Trouble downloading? Write to magicofdiscoveries@gmail.com and we will help.",
    emailSubject: "Your printable book from Magic of Discoveries",
    emailLeadKids:
      "Thank you for your purchase! We hope this book brings your little one many happy, creative moments.",
    emailLeadGeneral:
      "Thank you for your purchase! We hope this book brings you many happy, creative moments.",
    emailCloseKids: "Happy coloring to you and your little one!",
    emailCloseGeneral: "Happy coloring!",
    emailFormat: "Format",
    emailHelp:
      "If the file will not download, or you have any question, just reply to this email or write to magicofdiscoveries@gmail.com. We will help.",
    emailSign:
      "You bought this book on toddlercoloringbook.com. The site is run by Magic of Discoveries LLC, Miami, Florida.",
    notFound:
      "We could not find this order. If your payment went through and you have no file, write to magicofdiscoveries@gmail.com and we will send it right away.",
    backHome: "Back to the book",
    failTitle: "The payment page did not open.",
    failText:
      "You have not been charged. This is a problem on our side, not yours. Please try again in a minute. If it happens again, write to magicofdiscoveries@gmail.com and we will send you the book directly.",
    failBack: "Back to the book",
  },
  es: {
    title: "Gracias. Su libro está listo.",
    lead: "El pago se realizó. El archivo es suyo, imprímalo en casa todas las veces que quiera.",
    download: "Descargar el PDF",
    expiry:
      "El enlace funciona durante 30 días y hasta 5 descargas. Le recomendamos guardar el archivo en su computadora o teléfono ahora mismo, así lo tendrá siempre a mano.",
    emailed:
      "También enviamos el enlace a su correo. Si no llega en unos minutos, revise la carpeta de spam.",
    help: "¿Problemas con la descarga? Escriba a magicofdiscoveries@gmail.com y le ayudamos.",
    emailSubject: "Su libro para imprimir de Magic of Discoveries",
    emailLeadKids:
      "¡Gracias por su compra! Esperamos que este libro le regale a su pequeño muchos momentos felices y creativos.",
    emailLeadGeneral:
      "¡Gracias por su compra! Esperamos que este libro le regale muchos momentos felices y creativos.",
    emailCloseKids: "¡Que disfruten mucho coloreando!",
    emailCloseGeneral: "¡Que disfrute coloreando!",
    emailFormat: "Formato",
    emailHelp:
      "Si el archivo no se descarga o tiene alguna duda, responda a este correo o escriba a magicofdiscoveries@gmail.com. Le ayudaremos.",
    emailSign:
      "Usted compró este libro en toddlercoloringbook.com. El sitio pertenece a Magic of Discoveries LLC, Miami, Florida.",
    notFound:
      "No encontramos este pedido. Si el pago se realizó y no tiene el archivo, escriba a magicofdiscoveries@gmail.com y se lo enviamos enseguida.",
    backHome: "Volver al libro",
    failTitle: "La página de pago no se abrió.",
    failText:
      "No se le cobró nada. Es un fallo nuestro, no suyo. Inténtelo de nuevo en un minuto. Si vuelve a ocurrir, escriba a magicofdiscoveries@gmail.com y le enviamos el libro directamente.",
    failBack: "Volver al libro",
  },
  ru: {
    title: "Спасибо. Книга готова.",
    lead: "Оплата прошла. Файл ваш, печатайте дома сколько угодно раз.",
    download: "Скачать PDF",
    expiry:
      "Ссылка действует 30 дней, скачать по ней можно до пяти раз. Советуем сразу сохранить файл на компьютер или телефон, чтобы он всегда был под рукой.",
    emailed:
      "Ссылку мы отправили и на почту. Если письма нет через несколько минут, посмотрите папку со спамом.",
    help: "Файл не скачивается? Напишите на magicofdiscoveries@gmail.com, поможем.",
    emailSubject: "Ваша книга для печати от Magic of Discoveries",
    emailLeadKids:
      "Спасибо за покупку! Надеемся, эта книга подарит вашему малышу много приятных и творческих минут.",
    emailLeadGeneral:
      "Спасибо за покупку! Надеемся, эта книга подарит вам много приятных и творческих минут.",
    emailCloseKids: "Желаем вам и вашему малышу приятного раскрашивания!",
    emailCloseGeneral: "Желаем вам приятного раскрашивания!",
    emailFormat: "Формат",
    emailHelp:
      "Если файл не скачивается или возникнут вопросы, просто ответьте на это письмо или напишите нам на magicofdiscoveries@gmail.com, мы обязательно поможем.",
    emailSign:
      "Вы купили эту книгу на toddlercoloringbook.com. Сайт ведет издательство Magic of Discoveries LLC, Майами, Флорида.",
    notFound:
      "Не нашли этот заказ. Если оплата прошла, а файла нет, напишите на magicofdiscoveries@gmail.com, вышлем сразу.",
    backHome: "Вернуться к книге",
    failTitle: "Страница оплаты не открылась.",
    failText:
      "Деньги не списаны. Это сбой на нашей стороне, не у вас. Попробуйте еще раз через минуту. Если повторится, напишите на magicofdiscoveries@gmail.com, и мы вышлем книгу сразу.",
    failBack: "Вернуться к книге",
  },
};
