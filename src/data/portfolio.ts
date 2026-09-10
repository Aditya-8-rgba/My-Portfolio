/**
 * Central content source for the portfolio.
 * Update copy, projects, media and links here — the UI reads from this file.
 */

const media = {
  reel1m: "/media/videos/reel-1m.mp4",
  bootcamp: "/media/images/adi-bootcamp.png",
  ai1: "/media/videos/ai-01.mp4",
  aiGallery: [
    "/media/videos/ai-01.mp4",
    "/media/videos/ai-02.mp4",
    "/media/videos/ai-03.mp4",
    "/media/videos/ai-04.mp4",
    "/media/videos/ai-05.mp4",
    "/media/videos/ai-06.mp4",
    "/media/videos/ai-07.mp4",
    "/media/videos/ai-08.mp4",
    "/media/videos/ai-09.mp4",
  ],
  marketingMap: "/media/images/digital-marketing-map.png",
};


const aiGeneratedVideos: MediaItem[] = media.aiGallery.map((src, i) => ({
  src,
  type: "video",
  alt: `AI-generated video ${i + 1}`,
  aspect: "portrait",
  poster: `/media/posters/ai-${String(i + 1).padStart(2, "0")}.jpg`,
}));


export type MediaItem = {
  /** Set `src` once the real asset is available. Leave undefined for an elegant placeholder. */
  src?: string;
  type: "image" | "video";
  alt: string;
  caption?: string;
  /** Optional aspect hint used by the media frame. */
  aspect?: "square" | "portrait" | "video" | "wide";
  /** Optional poster image shown before a video starts loading. */
  poster?: string;
};

export type Metric = {
  value: string;
  label: string;
};

export type CaseSection = {
  heading: string;
  body: string;
  bullets?: string[];
};

export type Project = {
  slug: string;
  index: string;
  category: string;
  title: string;
  /** Organization or client line. */
  org: string;
  orgLabel: string;
  summary: string;
  disciplines: string[];
  year?: string;
  metrics: Metric[];
  cover: MediaItem;
  gallery: MediaItem[];
  sections: CaseSection[];
};

export const profile = {
  name: "Aditya Kandwal",
  role: "Digital Marketer × Visual Storyteller",
  location: "Bhopal, Madhya Pradesh, India",
  email: "digitalmaverick.aditya@gmail.com",
  heroLine1: "I create content",
  heroLine2: "that performs.",
  heroSupport:
    "Digital marketer and multimedia professional combining performance marketing, content strategy and visual storytelling to turn attention into measurable growth.",
  aboutShort:
    "I work at the point where creative and performance meet — producing short-form video, campaign creative and social content, then running and reading the numbers behind it.",
};

/**
 * Social links. Leave `url` empty until the real profile URL is supplied —
 * the UI renders unconfigured links as non-clickable, muted items.
 */
export const socials: { label: string; url: string }[] = [
  { label: "LinkedIn", url: "" },
  { label: "Instagram", url: "" },
  { label: "Behance", url: "" },
];

/** Drop the real file in /public and set this to e.g. "/aditya-kandwal-resume.pdf". */
export const resumeUrl = "";

export const results: Metric[] = [
  { value: "1M+", label: "Reel Views" },
  { value: "3.7K+", label: "Followers Gained" },
  { value: "6K+", label: "Campaign Reach" },
  { value: "₹25.42", label: "Cost / Result" },
];

