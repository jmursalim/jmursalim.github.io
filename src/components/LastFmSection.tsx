import { useState } from 'react';
import { ExternalLink, RefreshCw, Disc, Radio } from 'lucide-react';
import type { LastFmData } from '../hooks/useLastFm';

interface LastFmSectionProps {
    data: LastFmData;
    isMobile?: boolean;
}

export default function LastFmSection({ data, isMobile = false }: LastFmSectionProps) {
    const { currentTrack, recentTracks, totalScrobbles, isLoading, error, refresh, isNowPlaying } = data;
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleManualRefresh = async () => {
        setIsRefreshing(true);
        await refresh();
        setTimeout(() => setIsRefreshing(false), 500);
    };

    return (
        <div className="space-y-10 w-full">
            {/* Live Now Playing / Latest Track Feature Card */}
            <div className="space-y-4">
                <div className="flex items-center justify-between pt-4 pb-2 border-b border-foreground/15">
                    <h4 className="text-xl md:text-2xl font-light tracking-tight text-foreground uppercase">
                        {isNowPlaying ? 'NOW PLAYING' : 'LATEST PLAYED'}
                    </h4>
                    <button
                        onClick={handleManualRefresh}
                        disabled={isRefreshing}
                        className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors p-1"
                        title="Refresh Last.fm"
                        aria-label="Refresh music scrobbles"
                    >
                        <RefreshCw size={12} className={isRefreshing ? 'animate-spin' : ''} />
                        <span className="hidden sm:inline">REFRESH</span>
                    </button>
                </div>

                {isLoading && !currentTrack ? (
                    <div className="p-6 border border-foreground/10 rounded-sm bg-muted/10 animate-pulse flex items-center gap-4">
                        <div className="w-24 h-24 bg-foreground/10 rounded-sm shrink-0" />
                        <div className="space-y-2 flex-1">
                            <div className="h-4 bg-foreground/10 rounded w-1/3" />
                            <div className="h-6 bg-foreground/15 rounded w-2/3" />
                            <div className="h-4 bg-foreground/10 rounded w-1/2" />
                        </div>
                    </div>
                ) : error && !currentTrack ? (
                    <div className="p-6 border border-foreground/10 rounded-sm bg-muted/10 text-center space-y-2">
                        <p className="text-sm font-mono text-muted-foreground">COULD NOT CONNECT TO LAST.FM</p>
                        <a
                            href="https://www.last.fm/user/jmursalim"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm underline text-foreground"
                        >
                            View Last.fm Profile directly <ExternalLink size={14} />
                        </a>
                    </div>
                ) : currentTrack ? (
                    <div className="p-5 md:p-6 border border-foreground/10 rounded-sm bg-background/50 hover:border-foreground/25 transition-all duration-300">
                        {/* Live indicator header */}
                        <div className="flex items-center justify-between mb-4">
                            {isNowPlaying ? (
                                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-500 dark:text-emerald-400">
                                    <span className="relative flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                                    </span>
                                    <span className="font-semibold">NOW PLAYING</span>
                                    {/* Equalizer animation */}
                                    <div className="flex items-end gap-0.5 h-3 ml-1.5" aria-hidden="true">
                                        <span className="w-0.5 bg-emerald-500 rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-full"></span>
                                        <span className="w-0.5 bg-emerald-500 rounded-full animate-[pulse_0.6s_ease-in-out_infinite_0.2s] h-2"></span>
                                        <span className="w-0.5 bg-emerald-500 rounded-full animate-[pulse_1.0s_ease-in-out_infinite_0.4s] h-3"></span>
                                        <span className="w-0.5 bg-emerald-500 rounded-full animate-[pulse_0.7s_ease-in-out_infinite_0.1s] h-1.5"></span>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                                    <Radio size={13} />
                                    <span>LAST SCROBBLED • {currentTrack.timeAgo}</span>
                                </div>
                            )}

                            {totalScrobbles && (
                                <span className="text-xs font-mono text-muted-foreground hidden sm:inline">
                                    {totalScrobbles} TOTAL SCROBBLES
                                </span>
                            )}
                        </div>

                        {/* Track Info Card */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                            {/* Album Artwork */}
                            <a
                                href={currentTrack.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative block w-28 h-28 sm:w-32 sm:h-32 shrink-0 rounded-sm overflow-hidden border border-foreground/15 shadow-sm"
                            >
                                {currentTrack.image ? (
                                    <img
                                        src={currentTrack.image}
                                        alt={`${currentTrack.album || currentTrack.name} artwork`}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-muted/30 flex items-center justify-center">
                                        <Disc size={36} className="text-muted-foreground animate-spin-slow" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <ExternalLink size={20} className="text-white" />
                                </div>
                            </a>

                            {/* Track Details */}
                            <div className="space-y-1.5 min-w-0 flex-1">
                                <a
                                    href={currentTrack.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-1.5"
                                >
                                    <h3 className="text-xl sm:text-2xl font-light text-foreground group-hover:underline underline-offset-4 decoration-1 truncate">
                                        {currentTrack.name}
                                    </h3>
                                    <ExternalLink size={14} className="text-muted-foreground opacity-60 group-hover:opacity-100 shrink-0" />
                                </a>

                                <p className="text-base sm:text-lg font-light text-foreground/85 truncate">
                                    {currentTrack.artist}
                                </p>

                                {currentTrack.album && (
                                    <p className="text-xs sm:text-sm font-mono text-muted-foreground uppercase tracking-wider truncate">
                                        {currentTrack.album}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>

            {/* Recent Scrobbles Grid - Styled identically to the Media Section */}
            {recentTracks.length > 0 && (
                <div className="space-y-4">
                    <h4 className="text-xl md:text-2xl font-light tracking-tight text-foreground uppercase pt-4 pb-2 border-b border-foreground/15">
                        RECENT SCROBBLES
                    </h4>

                    <p className={`${isMobile ? 'text-base font-light' : 'text-lg md:text-xl font-extralight'} leading-relaxed text-foreground font-inter`}>
                        A live record of what I've been listening to recently, automatically synced from Last.fm.
                    </p>

                    <div className="my-6">
                        <div className="grid gap-2.5 sm:gap-4 grid-cols-3">
                            {recentTracks.slice(0, 6).map((track, idx) => (
                                <a
                                    key={`${track.name}-${idx}`}
                                    href={track.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex flex-col gap-1.5 focus:outline-none min-w-0"
                                >
                                    {/* Album Cover matching MediaItem presentation */}
                                    <div className="aspect-square w-full overflow-hidden border border-foreground/10 rounded-sm bg-muted/20 relative">
                                        {track.image ? (
                                            <img
                                                src={track.image}
                                                alt={`${track.name} by ${track.artist}`}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center bg-muted/40 p-2 sm:p-4 text-center">
                                                <Disc size={24} className="text-muted-foreground/60 mb-1 sm:mb-2 sm:w-8 sm:h-8" />
                                                <span className="text-[10px] sm:text-xs font-mono text-muted-foreground">NO ARTWORK</span>
                                            </div>
                                        )}
                                        <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 p-1 sm:p-1.5 bg-background/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ExternalLink size={12} className="text-foreground" />
                                        </div>
                                    </div>

                                    {/* Caption styling matching MediaItem captions */}
                                    <div className="space-y-0.5 min-w-0">
                                        <p
                                            className="text-xs sm:text-sm font-medium text-foreground truncate group-hover:underline underline-offset-2"
                                            title={track.name}
                                        >
                                            {track.name}
                                        </p>
                                        <p
                                            className="text-[11px] sm:text-xs text-foreground/80 truncate"
                                            title={track.artist}
                                        >
                                            {track.artist}
                                        </p>
                                        <p
                                            className="text-[10px] sm:text-xs font-mono text-muted-foreground uppercase tracking-wider truncate"
                                            title={track.album ? `${track.timeAgo} • ${track.album}` : track.timeAgo}
                                        >
                                            {track.timeAgo}
                                            {track.album ? ` • ${track.album}` : ''}
                                        </p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
}
