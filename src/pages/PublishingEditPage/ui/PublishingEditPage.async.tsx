import { lazy } from "react";

export const PublishingEditPageAsync = lazy(
  () => import("./PublishingEditPage")
);