export const projects: Project[] = [
  {
    slug: "reel-to-1m-views",
    index: "01",
    category: "Organic Growth",
    title: "From Reel to 1M+ Views",
    org: "Learning Education Hub",
    orgLabel: "Organization",
    summary:
      "Short-form video built for retention — including reels crossing 1M and 500K+ views — that compounded into 2,500+ new followers.",
    disciplines: ["Social Media Strategy", "Short-form Video", "Organic Growth"],
    metrics: [
      { value: "1M+", label: "Views on a single reel" },
      { value: "500K+", label: "Views on a second reel" },
      { value: "2,500+", label: "New Instagram followers" },
      { value: "1,000+", label: "Followers from one reel" },
    ],
    cover: {
      src: media.reel1m,
      type: "video",
      alt: "Vertical reel from the Learning Education Hub organic growth work",
      aspect: "portrait",
      poster: "/media/posters/reel-1m.jpg",
    },
    gallery: [
      { src: media.reel1m, type: "video", alt: "Top-performing reel", aspect: "portrait", poster: "/media/posters/reel-1m.jpg" },
    ],
    sections: [
      {
        heading: "Challenge",
        body: "An education brand with a small social presence needed reach it could not buy. The account had content, but nothing that travelled beyond the existing audience.",
      },
      {
        heading: "Insight",
        body: "On short-form, the first second decides everything. Educational content spreads when it opens with a claim or tension the viewer wants resolved — not with a logo or an introduction.",
      },
      {
        heading: "Strategy",
        body: "Build a repeatable reel format around hook, payoff and a reason to follow, then publish consistently and let watch-time decide which formats deserved more production effort.",
        bullets: [
          "Hook-first scripting with the payoff promised in the opening frame",
          "Formats designed to be re-shot quickly, not one-off productions",
          "Follow-worthy endings instead of generic calls to action",
        ],
      },
      {
        heading: "Execution",
        body: "Produced short-form content end to end — concept, shoot, edit, captions and publishing — with each piece reviewed against retention before the next batch was planned.",
      },
      {
        heading: "Results",
        body: "The work produced reels crossing 1M and 500K+ views, helped drive 2,500+ new Instagram followers, and one reel generated 1,000+ followers by itself.",
      },
      {
        heading: "Learnings",
        body: "Distribution is a creative problem. The formats that scaled were the ones that were cheap to repeat, which meant the winning idea could be run again instead of admired once.",
      },
    ],
  },
  {
    slug: "python-bootcamp-meta-ads",
    index: "02",
    category: "Performance Marketing",
    title: "Turning ₹300/Day Into Conversations",
    org: "7-Day Python Bootcamp",
    orgLabel: "Campaign",
    summary:
      "A tightly budgeted Meta Ads campaign optimised toward messaging conversations at ₹25.42 cost per result.",
    disciplines: [
      "Meta Ads",
      "Audience Targeting",
      "Budgeting",
      "Creative Testing",
      "Optimization",
    ],
    metrics: [
      { value: "6,013", label: "Reach" },
      { value: "8,121", label: "Impressions" },
      { value: "10", label: "Messaging conversations" },
      { value: "₹25.42", label: "Cost per result" },
    ],
    cover: {
      src: media.bootcamp,
      type: "image",
      alt: "Meta Ads Manager results for the 7-Day Python Bootcamp campaign",
      aspect: "wide",
    },
    gallery: [
      {
        src: media.bootcamp,
        type: "image",
        alt: "Ads Manager results panel for the 7-Day Python Bootcamp campaign",
        aspect: "wide",
      },
    ],
    sections: [
      {
        heading: "Challenge",
        body: "Fill a 7-day Python bootcamp on a ₹300/day budget — small enough that every rupee of wasted delivery was visible in the results.",
      },
      {
        heading: "Insight",
        body: "At this spend level there is no room to buy learnings broadly. The campaign had to start narrow, optimise for a conversation rather than a click, and let the creative do the qualifying.",
      },
      {
        heading: "Strategy",
        body: "Run a messaging objective so intent was measurable from the first day, keep audiences tight around learners and students, and test creative angles rather than audiences.",
      },
      {
        heading: "Execution",
        body: "Set up and managed the campaign end to end: audience definition, budget and delivery pacing, creative variants, and daily optimisation against cost per result.",
        bullets: [
          "₹300/day campaign budget",
          "Audience targeting built around course-relevant interests",
          "Creative testing across hooks and formats",
        ],
      },
      {
        heading: "Results",
        body: "6,013 reach, 8,121 impressions and 10 messaging conversations at ₹25.42 cost per result.",
      },
      {
        heading: "Learnings",
        body: "Small budgets reward discipline. Holding the audience steady while rotating creative made it clear which message — not which targeting guess — was doing the work.",
      },
    ],
  },
  {
    slug: "multimedia-fusion-generative-ai",
    index: "03",
    category: "Creative Technology",
    title: "Multimedia Fusion into Generative AI",
    org: "Self-directed practice",
    orgLabel: "Focus",
    summary:
      "Folding generative AI tools into a multimedia workflow — ideation, visuals, edits and copy — so creative output stays fast without losing craft.",
    disciplines: ["Generative AI", "Multimedia Production", "Creative Workflow", "Editing"],
    metrics: [],
    cover: {
      src: media.ai1,
      type: "video",
      alt: "Generative AI assisted multimedia frame",
      aspect: "wide",
      poster: "/media/posters/ai-01.jpg",
    },
    gallery: aiGeneratedVideos,
    sections: [
      {
        heading: "Challenge",
        body: "Content demand moves faster than traditional production cycles. Ideas need to be visualised, tested and published before the moment passes.",
      },
      {
        heading: "Insight",
        body: "Generative AI is strongest at the edges of the process — exploring directions and removing repetitive steps — while judgement, taste and structure stay human.",
      },
      {
        heading: "Strategy",
        body: "Use generative tools for ideation, moodboards, variations and first drafts, then apply multimedia craft to shape the final output.",
        bullets: [
          "AI-assisted concepting and visual exploration",
          "Faster creative variations for testing",
          "Human editing pass on every published piece",
        ],
      },
      {
        heading: "Execution",
        body: "Built a working pipeline that blends design, video editing and generative tooling so a concept can move from prompt to polished asset in one sitting.",
      },
      {
        heading: "Learnings",
        body: "AI raises the floor, not the ceiling. The advantage comes from knowing what to keep — the craft decisions still decide whether the work is worth watching.",
      },
    ],
  },

  {
    slug: "teaching-digital-marketing",
    index: "04",
    category: "Marketing Education",
    title: "Teaching Digital Marketing Through Practice",
    org: "Learning Education Hub",
    orgLabel: "Organization",
    summary:
      "Structured, hands-on instruction in paid social and search — taught by running the same work live rather than in theory.",
    disciplines: ["Performance Marketing", "SEO", "Training"],
    metrics: [],
    cover: {
      src: media.marketingMap,
      type: "image",
      alt: "Digital marketing skill map — SEO, Meta Ads, Google Ads, Analytics, Audience, Creatives, Funnels, Email and Content",
      aspect: "wide",
    },
    gallery: [
      {
        src: media.marketingMap,
        type: "image",
        alt: "Digital marketing skill map used in teaching sessions",
        aspect: "wide",
      },
    ],
    sections: [
      {
        heading: "Challenge",
        body: "Digital marketing is usually taught as vocabulary. Learners could name a campaign objective without being able to build one.",
      },
      {
        heading: "Insight",
        body: "Concepts stick when they are attached to a decision — a budget you have to set, an audience you have to defend, a creative you have to kill.",
      },
      {
        heading: "Execution",
        body: "Taught and applied Meta Ads concepts including targeting, budgeting and creative testing, delivered structured hands-on digital marketing instruction, and covered SEO fundamentals across on-page, technical and keyword research.",
        bullets: [
          "Meta Ads: targeting, budgeting, creative testing",
          "SEO fundamentals: on-page, technical, keyword research",
          "Structured, practice-led sessions for student groups",
        ],
      },
      {
        heading: "Learnings",
        body: "Explaining a campaign to someone who has never run one is the fastest way to find the parts of your own process that are habit rather than reasoning.",
      },
    ],
  },
];

