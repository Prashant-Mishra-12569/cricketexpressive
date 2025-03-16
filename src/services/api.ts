import { toast } from "sonner";

export interface TeamScore {
  team: string;
  score: string;
  overs?: string;
}

export interface Match {
  id: string;
  type: string;
  status: string;
  venue: string;
  series: string;
  result?: string;
  teams: {
    home: TeamScore;
    away: TeamScore;
  };
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  author: string;
  publishedAt: string;
  category: string;
  content?: string;
}

// Cricket API configuration
const CRICKET_API_KEY = "1008d947-ac1d-4a69-a135-897686252434";
const CRICKET_API_BASE_URL = "https://api.cricapi.com/v1";

// Fallback dummy data for cricket matches representing current matches for 2025 season
const DUMMY_MATCHES: Match[] = [
  {
    id: "m1",
    type: "ODI",
    status: "RESULT",
    venue: "Wanderers Cricket Ground, Windhoek",
    series: "Namibia vs Canada ODI Series 2025",
    result: "Namibia won by 12 runs (2nd innings reduced to 43 ovs due to rain, DLS target 167)",
    teams: {
      home: { team: "Canada", score: "186/10" },
      away: { team: "Namibia", score: "154/10" }
    }
  },
  {
    id: "m2",
    type: "T20",
    status: "RESULT",
    venue: "Bayuemas Oval, Kuala Lumpur",
    series: "Malaysia vs Hong Kong T20 Series 2025",
    result: "Hong Kong won by 8 wkts",
    teams: {
      home: { team: "Malaysia", score: "94/10" },
      away: { team: "Hong Kong", score: "95/2" }
    }
  },
  {
    id: "m3",
    type: "T20",
    status: "RESULT",
    venue: "Miraj International Cricket Stadium, Udaipur",
    series: "Sri Lanka vs Afghanistan T20 Series 2025",
    result: "Sri Lankan Lions won by 26 runs",
    teams: {
      home: { team: "Sri Lankan Lions", score: "230/3" },
      away: { team: "Afghanistan Pathans", score: "204/7" }
    }
  },
  {
    id: "m4",
    type: "ODI",
    status: "No result - due to rain",
    venue: "Gaddafi Stadium, Lahore",
    series: "Australia vs Afghanistan ODI Series 2025",
    teams: {
      home: { team: "Afghanistan", score: "273/10" },
      away: { team: "Australia", score: "109/3" }
    }
  }
];

