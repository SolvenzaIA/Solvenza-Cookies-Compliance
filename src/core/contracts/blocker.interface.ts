export interface IResourceBlocker {
  type: "script" | "iframe" | "image";
  process(
    isCategoryAllowed: (category: string) => boolean,
    isServiceAllowed: (serviceId: string) => boolean
  ): void;
}