export const expertise = [
  {
    title: "Performance Marketing",
    items: [
      "Meta Ads",
      "Audience targeting",
      "Budget & bid management",
      "Creative testing",
      "Reporting",
    ],
  },
  {
    title: "Content & Social",
    items: [
      "Content strategy",
      "Content calendars",
      "Mood boards",
      "Community management",
      "Short-form content",
    ],
  },
  {
    title: "Search",
    items: [
      "SEO fundamentals",
      "Keyword research",
      "On-page SEO",
      "Technical SEO",
      "Google Business Profile setup & optimization",
    ],
  },
  {
    title: "Creative",
    items: [
      "Videography",
      "Video editing",
      "Graphic design",
      "Product photography",
      "Visual storytelling",
    ],
  },
];

export const tools = [
  "Photoshop",
  "Illustrator",
  "InDesign",
  "Canva",
  "Premiere Pro",
  "After Effects (basic)",
  "Google Workspace",
];

export const signature = {
  title: "The intersection of creative & performance.",
  line: "Great creative earns attention. Great marketing turns it into action.",
  creative: ["Storytelling", "Videography", "Editing", "Design"],
  performance: ["Audience", "Distribution", "Testing", "Analytics"],
};

export type TimelineEntry = {
  kind: "experience" | "education";
  title: string;
  org: string;
  period: string;
  note?: string;
  points?: string[];
};

export const timeline: TimelineEntry[] = [
  {
    kind: "experience",
    title: "Digital Marketing Instructor & Creative Strategist",
    org: "Learning Education Hub",
    period: "Sep 2025 — Jul 2026",
    note: "Part-time, concurrent with Master's",
    points: [
      "Ran and applied paid social campaigns end to end",
      "Built content calendars and mood boards",
      "Google Business Profile optimization",
      "Designed graphic and video assets in Photoshop, Illustrator and Premiere Pro",
      "Communicated marketing concepts to student groups",
    ],
  },
  {
    kind: "education",
    title: "M.Sc. Multimedia",
    org: "Makhanlal Chaturvedi National University of Journalism and Communication, Bhopal",
    period: "Jul 2025 — Jul 2026",
  },
  {
    kind: "education",
    title: "B.Sc. Multimedia (Hons.)",
    org: "Makhanlal Chaturvedi National University of Journalism and Communication, Bhopal",
    period: "Jul 2021 — Jul 2025",
  },
  {
    kind: "experience",
    title: "Graphic Design & Social Media Marketing Intern",
    org: "Diffusion Marketing Solutions",
    period: "Feb 2024 — Mar 2024",
    points: [
      "Supported graphic design and social media deliverables for client accounts",
      "Contributed to visual content creation and social execution",
    ],
  },
];

export type Certification = {
  title: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
};

export const certifications: Certification[] = [
  {
    title: "Fundamentals of Digital Marketing",
    issuer: "Google Digital Garage",
    year: "2024",
  },
];

export const contact = {
  title: "Have an idea worth telling?",
  line: "Let's create something people remember.",
};
