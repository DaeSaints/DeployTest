import { ParentType } from "@/lib/interfaces/parent.interface";

export function isParent(recipient: any): recipient is ParentType {
  return (
    recipient &&
    typeof recipient._id === "string" &&
    typeof recipient.name === "string" &&
    typeof recipient.email === "string" &&
    typeof recipient.phone === "string" &&
    (recipient.children === undefined || Array.isArray(recipient.children)) &&
    (recipient.transactions === undefined ||
      Array.isArray(recipient.transactions))
  );
}
