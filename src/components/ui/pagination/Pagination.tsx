"use client";

import { Button } from "@/components";
import { useTranslations } from "next-intl";

type Props = {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  totalItems: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalItems,
  onPageChange,
}: Props) {
  const t = useTranslations("Pagination");
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-start">
      <div>
        <p className="text-subtle-foreground text-md">
          {t("showingEntries", { startIndex: startIndex + 1, endIndex, totalItems })}
        </p>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          variant="soft"
          size="small"
        >
          {t("previous")}
        </Button>
        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageToShow =
              totalPages <= 5
                ? i + 1
                : currentPage <= 3
                  ? i + 1
                  : currentPage >= totalPages - 2
                    ? totalPages - 4 + i
                    : currentPage - 2 + i;

            return (
              <Button
                key={pageToShow}
                onClick={() => onPageChange(pageToShow)}
                variant={currentPage === pageToShow ? "solid" : "soft"}
                size="small"
              >
                {pageToShow}
              </Button>
            );
          })}
        </div>
        <Button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          variant="soft"
          size="small"
        >
          {t("next")}
        </Button>
      </div>
    </div>
  );
}
