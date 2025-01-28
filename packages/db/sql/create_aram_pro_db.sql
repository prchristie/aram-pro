-- Create the seen_games table
CREATE TABLE seen_games (
    match_id TEXT PRIMARY KEY
);

-- Create the base_players table
CREATE TABLE base_players (
    puuid TEXT PRIMARY KEY,
    region TEXT NOT NULL CHECK (region IN ('Americas', 'Asia', 'SEA', 'Europe'))
);
