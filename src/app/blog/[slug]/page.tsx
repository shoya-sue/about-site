import React from 'react';
import { getBlogPostBySlug } from '@/lib/notion';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';

export const revalidate = 3600; // 1時間ごとに再検証

// 動的メタデータの生成
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  
  try {
    const response = await getBlogPostBySlug(slug);
    
    if (!response) {
      return {
        title: 'Article Not Found',
      };
    }
    
    const { post } = response;
    
    return {
      title: post.title,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        publishedTime: post.date,
        authors: ['SHO43'],
        images: post.coverImage ? [{ url: post.coverImage }] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
        images: post.coverImage ? [post.coverImage] : [],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Blog Article',
    };
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  try {
    const response = await getBlogPostBySlug(slug);
    
    if (!response) {
      notFound();
    }
    
    const { post, markdown } = response;
    
    return (
      <div className="container mx-auto px-4 py-8">
        <article className="prose prose-lg dark:prose-invert max-w-none">
          {post.coverImage && (
            <div className="mb-8">
              <img 
                src={post.coverImage} 
                alt={post.title} 
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}
          
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          
          <div className="flex items-center text-sm text-gray-500 mb-8">
            <time dateTime={post.date}>{post.date}</time>
            <span className="mx-2" aria-hidden="true">•</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {post.category}
            </span>
          </div>
          
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </article>
      </div>
    );
  } catch (error) {
    console.error('Error fetching blog post:', error);
    notFound();
  }
} 