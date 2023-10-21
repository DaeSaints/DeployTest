export interface PageProps {
  params: { recipientId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}
