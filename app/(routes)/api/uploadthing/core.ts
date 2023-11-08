import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

export const ourFileRouter = {
  profileImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => {
      return { userId: "123" };
    })
    .onUploadComplete(() => {}),
  courseImage: f({ image: { maxFileSize: "8MB", maxFileCount: 1 } })
    .middleware(() => {
      return { userId: "123" };
    })
    .onUploadComplete(() => {}),

  courseAttachment: f(["text", "image", "pdf"])
    .middleware(() => {
      return { userId: "123" };
    })
    .onUploadComplete(() => {}),

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
