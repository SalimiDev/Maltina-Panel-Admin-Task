import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Home" });

  return {
    title: t("title"),
  };
}

export default async function Home() {
  const t = await getTranslations("Home");
  return (
    <div className="flex h-screen flex-col items-center justify-center">main page</div>
  );
}
