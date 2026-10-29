import React, { useState } from 'react';
import { Star, ThumbsUp, MessageSquare, PenTool, CheckCircle, ShieldCheck, Filter, X, Sparkles } from 'lucide-react';
import { Review } from '../types';

interface ReviewsSectionProps {
  reviews: Review[];
  onAddReview: (review: Omit<Review, 'id' | 'likes' | 'userLiked'>) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews, onAddReview }) => {
  const [activeTag, setActiveTag] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'recent' | 'highest'>('recent');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // Likes state
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  // Write Review Form State
  const [newRating, setNewRating] = useState(5);
  const [newAuthor, setNewAuthor] = useState('');
  const [newReviewText, setNewReviewText] = useState('');
  const [selectedTags, setSelectedTags] = useState<('beer selection' | 'ambiance' | 'drinks' | 'food')[]>(['ambiance']);

  // Filter reviews
  const filteredReviews = reviews.filter((r) => {
    if (activeTag === 'All') return true;
    return r.tags.includes(activeTag as any);
  }).sort((a, b) => {
    if (sortBy === 'highest') return b.rating - a.rating;
    return 0; // default order
  });

  const handleLike = (id: string) => {
    setLikedMap((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleToggleTag = (tag: 'beer selection' | 'ambiance' | 'drinks' | 'food') => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newReviewText.trim()) return;

    onAddReview({
      author: newAuthor.trim(),
      authorBadge: 'Verified Diner',
      rating: newRating,
      date: 'Just now',
      content: newReviewText.trim(),
      tags: selectedTags.length > 0 ? selectedTags : ['food'],
      reviewsCount: 1,
      photosCount: 0
    });

    setNewAuthor('');
    setNewReviewText('');
    setNewRating(5);
    setIsWriteModalOpen(false);
  };

  // Tag counters based on current list
  const tagCounts = {
    'beer selection': reviews.filter((r) => r.tags.includes('beer selection')).length,
    'ambiance': reviews.filter((r) => r.tags.includes('ambiance')).length,
    'drinks': reviews.filter((r) => r.tags.includes('drinks')).length,
    'food': reviews.filter((r) => r.tags.includes('food')).length,
  };

  return (
    <section id="reviews" className="py-20 bg-[#141311] relative border-t border-[#26221D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#201D19] border border-[#D4A359]/30 text-xs font-semibold text-[#D4A359] uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-[#D4A359]" />
            <span>Community Feedback</span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-5xl font-bold text-[#F7F4EB]">
            Guest Impressions
          </h2>
          <p className="text-[#A89F90] text-sm sm:text-base">
            Verified experiences from Mitrovica locals, international guests, and Google Local Guides.
          </p>
        </div>

        {/* Google Maps Score & Breakdown Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#1A1815] border border-[#302A22] mb-10 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left: Overall Big Score */}
            <div className="md:col-span-4 text-center md:text-left border-b md:border-b-0 md:border-r border-[#2C2720] pb-6 md:pb-0 md:pr-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A89F90]">
                Google Maps Rating
              </span>
              <div className="flex items-baseline justify-center md:justify-start gap-2 my-1">
                <span className="font-serif-heading text-5xl sm:text-6xl font-bold text-[#F7F4EB]">
                  4.6
                </span>
                <div className="text-left">
                  <div className="flex text-[#F5B83D]">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-4 h-4 ${s <= 4 ? 'fill-[#F5B83D]' : 'fill-[#F5B83D]/60'}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-[#8E8678]">43 total reviews</span>
                </div>
              </div>
              <p className="text-xs text-[#9E9587] mt-2">
                Ranked among top historic venues in Mitrovica e Veriut
              </p>

              <button
                id="btn-write-review-top"
                onClick={() => setIsWriteModalOpen(true)}
                className="mt-4 px-4 py-2 rounded-xl bg-[#25201A] border border-[#3D3528] hover:border-[#D4A359] text-[#D4A359] text-xs font-bold flex items-center justify-center gap-2 transition-all w-full"
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>Write a Review</span>
              </button>
            </div>

            {/* Middle: Rating Distribution Bars */}
            <div className="md:col-span-8 space-y-2">
              {[
                { stars: 5, percentage: 74, count: 32 },
                { stars: 4, percentage: 16, count: 7 },
                { stars: 3, percentage: 7, count: 3 },
                { stars: 2, percentage: 2, count: 1 },
                { stars: 1, percentage: 0, count: 0 },
              ].map((row) => (
                <div key={row.stars} className="flex items-center gap-3 text-xs">
                  <span className="w-3 text-[#A89F90] font-medium">{row.stars}</span>
                  <div className="flex-1 h-2.5 rounded-full bg-[#25221E] overflow-hidden">
                    <div
                      style={{ width: `${row.percentage}%` }}
                      className="h-full bg-[#D4A359] rounded-full transition-all duration-500"
                    />
                  </div>
                  <span className="w-8 text-right text-[11px] text-[#7F776B]">{row.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Prompt Topics Tags Bar */}
          <div className="mt-8 pt-6 border-t border-[#29241E] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-[#8E8678] font-medium mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3 text-[#D4A359]" /> Sort topics:
              </span>
              <button
                onClick={() => setActiveTag('All')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  activeTag === 'All'
                    ? 'bg-[#D4A359] text-black font-bold'
                    : 'bg-[#1C1A17] text-[#A89F90] border border-[#2E2820] hover:text-white'
                }`}
              >
                All ({reviews.length})
              </button>

              <button
                onClick={() => setActiveTag('beer selection')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  activeTag === 'beer selection'
                    ? 'bg-[#D4A359] text-black font-bold'
                    : 'bg-[#1C1A17] text-[#A89F90] border border-[#2E2820] hover:text-white'
                }`}
              >
                beer selection ({tagCounts['beer selection']})
              </button>

              <button
                onClick={() => setActiveTag('ambiance')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  activeTag === 'ambiance'
                    ? 'bg-[#D4A359] text-black font-bold'
                    : 'bg-[#1C1A17] text-[#A89F90] border border-[#2E2820] hover:text-white'
                }`}
              >
                ambiance ({tagCounts['ambiance']})
              </button>

              <button
                onClick={() => setActiveTag('drinks')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  activeTag === 'drinks'
                    ? 'bg-[#D4A359] text-black font-bold'
                    : 'bg-[#1C1A17] text-[#A89F90] border border-[#2E2820] hover:text-white'
                }`}
              >
                drinks ({tagCounts['drinks']})
              </button>

              <button
                onClick={() => setActiveTag('food')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  activeTag === 'food'
                    ? 'bg-[#D4A359] text-black font-bold'
                    : 'bg-[#1C1A17] text-[#A89F90] border border-[#2E2820] hover:text-white'
                }`}
              >
                food ({tagCounts['food']})
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#8E8678]">
              <span>Order:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-[#151412] border border-[#302A21] rounded-lg px-2.5 py-1 text-xs text-[#ECE7DE] focus:outline-none"
              >
                <option value="recent">Most Relevant</option>
                <option value="highest">Highest Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reviews Cards Masonry / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => {
            const isLiked = likedMap[rev.id];
            const currentLikes = rev.likes + (isLiked ? 1 : 0);

            return (
              <div
                key={rev.id}
                className="p-6 rounded-2xl bg-[#181614] border border-[#2C2720] hover:border-[#3D3528] flex flex-col justify-between shadow-lg transition-all space-y-4"
              >
                <div className="space-y-3">
                  {/* Author Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-full bg-[#24201A] border border-[#3D3529] text-[#D4A359] font-bold flex items-center justify-center text-sm shadow">
                        {rev.author.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-bold text-[#F4EFE6]">{rev.author}</h4>
                        </div>
                        {rev.authorBadge && (
                          <div className="flex items-center gap-1 text-[11px] text-[#A89F90]">
                            <ShieldCheck className="w-3 h-3 text-[#D4A359]" />
                            <span>{rev.authorBadge}</span>
                            {rev.reviewsCount && <span>· {rev.reviewsCount} reviews</span>}
                          </div>
                        )}
                      </div>
                    </div>

                    <span className="text-[11px] text-[#7A7264]">{rev.date}</span>
                  </div>

                  {/* Stars */}
                  <div className="flex text-[#F5B83D]">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${s <= rev.rating ? 'fill-[#F5B83D]' : 'fill-[#383228] text-[#383228]'}`}
                      />
                    ))}
                  </div>

                  {/* Review Content */}
                  <p className="text-xs sm:text-sm text-[#C8C0B2] leading-relaxed">
                    {rev.content}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {rev.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-0.5 rounded bg-[#201D18] text-[#C4BCB0] border border-[#332D24]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Owner Reply if available */}
                  {rev.ownerReply && (
                    <div className="mt-3 p-3 rounded-xl bg-[#201D19] border-l-2 border-[#D4A359] text-[11px] text-[#B8AF9F] space-y-1">
                      <strong className="text-[#D4A359] block">Response from Museum Pub Management:</strong>
                      <p>{rev.ownerReply}</p>
                    </div>
                  )}
                </div>

                {/* Footer Likes / Helpful */}
                <div className="pt-3 border-t border-[#26221D] flex items-center justify-between text-xs text-[#8E8678]">
                  <button
                    onClick={() => handleLike(rev.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors ${
                      isLiked
                        ? 'text-[#D4A359] bg-[#292218] border border-[#D4A359]/30'
                        : 'hover:text-[#EDE8DF] hover:bg-[#201E1A]'
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'fill-[#D4A359]' : ''}`} />
                    <span>Helpful ({currentLikes})</span>
                  </button>

                  <span className="text-[11px] text-[#6A6356]">Verified Google visit</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Write a Review Modal */}
        {isWriteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="bg-[#171513] border border-[#383126] rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl p-6 relative text-[#ECE7DE]">
              <button
                onClick={() => setIsWriteModalOpen(false)}
                className="absolute top-4 right-4 text-[#8E8678] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 rounded-xl bg-[#D4A359]/20 text-[#D4A359] flex items-center justify-center">
                  <PenTool className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif-heading text-xl font-bold text-white">Share Your Experience</h3>
                  <p className="text-xs text-[#9E9587]">Restaurant Museum Pub · Mitrovica</p>
                </div>
              </div>

              <form onSubmit={handleSubmitReview} className="space-y-4">
                {/* Rating Selector */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#A89F90] mb-1.5">
                    Your Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setNewRating(s)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            s <= newRating ? 'fill-[#F5B83D] text-[#F5B83D]' : 'fill-[#2B2721] text-[#3A3329]'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-xs font-bold text-[#F5B83D]">{newRating} of 5 Stars</span>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#A89F90] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Besnik K."
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#121110] border border-[#332D24] text-sm text-[#EDE7DE] focus:border-[#D4A359] focus:outline-none"
                  />
                </div>

                {/* Topic Tags */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#A89F90] mb-1">
                    Topics Experienced
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {(['beer selection', 'ambiance', 'drinks', 'food'] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => handleToggleTag(t)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                          selectedTags.includes(t)
                            ? 'bg-[#D4A359] text-black font-bold'
                            : 'bg-[#221F1A] text-[#A89F90] border border-[#332D24]'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#A89F90] mb-1">
                    Your Review
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe the coffee macchiato, food, beers, historic stone interior, or service..."
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#121110] border border-[#332D24] text-xs sm:text-sm text-[#EDE7DE] focus:border-[#D4A359] focus:outline-none placeholder-[#766E62]"
                  />
                </div>

                {/* Submit */}
                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsWriteModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs text-[#A89F90] hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C59341] to-[#D4A359] text-black text-xs sm:text-sm font-bold shadow hover:brightness-110"
                  >
                    Publish Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
