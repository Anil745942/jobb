import React from 'react';
import Link from 'next/link';
import { blogPosts } from '@/data/blogPosts';
import AdSlot from '@/components/AdSlot';
import { Clock, User, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Career Blog - JobConnect Pro | Job Search Tips & Guides',
  description: 'Expert career advice, interview preparation guides, salary negotiation tips, and industry trends to accelerate your tech career.',
};

export default function Blog() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16 space-y-10">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
          Career Resources & Guides
        </h1>
        <p className="text-sm text-gray-500 mt-3 leading-relaxed">
          Level up your engineering career with expert-written guides, interview prep, and compensation insights.
        </p>
      </div>

      <AdSlot slot="1111111111" format="horizontal" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {blogPosts.map((post) => (
          <article
            key={post.slug}
            className="glass-card rounded-2xl overflow-hidden border border-gray-100 dark:border-zinc-800 shadow-lg flex flex-col group hover-lift"
          >
            <Link href={`/blog/${post.slug}`}>
              <img
                src={post.cover}
                alt={post.title}
                className="w-full h-44 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </Link>
            <div className="p-5 sm:p-6 flex flex-col flex-1">
              <div className="flex items-center gap-3 text-[10px] text-gray-400 font-semibold mb-3">
                <span className="bg-violet-50 dark:bg-violet-950/30 text-violet-600 px-2 py-0.5 rounded">{post.category}</span>
                <span className="flex items-center gap-1"><Clock size={10} /> {post.readTime}</span>
              </div>
              <h2 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white leading-snug group-hover:text-violet-600 transition-colors">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="text-xs text-gray-500 leading-relaxed mt-2 line-clamp-3 flex-1">{post.excerpt}</p>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-zinc-800">
                <span className="flex items-center gap-1.5 text-[10px] text-gray-400">
                  <User size={12} /> {post.author}
                </span>
                <Link href={`/blog/${post.slug}`} className="text-xs font-bold text-violet-600 flex items-center gap-1 hover:gap-2 transition-all">
                  Read <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
