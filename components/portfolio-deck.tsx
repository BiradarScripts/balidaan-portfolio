"use client";

import Image from "next/image";
import { startTransition, useEffect, useRef, useState, type CSSProperties } from "react";
import {
  aboutCards,
  achievementCards,
  columnMeta,
  experienceCards,
  identity,
  projectCards,
  quickStats,
  timelineMilestones,
  timelineYears,
  type ColumnId,
  type Palette,
  type PortfolioCard,
  type SurfaceStyle,
} from "@/lib/portfolio-data";

const columnOrder: ColumnId[] = ["about", "experience", "projects", "achievements"];

export function PortfolioDeck() {
  const [activeColumn, setActiveColumn] = useState<ColumnId>("about");
  const [selectedCard, setSelectedCard] = useState<PortfolioCard | null>(null);
  const [copied, setCopied] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const columnRefs = useRef<Record<ColumnId, HTMLElement | null>>({
    about: null,
    experience: null,
    projects: null,
    achievements: null,
  });

  const maxSlideIndex = Math.max(columnOrder.length - 3, 0);

  useEffect(() => {
    if (!selectedCard) {
      return undefined;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedCard(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedCard]);

  const focusColumn = (columnId: ColumnId) => {
    startTransition(() => {
      setActiveColumn(columnId);
    });
  };

  const moveColumn = (direction: -1 | 1) => {
    const nextSlideIndex = Math.min(
      Math.max(slideIndex + direction, 0),
      maxSlideIndex,
    );

    startTransition(() => {
      setSlideIndex(nextSlideIndex);
      setActiveColumn(columnOrder[nextSlideIndex]);
    });
  };

  const openCard = (card: PortfolioCard) => {
    startTransition(() => {
      setSelectedCard(card);
    });
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(identity.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <main className="deck-page">
        <div className="deck-page__glow deck-page__glow--one" aria-hidden="true" />
        <div className="deck-page__glow deck-page__glow--two" aria-hidden="true" />
        <div className="deck-page__noise" aria-hidden="true" />

        <header className="deck-topbar">
          <div className="deck-brand">
            <p className="deck-brand__eyebrow">Portfolio</p>
            <h1>{identity.name}</h1>
          </div>

          <div className="deck-nav">
            <button
              type="button"
              onClick={() => moveColumn(-1)}
              disabled={slideIndex === 0}
              aria-label="Focus previous column"
            >
              &#8249;
            </button>
            <button
              type="button"
              onClick={() => moveColumn(1)}
              disabled={slideIndex === maxSlideIndex}
              aria-label="Focus next column"
            >
              &#8250;
            </button>
          </div>
        </header>

        <section className="deck-viewport" aria-label="Interactive portfolio columns">
          <div
            className="deck-rail"
            style={{ "--slide-index": slideIndex } as CSSProperties}
          >
            {columnOrder.map((columnId) => {
              const meta = columnMeta[columnId];
              const isActive = columnId === activeColumn;

              return (
                <section
                  key={columnId}
                  ref={(node) => {
                    columnRefs.current[columnId] = node;
                  }}
                  className={`deck-column${isActive ? " is-active" : ""}`}
                  onMouseEnter={() => focusColumn(columnId)}
                  onFocusCapture={() => focusColumn(columnId)}
                  aria-label={meta.title}
                >
                  <div className="deck-column__header">
                    <p>{meta.label}</p>
                    <div>
                      <h2>{meta.title}</h2>
                      <span>{meta.description}</span>
                    </div>
                  </div>

                  <div
                    className={`deck-column__body${isActive ? " is-scrollable" : ""}`}
                  >
                    {columnId === "about" && (
                      <AboutColumn
                        copied={copied}
                        onCopyEmail={handleCopyEmail}
                        onOpenCard={openCard}
                      />
                    )}
                    {columnId === "experience" && (
                      <ExperienceColumn onOpenCard={openCard} />
                    )}
                    {columnId === "projects" && <ProjectsColumn onOpenCard={openCard} />}
                    {columnId === "achievements" && (
                      <AchievementsColumn onOpenCard={openCard} />
                    )}
                  </div>
                </section>
              );
            })}
          </div>
        </section>
      </main>

      <DetailOverlay
        card={selectedCard}
        onClose={() => {
          setSelectedCard(null);
        }}
      />
    </>
  );
}

function AboutColumn({
  copied,
  onCopyEmail,
  onOpenCard,
}: {
  copied: boolean;
  onCopyEmail: () => void;
  onOpenCard: (card: PortfolioCard) => void;
}) {
  return (
    <div className="column-about">
      <article className="portrait-card">
        <div className="portrait-card__image">
          <Image
            src="/shreyas-avatar.jpg"
            alt="Shreyas Biradar portrait"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 30vw"
          />
          <div className="portrait-card__screen" aria-hidden="true" />
        </div>

        <div className="portrait-card__copy">
          <p className="section-kicker">About me</p>
          <h3>{identity.role}</h3>
          <p>{identity.intro}</p>
          <p>{identity.bio}</p>
        </div>

        <div className="portrait-card__actions">
          <a href={identity.resume} target="_blank" rel="noreferrer">
            Resume
          </a>
          <a href={identity.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={identity.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <button type="button" onClick={onCopyEmail}>
            {copied ? "Email copied" : "Copy email"}
          </button>
        </div>
      </article>

      <div className="stat-grid">
        {quickStats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
          </div>
        ))}
      </div>

      <div className="info-callout">
        <span>Location</span>
        <p>{identity.location}</p>
      </div>

      <div className="entry-stack">
        {aboutCards.map((card) => (
          <button
            key={card.id}
            type="button"
            className="entry-card entry-card--simple"
            onClick={() => onOpenCard(card)}
          >
            <div className="entry-card__topline">
              <p>{card.eyebrow}</p>
              <span>{card.accent}</span>
            </div>
            <h4>{card.title}</h4>
            <strong>{card.meta}</strong>
            <p>{card.summary}</p>
            <div className="tag-row">
              {card.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ExperienceColumn({
  onOpenCard,
}: {
  onOpenCard: (card: PortfolioCard) => void;
}) {
  return (
    <div className="timeline-shell">
      <div className="timeline-shell__scaffold" aria-hidden="true">
        <div className="timeline-shell__years">
          {timelineYears.map((year) => (
            <span key={year}>{year}</span>
          ))}
        </div>
        <div className="timeline-shell__track">Research · Product · Open Source</div>
      </div>

      <div className="timeline-shell__content">
        {experienceCards.map((card) => (
          <button
            key={card.id}
            type="button"
            className="entry-card timeline-card"
            onClick={() => onOpenCard(card)}
          >
            <div className="timeline-card__badge">{card.accent}</div>
            <div className="timeline-card__main">
              <div className="entry-card__topline">
                <p>{card.eyebrow}</p>
                <span>{card.year}</span>
              </div>
              <h4>{card.title}</h4>
              <strong>{card.meta}</strong>
              <p>{card.summary}</p>
              <div className="tag-row">
                {card.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </button>
        ))}

        <div className="timeline-notes">
          {timelineMilestones.map((milestone) => (
            <div key={milestone} className="timeline-note">
              <span />
              <p>{milestone}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectsColumn({
  onOpenCard,
}: {
  onOpenCard: (card: PortfolioCard) => void;
}) {
  return (
    <div className="showcase-stack">
      {projectCards.map((card) => (
        <button
          key={card.id}
          type="button"
          className="showcase-card"
          onClick={() => onOpenCard(card)}
        >
          <PreviewSurface
            title={card.title}
            palette={card.palette ?? "cyan"}
            surface={card.surface ?? "rings"}
            labels={card.previewLabels ?? []}
          />
          <div className="showcase-card__content">
            <div className="entry-card__topline">
              <p>{card.eyebrow}</p>
              <span>{card.accent}</span>
            </div>
            <h4>{card.title}</h4>
            <strong>{card.meta}</strong>
            <p>{card.summary}</p>
          </div>
        </button>
      ))}
    </div>
  );
}

function AchievementsColumn({
  onOpenCard,
}: {
  onOpenCard: (card: PortfolioCard) => void;
}) {
  return (
    <div className="achievement-stack">
      {achievementCards.map((card) => (
        <button
          key={card.id}
          type="button"
          className="achievement-card"
          onClick={() => onOpenCard(card)}
        >
          <div className="achievement-card__metric">{card.metric}</div>
          <div className="achievement-card__content">
            <div className="entry-card__topline">
              <p>{card.eyebrow}</p>
              <span>{card.accent}</span>
            </div>
            <h4>{card.title}</h4>
            <strong>{card.meta}</strong>
            <p>{card.summary}</p>
            <PreviewStrip
              palette={card.palette ?? "emerald"}
              surface={card.surface ?? "pulse"}
              labels={card.previewLabels ?? []}
            />
          </div>
        </button>
      ))}
    </div>
  );
}

function PreviewSurface({
  title,
  palette,
  surface,
  labels,
}: {
  title: string;
  palette: Palette;
  surface: SurfaceStyle;
  labels: string[];
}) {
  return (
    <div className={`preview-surface preview-surface--${palette} preview-surface--${surface}`}>
      <div className="preview-surface__frame">
        <div className="preview-surface__layer preview-surface__layer--one" />
        <div className="preview-surface__layer preview-surface__layer--two" />
        <div className="preview-surface__layer preview-surface__layer--three" />
        <div className="preview-surface__label">{title}</div>
      </div>
      <PreviewStrip palette={palette} surface={surface} labels={labels} />
    </div>
  );
}

function PreviewStrip({
  palette,
  surface,
  labels,
}: {
  palette: Palette;
  surface: SurfaceStyle;
  labels: string[];
}) {
  return (
    <div className="preview-strip">
      {labels.map((label) => (
        <div
          key={label}
          className={`preview-strip__item preview-strip__item--${palette} preview-strip__item--${surface}`}
        >
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

function DetailOverlay({
  card,
  onClose,
}: {
  card: PortfolioCard | null;
  onClose: () => void;
}) {
  if (!card) {
    return null;
  }

  return (
    <div className="detail-overlay" role="presentation" onClick={onClose}>
      <section
        className="detail-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="detail-panel__close" onClick={onClose}>
          Close
        </button>

        <div className="detail-panel__intro">
          <p>{card.eyebrow}</p>
          <h3 id="detail-title">{card.title}</h3>
          <strong>{card.meta}</strong>
          <span>{card.detailIntro}</span>
        </div>

        <div className="detail-panel__body">
          <div className="tag-row">
            {card.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>

          <ul>
            {card.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>

          <div className="detail-panel__links">
            {card.links.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
