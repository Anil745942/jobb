import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, blogPosts } from '@/data/blogPosts';
import { getArticleContent } from '@/data/blogContent';
import AdSlot from '@/components/AdSlot';
import { Clock, User, ArrowLeft, Calendar } from 'lucide-react';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Article Not Found' };
  return {
    title: `${post.title} - JobConnect Pro Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.cover],
      type: 'article',
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const paragraphs = getArticleContent(slug);
  const mid = Math.floor(paragraphs.length / 2);

  return (
    <article className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
      <Link href="/blog" className="inline-flex items-center gap-1 text-sm font-semibold text-violet-600 hover:text-violet-700 mb-8">
        <ArrowLeft size={16} /> Back to Blog
      </Link>

      <header className="mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-violet-600 bg-violet-50 dark:bg-violet-950/30 px-3 py-1 rounded-full">
          {post.category}
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mt-4 leading-tight">
          {post.title}
        </h1>
        <p className="text-sm text-gray-500 mt-3 leading-relaxed">{post.excerpt}</p>
        <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-gray-400">
          <span className="flex items-center gap-1.5"><User size={14} /> {post.author}</span>
          <span className="flex items-center gap-1.5"><Calendar size={14} /> {post.date}</span>
          <span className="flex items-center gap-1.5"><Clock size={14} /> {post.readTime}</span>
        </div>
      </header>

      <img src={post.cover} alt={post.title} className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-2xl mb-8" />

      <div className="prose-content space-y-5">
        {paragraphs.slice(0, mid).map((p, i) => (
          <p key={i} className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
            {p}
          </p>
        ))}
      </div>

      <div className="my-8">
        <AdSlot slot="2222222222" format="in-article" />
      </div>

      <div className="prose-content space-y-5">
        {paragraphs.slice(mid).map((p, i) => (
          <p key={i} className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
            {p}
          </p>
        ))}
      </div>

      <div className="mt-12 p-6 sm:p-8 glass-card rounded-2xl text-center">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white">Ready to find your next role?</h3>
        <p className="text-sm text-gray-500 mt-2">Browse thousands of verified job listings on JobConnect Pro.</p>
        <Link
          href="/jobs"
          className="inline-block mt-4 px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm rounded-xl transition-colors"
        >
          Explore Jobs
        </Link>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.excerpt,
            image: post.cover,
            datePublished: post.date,
            author: { '@type': 'Person', name: post.author },
            publisher: { '@type': 'Organization', name: 'JobConnect Pro' },
          }),
        }}
      />
    </article>
  );
}
