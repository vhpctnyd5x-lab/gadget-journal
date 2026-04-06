'use client';

import { useAuth } from '@clerk/nextjs';
import { ArticlePaywall } from './paywall';
import type { ArticleSection, BenchmarkRow, SpecRow } from '@/lib/articles';

// ──── Sub-components (client-side) ───────────────────────────────

function BenchmarkChart({ rows }: { rows: BenchmarkRow[] }) {
  const maxScore = Math.max(...rows.flatMap((r) => [r.score, r.competitorScore ?? 0]));

  return (
    <div className="my-8 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="bg-slate-50 dark:bg-slate-800 px-5 py-3 border-b border-slate-200 dark:border-slate-700">
        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          ベンチマーク
        </h3>
      </div>
      <div className="p-5 space-y-5">
        {rows.map((row, i) => (
          <div key={i}>
            <div className="flex items-center justify-between text-sm mb-1.5">
              <span className="font-medium text-slate-700 dark:text-slate-300">{row.name}</span>
              <span className="text-slate-500 dark:text-slate-400 text-xs">
                {row.score.toLocaleString()}{row.unit ? ` ${row.unit}` : ''}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all"
                  style={{ width: `${(row.score / maxScore) * 100}%` }}
                />
              </div>
              <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold w-16 text-right">
                本製品
              </span>
            </div>
            {row.competitorScore !== undefined && (
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="h-full bg-slate-400 dark:bg-slate-500 rounded-full transition-all"
                    style={{ width: `${(row.competitorScore / maxScore) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 w-16 text-right truncate">
                  {row.competitorName ?? '前世代'}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function SpecTable({ rows }: { rows: SpecRow[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 my-8">
      <table className="w-full text-sm">
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={i % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-800/60'}
            >
              <td className="px-5 py-3 font-semibold text-slate-700 dark:text-slate-300 w-2/5 border-r border-slate-200 dark:border-slate-700">
                {row.key}
              </td>
              <td className="px-5 py-3 text-slate-600 dark:text-slate-400">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ──── Main ArticleContent component ──────────────────────────────

interface ArticleContentProps {
  sections: ArticleSection[];
  pros?: string[];
  cons?: string[];
  tags: string[];
  specTable?: SpecRow[];
  benchmarks?: BenchmarkRow[];
}

const PREVIEW_SECTIONS = 1;

export function ArticleContent({
  sections,
  pros,
  cons,
  tags,
  specTable,
  benchmarks,
}: ArticleContentProps) {
  const { userId, isLoaded } = useAuth();
  const isSignedIn = isLoaded && !!userId;

  const sectionsToShow = isSignedIn ? sections : sections.slice(0, PREVIEW_SECTIONS);

  return (
    <>
      {/* ── Spec Table (signed-in only) ── */}
      {isSignedIn && specTable && specTable.length > 0 && (
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 pt-8">
          <h2 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">スペック一覧</h2>
          <SpecTable rows={specTable} />
        </div>
      )}

      {/* ── Benchmark Chart (signed-in only) ── */}
      {isSignedIn && benchmarks && benchmarks.length > 0 && (
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 pt-6">
          <BenchmarkChart rows={benchmarks} />
        </div>
      )}

      {/* ── Pros / Cons (signed-in only) ── */}
      {isSignedIn && pros && cons && (
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 py-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-2xl p-5">
              <h3 className="font-bold text-green-700 dark:text-green-400 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                良い点
              </h3>
              <ul className="space-y-2">
                {pros.map((pro, i) => (
                  <li key={i} className="text-sm text-green-800 dark:text-green-300 flex items-start gap-2">
                    <span className="mt-0.5 text-green-500 flex-shrink-0">✓</span>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-2xl p-5">
              <h3 className="font-bold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
                気になる点
              </h3>
              <ul className="space-y-2">
                {cons.map((con, i) => (
                  <li key={i} className="text-sm text-red-800 dark:text-red-300 flex items-start gap-2">
                    <span className="mt-0.5 text-red-500 flex-shrink-0">✗</span>
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ── Sections ── */}
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 pb-16">
        <div className="space-y-10">
          {sectionsToShow.map((section, i) => (
            <section key={i}>
              <h2 className="text-2xl font-bold mb-4 pb-3 border-l-4 border-blue-500 pl-4 text-slate-900 dark:text-white">
                {section.heading}
              </h2>
              <div className="text-[17px] leading-[1.85] text-slate-700 dark:text-slate-300 space-y-4">
                {section.text.split('\n\n').map(
                  (paragraph, j) =>
                    paragraph.trim() && <p key={j}>{paragraph.trim()}</p>,
                )}
              </div>
            </section>
          ))}
        </div>

        {!isSignedIn && <ArticlePaywall />}

        {isSignedIn && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
