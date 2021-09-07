export interface Highlight {
    title: string;
    competition: string;
    matchViewUrl: string;
    thumbnail: string;
    date: Date;
    videos: Video[];
}

export interface Video {
    title: string;
    embed: string;
}