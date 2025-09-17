import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { AppLocale, locales } from "../../lib/i18n/config";
import { notFound } from "next/navigation";
import { routing } from "../../lib/i18n/routing";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: Omit<Props, "children">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "Home" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!locales.includes(locale as AppLocale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === "fa" ? "rtl" : "ltr"}
      className="dark"
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <header className="p-8 bg-surface-background mx-auto">header</header>
          <main className="">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
