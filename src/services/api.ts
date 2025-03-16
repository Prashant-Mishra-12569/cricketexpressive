
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
    summary: "Australian legend David Warner will hang up his boots after the upcoming IPL season",
    imageUrl: "/lovable-uploads/5ee4703b-101e-49a7-8644-197841f3897c.png",
    author: "CricketExpress Staff",
    publishedAt: "2 hrs ago",
    category: "IPL"
  },
  {
    id: "n2",
    title: "Indian captain backs youngsters ahead of Champions Trophy",
    summary: "The Indian captain stressed the importance of nurturing new talent for the upcoming ICC tournament",
    imageUrl: "/lovable-uploads/918272bd-174f-4673-8c35-ca6fea65ba52.png",
    author: "Rajesh Kumar",
    publishedAt: "14 hrs ago",
    category: "News"
  },
  {
    id: "n3",
    title: "Chennai Super Kings trust in continuity for IPL 2025",
    summary: "The franchise has retained its core players for the upcoming season",
    imageUrl: "/lovable-uploads/40109b02-0ca3-472b-9dbd-92637a446eb1.png",
    author: "Vikram Singh",
    publishedAt: "23 hrs ago",
    category: "IPL"
  },
  {
    id: "n4",
    title: "Starc: 'Looking forward to bowling in Indian conditions again'",
    summary: "The Australian pacer expressed excitement about the upcoming tour of India",
    imageUrl: "/lovable-uploads/74a318dd-87c9-49b1-818d-b7e22533cd11.png",
    author: "Andrew Mitchell",
    publishedAt: "19 hrs ago",
    category: "News"
  },
  {
    id: "n5",
    title: "Pakistan announces squad for Champions Trophy 2025",
    summary: "New faces included as Pakistan aims for their second Champions Trophy title",
    imageUrl: "/lovable-uploads/5e53f18f-c6fa-4c89-b9e3-efe4bc72c9ea.png",
    author: "Hassan Khan",
    publishedAt: "5 hrs ago",
    category: "News"
  },
  {
    id: "n6",
    title: "Women's World Cup 2025: Full schedule announced",
    summary: "ICC releases the complete fixtures for the upcoming Women's World Cup",
    imageUrl: "/lovable-uploads/5e53f18f-c6fa-4c89-b9e3-efe4bc72c9ea.png",
    author: "CricketExpress Staff",
    publishedAt: "7 hrs ago",
    category: "Women's Cricket"
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

// WordPress integration functions
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
