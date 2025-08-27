import { useCallback } from "react";

export const useContentFormatter = () => {
  const formatContent = useCallback((content) => {
    if (!content) return "Aucun contenu disponible";

    return content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/_(.*?)_/g, "<em>$1</em>")
      .replace(/(#\w[\w-]*)/g, "<strong>$1</strong>")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/\n/g, "<br />");
  }, []);

  const unformatContent = useCallback((formattedContent) => {
    if (!formattedContent) return "";
    
    return formattedContent
      .replace(/<strong>(.*?)<\/strong>/g, "**$1**")
      .replace(/<em>(.*?)<\/em>/g, "_$1_")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
  }, []);

  const formatHashtags = useCallback((hashtags) => {
    if (!hashtags) return [];
    return hashtags
      .replace(/\*\*/g, "")
      .trim()
      .split(/\s+/)
      .map((tag) => (tag.startsWith("#") ? tag : `#${tag}`));
  }, []);

  return { formatContent, unformatContent, formatHashtags };
};