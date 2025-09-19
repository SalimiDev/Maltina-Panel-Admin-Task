import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components";
import { ExternalLink } from "lucide-react";

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
  const tUM = await getTranslations("UserManagement");
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold capitalize">{t("mainPage")}</h1>
      <Link href="/user-management">
        <Button color="primary" variant="soft">
          <ExternalLink size={22} /> {tUM("title")}
        </Button>
      </Link>
    </div>
  );
}