const DUMMY_NEWS: NewsItem[] = [
  {
    id: "n1",
    title: "Warner announces retirement from all forms of cricket after IPL 2025",
    summary: "Australian legend David Warner will hang up his boots after the upcoming IPL season, ending a glittering career spanning two decades",
    imageUrl: "/lovable-uploads/5ee4703b-101e-49a7-8644-197841f3897c.png",
    author: "CricketExpress Staff",
    publishedAt: "2 hrs ago",
    category: "IPL"
  },
  {
    id: "n2",
    title: "Indian captain backs youngsters ahead of Champions Trophy",
    summary: "The Indian captain stressed the importance of nurturing new talent for the upcoming ICC tournament and believes in their potential",
    imageUrl: "/lovable-uploads/918272bd-174f-4673-8c35-ca6fea65ba52.png",
    author: "Rajesh Kumar",
    publishedAt: "14 hrs ago",
    category: "News"
  },
  {
    id: "n3",
    title: "Chennai Super Kings trust in continuity for IPL 2025",
    summary: "The franchise has retained its core players for the upcoming season, focusing on team chemistry and proven performers",
    imageUrl: "/lovable-uploads/40109b02-0ca3-472b-9dbd-92637a446eb1.png",
    author: "Vikram Singh",
    publishedAt: "23 hrs ago",
    category: "IPL"
  },
  {
    id: "n4",
    title: "Starc: 'Looking forward to bowling in Indian conditions again'",
    summary: "The Australian pacer expressed excitement about the upcoming tour of India and is preparing specially for subcontinental pitches",
    imageUrl: "/lovable-uploads/74a318dd-87c9-49b1-818d-b7e22533cd11.png",
    author: "Andrew Mitchell",
    publishedAt: "19 hrs ago",
    category: "News"
  },
  {
    id: "n5",
    title: "Pakistan announces squad for Champions Trophy 2025",
    summary: "New faces included as Pakistan aims for their second Champions Trophy title with a mix of experience and young talent",
    imageUrl: "/lovable-uploads/5e53f18f-c6fa-4c89-b9e3-efe4bc72c9ea.png",
    author: "Hassan Khan",
    publishedAt: "5 hrs ago",
    category: "News"
  },
  {
    id: "n6",
    title: "Women's World Cup 2025: Full schedule announced",
    summary: "ICC releases the complete fixtures for the upcoming Women's World Cup with Australia looking to defend their title",
    imageUrl: "/lovable-uploads/5ee4703b-101e-49a7-8644-197841f3897c.png",
    author: "CricketExpress Staff",
    publishedAt: "7 hrs ago",
    category: "Women's Cricket"
  },
  {
    id: "n7",
    title: "IPL 2025 auction: Top 5 most expensive players",
    summary: "A look at the biggest buys from the recent IPL auction as franchises splashed the cash on star performers",
    imageUrl: "/lovable-uploads/e7d840d2-b6d0-459b-a3a3-5bd73dba393e.png",
    author: "Rahul Desai",
    publishedAt: "3 hrs ago",
    category: "IPL"
  },
  {
    id: "n8",
    title: "England's strategic shift in white-ball approach under new coach",
    summary: "England's new white-ball coach brings fresh perspectives as they prepare for the upcoming ICC tournaments",
    imageUrl: "/lovable-uploads/40109b02-0ca3-472b-9dbd-92637a446eb1.png",
    author: "James Anderson",
    publishedAt: "10 hrs ago",
    category: "News"
  },
  {
    id: "n9",
    title: "New Zealand's tour of India: Complete fixtures and squad announced",
    summary: "The Black Caps prepare for a challenging tour with three Tests and five T20Is against a strong Indian side",
    imageUrl: "/lovable-uploads/918272bd-174f-4673-8c35-ca6fea65ba52.png",
    author: "Michael Clarke",
    publishedAt: "1 day ago",
    category: "News"
  },
  {
    id: "n10",
    title: "ICC introduces new playing conditions for T20 World Cup 2026",
    summary: "Several rule changes have been announced for the next T20 World Cup to make the game more exciting and balanced",
    imageUrl: "/lovable-uploads/74a318dd-87c9-49b1-818d-b7e22533cd11.png",
    author: "CricketExpress Staff",
    publishedAt: "8 hrs ago",
    category: "News"
  },
  {
    id: "n11",
    title: "Harmanpreet Kaur breaks Virat Kohli's T20I record",
    summary: "Indian women's captain surpasses Kohli's record for most T20I half-centuries in a calendar year",
    imageUrl: "/lovable-uploads/5e53f18f-c6fa-4c89-b9e3-efe4bc72c9ea.png",
    author: "Sharda Ugra",
    publishedAt: "12 hrs ago",
    category: "Women's Cricket"
  },
  {
    id: "n12",
    title: "South Africa unveils new domestic cricket structure ahead of 2026 season",
    summary: "Cricket South Africa implements a revamped domestic structure to strengthen the national team's talent pipeline",
    imageUrl: "/lovable-uploads/e7d840d2-b6d0-459b-a3a3-5bd73dba393e.png",
    author: "Allan Donald",
    publishedAt: "1 day ago",
    category: "News"
  }
];

export const fetchLiveMatches = async (): Promise<Match[]> => {
  try {
    const response = await fetch(`${CRICKET_API_BASE_URL}/currentMatches?apikey=${CRICKET_API_KEY}&offset=0`);
    const data = await response.json();
    
    if (data.status !== "success") {
      throw new Error(data.message || "Failed to fetch live matches");
    }
    
    // Transform the API response to match our interface
    return data.data.map((match: any) => ({
      id: match.id || String(Math.random()),
      type: match.matchType || match.format || "Unknown",
      status: match.status || "LIVE",
      venue: match.venue || "Unknown Venue",
      series: match.name || match.teamInfo?.[0]?.name || "Cricket Series",
      result: match.status === "completed" ? `${match.teams?.[0]} won` : undefined,
      teams: {
        home: { 
          team: match.teams?.[0] || "Team A", 
          score: match.score?.[0]?.r ? `${match.score[0].r}/${match.score[0].w || 0}` : "0/0"
        },
        away: { 
          team: match.teams?.[1] || "Team B", 
          score: match.score?.[1]?.r ? `${match.score[1].r}/${match.score[1].w || 0}` : "0/0"
        }
      }
    }));
  } catch (error) {
    console.error("Error fetching live matches:", error);
    toast.error("Failed to fetch live matches from API, using fallback data");
    return DUMMY_MATCHES;
  }
};

