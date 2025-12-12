// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
var BlogPost = defineDocumentType(() => ({
  name: "BlogPost",
  filePathPattern: "blog/**/*.md",
  contentType: "markdown",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    publishedAt: { type: "date", required: true },
    updatedAt: { type: "date", required: false },
    author: { type: "string", default: "SafetySignHub Team" },
    image: { type: "string", required: false },
    category: { type: "string", required: false },
    tags: { type: "list", of: { type: "string" }, default: [] },
    featured: { type: "boolean", default: false },
    draft: { type: "boolean", default: false }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (post) => post._raw.flattenedPath.replace("blog/", "")
    },
    url: {
      type: "string",
      resolve: (post) => `/blog/${post._raw.flattenedPath.replace("blog/", "")}`
    }
  }
}));
var KBArticle = defineDocumentType(() => ({
  name: "KBArticle",
  filePathPattern: "kb/**/*.md",
  contentType: "markdown",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    lastUpdated: { type: "date", required: false },
    category: { type: "string", required: false },
    difficulty: {
      type: "enum",
      options: ["Beginner", "Intermediate", "Advanced"],
      required: false
    },
    readingTime: { type: "number", required: false },
    order: { type: "number", default: 0 },
    featured: { type: "boolean", default: false },
    draft: { type: "boolean", default: false },
    image: { type: "string", required: false }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace("kb/", "")
    },
    url: {
      type: "string",
      resolve: (doc) => `/kb/${doc._raw.flattenedPath.replace("kb/", "")}`
    },
    categoryFromPath: {
      type: "string",
      resolve: (doc) => {
        const parts = doc._raw.flattenedPath.split("/");
        return parts.length > 1 ? parts[1] : "general";
      }
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [BlogPost, KBArticle]
});
export {
  BlogPost,
  KBArticle,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-52KMVTG6.mjs.map
