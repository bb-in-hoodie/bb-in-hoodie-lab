import { SITE_NAME } from "../constants/environment";

export function formatPageTitle(pageTitle?: string): string {
  return pageTitle ? `${pageTitle} | ${SITE_NAME}` : SITE_NAME;
}