export const fetchTopStories = async (): Promise<NewsItem[]> => {
  // In a real implementation, this would fetch from a WordPress API
  try {
    // Simulate WordPress API call with 2025 data
    return DUMMY_NEWS;
  } catch (error) {
    console.error("Error fetching top stories:", error);
    toast.error("Failed to fetch top stories");
    return [];
  }
};

export const fetchMatchById = async (id: string): Promise<Match | null> => {
  try {
    const response = await fetch(`${CRICKET_API_BASE_URL}/match_info?apikey=${CRICKET_API_KEY}&id=${id}`);
    const data = await response.json();
    
    if (data.status !== "success") {
      throw new Error(data.message || "Failed to fetch match details");
    }
    
    const match = data.data;
    return {
      id: match.id || id,
      type: match.matchType || match.format || "Unknown",
      status: match.status || "LIVE",
      venue: match.venue || "Unknown Venue",
      series: match.name || match.teamInfo?.[0]?.name || "Cricket Series",
      result: match.status === "completed" ? `${match.teams?.[0]} won` : undefined,
      teams: {
        home: { 
          team: match.teams?.[0] || "Team A", 
          score: match.score?.[0]?.r ? `${match.score[0].r}/${match.score[0].w || 0}` : "0/0"
        },
        away: { 
          team: match.teams?.[1] || "Team B", 
          score: match.score?.[1]?.r ? `${match.score[1].r}/${match.score[1].w || 0}` : "0/0"
        }
      }
    };
  } catch (error) {
    console.error(`Error fetching match with id ${id}:`, error);
    toast.error("Failed to fetch match details, using fallback data");
    const match = DUMMY_MATCHES.find(m => m.id === id);
    return match || null;
  }
};

export const createWordPressPost = async (postData: any): Promise<any> => {
  try {
    // This would send a POST request to the WordPress REST API in a real implementation
    console.log("Creating WordPress post:", postData);
    return {
      success: true,
      message: "Post created successfully",
      postId: Math.floor(Math.random() * 1000)
    };
  } catch (error) {
    console.error("Error creating WordPress post:", error);
    toast.error("Failed to create WordPress post");
    return {
      success: false,
      message: "Failed to create WordPress post"
    };
  }
};

export const fetchBlogPosts = async (category?: string, limit: number = 10): Promise<NewsItem[]> => {
  try {
    // This would be a real WordPress REST API call in production
    console.log(`Fetching blog posts for category: ${category || 'all'}, limit: ${limit}`);
    
    // Filter by category if provided
    let filteredPosts = [...DUMMY_NEWS];
    if (category) {
      filteredPosts = filteredPosts.filter(post => 
        post.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Return limited number of posts
    return filteredPosts.slice(0, limit);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    toast.error("Failed to fetch blog posts");
    return [];
  }
};

export const fetchFeaturedPosts = async (limit: number = 5): Promise<NewsItem[]> => {
  try {
    // This would be a WordPress REST API call with featured flag in production
    console.log(`Fetching featured posts, limit: ${limit}`);
    
    // For the demo, we'll just return some posts as "featured"
    const featuredIds = ["n1", "n3", "n5", "n7", "n11"];
    const featuredPosts = DUMMY_NEWS.filter(post => featuredIds.includes(post.id));
    
    return featuredPosts.slice(0, limit);
  } catch (error) {
    console.error("Error fetching featured posts:", error);
    toast.error("Failed to fetch featured posts");
    return [];
  }
};

export const fetchPostBySlug = async (slug: string): Promise<NewsItem | null> => {
  try {
    // This would be a WordPress REST API call by slug in production
    console.log(`Fetching post by slug: ${slug}`);
    
    // For the demo, we'll treat the ID as slug
    const post = DUMMY_NEWS.find(p => p.id === slug);
    
    return post || null;
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    toast.error("Failed to fetch post details");
    return null;
  }
};
