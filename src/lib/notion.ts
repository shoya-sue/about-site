import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { BlogPost } from '@/types/blog';

// Notion API クライアントの初期化
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// Notion to Markdown コンバーターの初期化
const n2m = new NotionToMarkdown({ notionClient: notion });

/**
 * Notionデータベースからブログ記事の一覧を取得する
 * @returns ブログ記事の配列
 */
export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const databaseId = process.env.NOTION_DATABASE_ID;
  
  if (!databaseId) {
    throw new Error('NOTION_DATABASE_ID is not defined');
  }

  // データベースをクエリする
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Published',
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: 'Date',
        direction: 'descending',
      },
    ],
  });

  // レスポンスからブログ記事のデータを抽出する
  const posts = response.results.map((page) => {
    const properties = page.properties;
    
    return {
      id: page.id,
      title: properties.Title.title[0]?.plain_text || 'Untitled',
      excerpt: properties.Excerpt.rich_text[0]?.plain_text || '',
      date: properties.Date.date?.start || '',
      category: properties.Category.select?.name || 'Uncategorized',
      coverImage: properties.Cover?.files[0]?.file?.url || '',
      slug: properties.Slug.rich_text[0]?.plain_text || '',
    } as BlogPost;
  });

  return posts;
}

/**
 * 指定されたIDのブログ記事の詳細を取得する
 * @param pageId Notionのページ（記事）ID
 * @returns ブログ記事の詳細とマークダウンコンテンツ
 */
export async function getBlogPostById(pageId: string): Promise<{ post: BlogPost; markdown: string }> {
  // ページ（記事）の詳細を取得する
  const page = await notion.pages.retrieve({ page_id: pageId });
  const properties = page.properties;
  
  // ブログ記事のデータを作成する
  const post: BlogPost = {
    id: page.id,
    title: properties.Title.title[0]?.plain_text || 'Untitled',
    excerpt: properties.Excerpt.rich_text[0]?.plain_text || '',
    date: properties.Date.date?.start || '',
    category: properties.Category.select?.name || 'Uncategorized',
    coverImage: properties.Cover?.files[0]?.file?.url || '',
    slug: properties.Slug.rich_text[0]?.plain_text || '',
  };

  // ページのブロックをマークダウンに変換する
  const mdblocks = await n2m.pageToMarkdown(pageId);
  const markdown = n2m.toMarkdownString(mdblocks);

  return { post, markdown: markdown.parent };
}

/**
 * 記事のスラッグからブログ記事を取得する
 * @param slug 記事のスラッグ
 * @returns ブログ記事の詳細とマークダウンコンテンツ
 */
export async function getBlogPostBySlug(slug: string): Promise<{ post: BlogPost; markdown: string } | null> {
  const databaseId = process.env.NOTION_DATABASE_ID;
  
  if (!databaseId) {
    throw new Error('NOTION_DATABASE_ID is not defined');
  }

  // スラッグでデータベースをクエリする
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Slug',
      rich_text: {
        equals: slug,
      },
    },
    page_size: 1,
  });

  if (response.results.length === 0) {
    return null;
  }

  const pageId = response.results[0].id;
  return getBlogPostById(pageId);
} 