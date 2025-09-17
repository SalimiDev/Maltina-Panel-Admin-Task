import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "UserManagement" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function UserManagementPage() {
  const t = await getTranslations("UserManagement");
  return (
    <div className="flex h-full flex-col gap-4 p-8">
      <section className="bg-surface-background h-26 w-full rounded-lg p-4">
        <h2 className="text-xl font-bold">{t("addNewUser")}</h2>
      </section>
      <section className="bg-surface-background w-full flex-1 rounded-lg p-4">
        {t("userList")}
      </section>
    </div>
  );
}
