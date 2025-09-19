"use client";

import { User } from "@/types/user-interface";
import { Avatar, Dialog } from "@/components";
import { Building2, Mail, MapPin, Phone, Contact } from "lucide-react";
import { useTranslations } from "next-intl";

type Props = {
  selectedUser: User | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function UserDetailsModal({ selectedUser, isOpen, onClose }: Props) {
  const t = useTranslations("UserManagement.modal");
  if (!selectedUser) return null;

  const fullAddress = [
    selectedUser.address?.street,
    selectedUser.address?.suite,
    selectedUser.address?.city,
    selectedUser.address?.zipcode,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <Dialog isOpen={isOpen} onClose={onClose} size="md" title={t("userDetails")}>
      <div className="space-y-6">
        {/* User header with avatar */}
        <div className="border-border-default flex flex-col items-center border-b pb-4 text-center">
          <Avatar
            size="large"
            color="accent-1"
            fallback={selectedUser.name.charAt(0)}
            className="mb-3 h-20 w-20 text-2xl"
          />
          <h2 className="text-2xl font-bold">{selectedUser.name}</h2>
          {selectedUser.company?.name && (
            <span className="text-subtle-foreground text-sm">
              {selectedUser.company.name}
            </span>
          )}
        </div>

        {/* Contact Information Card */}
        <div className="bg-surface-background border-border-default rounded-lg border p-4 shadow-sm">
          <h3 className="mb-3 flex items-center gap-2 font-semibold">
            <Contact size={20} />
            {t("contactInformation")}
          </h3>
          <div className="space-y-2 pl-2">
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <a
                href={`mailto:${selectedUser.email}`}
                className="text-primary hover:underline"
              >
                {selectedUser.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} />
              {selectedUser.phone ? (
                <a href={`tel:${selectedUser.phone}`} className="hover:underline">
                  {selectedUser.phone}
                </a>
              ) : (
                <span className="text-subtle-foreground italic">
                  {t("noPhoneProvided")}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Address Card */}
        <div className="bg-surface-background border-border-default rounded-lg border p-4 shadow-sm">
          <h3 className="mb-3 flex items-center gap-2 font-semibold">
            <MapPin size={16} />
            {t("address")}
          </h3>
          <div className="space-y-2 pl-2">
            {fullAddress ? (
              <p>{fullAddress}</p>
            ) : (
              <p className="text-subtle-foreground italic">{t("noAddressAvailable")}</p>
            )}
          </div>
        </div>

        {/* Company Information Card */}
        {selectedUser.company && (
          <div className="bg-surface-background border-border-default rounded-lg border p-4 shadow-sm">
            <h3 className="mb-3 flex items-center gap-2 font-semibold">
              <Building2 size={16} />
              {t("companyDetails")}
            </h3>
            <div className="space-y-2 pl-2">
              {selectedUser.company.catchPhrase && (
                <div className="text-subtle-foreground mt-1 italic">
                  &quot;{selectedUser.company.catchPhrase}&quot;
                </div>
              )}
              {selectedUser.company.bs && (
                <div>
                  <span className="text-sm font-medium">{t("business")}</span>
                  <span>{selectedUser.company.bs}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Dialog>
  );
}
