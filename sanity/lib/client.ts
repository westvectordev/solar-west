import { createClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "@/sanity/env";

export function getSanityClient() {
  if (!isSanityConfigured) {
    return null;
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
  });
}
