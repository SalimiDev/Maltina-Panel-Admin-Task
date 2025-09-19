import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { AppLocale, locales } from "@/lib/i18n/config";
import { routing } from "@/lib/i18n/routing";
import { notFound } from "next/navigation";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

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
      <body suppressHydrationWarning className="flex min-h-screen flex-col">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
