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

  const pages: (number | string)[] = [];

  pages.push(1);

  if (currentPage > 2 && currentPage < totalPages - 1) {
    pages.push("...");
  }

  if (currentPage !== 1 && currentPage !== totalPages) {
    pages.push(currentPage);
  }

  if (currentPage > 2 && currentPage < totalPages - 1) {
    pages.push("...");
  }

  if (totalPages > 1) {
    pages.push(totalPages);
  }

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
          {pages.map((p, idx) =>
            p === "..." ? (
              <span key={`ellipsis-${idx}`} className="px-2">
                ...
              </span>
            ) : (
              <Button
                key={p}
                onClick={() => onPageChange(p as number)}
                variant={currentPage === p ? "solid" : "soft"}
                size="small"
              >
                {p}
              </Button>
            ),
          )}
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
