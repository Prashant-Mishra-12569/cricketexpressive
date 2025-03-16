
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

const DUMMY_MATCHES: Match[] = [
  {
    id: "m1",
    type: "WPL",
    status: "RESULT",
    venue: "Brabourne",
    series: "Women's Premier League",
    result: "MI Women won by 8 runs",
    teams: {
      home: { team: "MI-W", score: "149/7" },
      away: { team: "DC-W", score: "141/9" }
    }
  },
  {
    id: "m2",
    type: "T20I",
    status: "RESULT",
    venue: "Christchurch",
    series: "New Zealand vs Pakistan",
    result: "New Zealand won by 9 wickets (with 59 balls remaining)",
    teams: {
      home: { team: "PAK", score: "91" },
      away: { team: "NZ", score: "92/1" }
    }
  },
  {
    id: "m3",
    type: "T20I",
    status: "RESULT",
    venue: "Christchurch",
    series: "New Zealand vs Sri Lanka Women",
    result: "NZ Women won by 7 wickets (with 9 balls remaining)",
    teams: {
      home: { team: "SL-W", score: "113/7" },
      away: { team: "NZ-W", score: "117/3" }
    }
  },
  {
    id: "m4",
    type: "PM Cup",
    status: "RESULT",
    venue: "Siddharthanagar",
    series: "Prime Minister Cup",
    result: "Armed Police won by 5 wickets (with 64 balls remaining)",
    teams: {
      home: { team: "KAR", score: "189" },
      away: { team: "APFC", score: "193/5" }
    }
  }
];

const DUMMY_NEWS: NewsItem[] = [
  {
    id: "n1",
    title: "A Harmanpreet masterpiece brings second title to Mumbai",
    summary: "MI Women won by 8 runs in the WPL final against DC",
    imageUrl: "/lovable-uploads/5ee4703b-101e-49a7-8644-197841f3897c.png",
    author: "ESPNcricinfo Staff",
    publishedAt: "2 hrs ago",
    category: "WPL"
  },
  {
    id: "n2",
    title: "Kohli bats for families' presence on India's tours",
    summary: "Kohli stressed the importance of having family support during long tours",
    imageUrl: "/lovable-uploads/918272bd-174f-4673-8c35-ca6fea65ba52.png",
    author: "Shashank Kishore",
    publishedAt: "14 hrs ago",
    category: "News"
  },
  {
    id: "n3",
    title: "KKR trust in continuity in bid to defend 2024 title",
    summary: "The franchise has retained its core players for the upcoming season",
    imageUrl: "/lovable-uploads/40109b02-0ca3-472b-9dbd-92637a446eb1.png",
    author: "Sreshth Shah",
    publishedAt: "23 hrs ago",
    category: "IPL"
  },
  {
    id: "n4",
    title: "Kohli: Experienced 'intense disappointment' after Aus tour",
    summary: "The former India captain opened up about the challenging tour",
    imageUrl: "/lovable-uploads/74a318dd-87c9-49b1-818d-b7e22533cd11.png",
    author: "Shashank Kishore",
    publishedAt: "19 hrs ago",
    category: "News"
  },
  {
    id: "n5",
    title: "Pakistan 91 all out as post Babar-Rizwan era begins with a whimper",
    summary: "New Zealand dominated the first T20I with a comprehensive victory",
    imageUrl: "/lovable-uploads/5e53f18f-c6fa-4c89-b9e3-efe4bc72c9ea.png",
    author: "Abhimanyu Bose",
    publishedAt: "5 hrs ago",
    category: "News"
  },
  {
    id: "n6",
    title: "NZ vs SL: Bates, Illing, Halliday star to level the series at 1-1",
    summary: "New Zealand women bounced back in the second T20I",
    imageUrl: "/lovable-uploads/5e53f18f-c6fa-4c89-b9e3-efe4bc72c9ea.png",
    author: "ESPNcricinfo Staff",
    publishedAt: "7 hrs ago",
    category: "Women's Cricket"
  }
];

export const fetchLiveMatches = async (): Promise<Match[]> => {
  // In a real implementation, this would fetch from an API
  // For now, we'll return dummy data
  try {
    return DUMMY_MATCHES;
  } catch (error) {
    console.error("Error fetching live matches:", error);
    toast.error("Failed to fetch live matches");
    return [];
  }
};

export const fetchTopStories = async (): Promise<NewsItem[]> => {
  // In a real implementation, this would fetch from an API
  // For now, we'll return dummy data
  try {
    return DUMMY_NEWS;
  } catch (error) {
    console.error("Error fetching top stories:", error);
    toast.error("Failed to fetch top stories");
    return [];
  }
};

export const fetchMatchById = async (id: string): Promise<Match | null> => {
  // In a real implementation, this would fetch from an API
  // For now, we'll search our dummy data
  try {
    const match = DUMMY_MATCHES.find(m => m.id === id);
    return match || null;
  } catch (error) {
    console.error(`Error fetching match with id ${id}:`, error);
    toast.error("Failed to fetch match details");
    return null;
  }
};

// This would connect to WordPress API in a real implementation
export const fetchWordPressContent = async (): Promise<any> => {
  // Simulating WordPress API connection
  return {
    success: true,
    message: "Connected to WordPress API successfully"
  };
};
