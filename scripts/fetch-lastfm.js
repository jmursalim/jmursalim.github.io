import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Attempt to load .env.local or .env for local development
if (typeof process.loadEnvFile === 'function') {
    for (const envFile of ['.env.local', '.env']) {
        try {
            process.loadEnvFile(path.resolve(__dirname, '..', envFile));
            break;
        } catch {
            // Ignore missing files
        }
    }
}

const API_KEY = process.env.LASTFM_API_KEY || process.env.VITE_LASTFM_API_KEY;
const USERNAME = process.env.LASTFM_USERNAME || process.env.VITE_LASTFM_USERNAME || 'jmursalim';

async function fetchLastFm() {
    const outputPath = path.resolve(__dirname, '../public/lastfm.json');

    if (!API_KEY) {
        console.warn('[fetch-lastfm] No LASTFM_API_KEY environment variable provided.');
        try {
            await fs.access(outputPath);
            console.log('[fetch-lastfm] Existing public/lastfm.json found. Preserving current data.');
            return;
        } catch {
            console.warn('[fetch-lastfm] No existing public/lastfm.json found. Creating placeholder.');
            const placeholder = {
                currentTrack: null,
                recentTracks: [],
                totalScrobbles: '',
                isNowPlaying: false,
                updatedAt: new Date().toISOString()
            };
            await fs.writeFile(outputPath, JSON.stringify(placeholder, null, 2), 'utf-8');
            return;
        }
    }

    try {
        console.log(`[fetch-lastfm] Fetching latest scrobbles for user "${USERNAME}"...`);
        const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${encodeURIComponent(
            USERNAME
        )}&api_key=${API_KEY}&format=json&limit=10`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Last.fm API returned HTTP status ${response.status}`);
        }

        const data = await response.json();
        if (data.error) {
            throw new Error(data.message || 'Error received from Last.fm API');
        }

        const rawTracks = data?.recenttracks?.track;
        const trackList = Array.isArray(rawTracks)
            ? rawTracks
            : rawTracks
            ? [rawTracks]
            : [];

        const parsedTracks = trackList.map((t) => {
            const nowPlaying = t['@attr']?.nowplaying === 'true';
            const uts = t.date?.uts ? parseInt(t.date.uts, 10) : undefined;

            const image =
                t.image?.find((img) => img.size === 'extralarge')?.['#text'] ||
                t.image?.find((img) => img.size === 'large')?.['#text'] ||
                t.image?.[3]?.['#text'] ||
                t.image?.[2]?.['#text'] ||
                '';

            return {
                name: t.name || 'Unknown Track',
                artist: t.artist?.['#text'] || t.artist?.name || 'Unknown Artist',
                album: t.album?.['#text'] || '',
                image,
                url: t.url || `https://www.last.fm/user/${USERNAME}`,
                nowPlaying,
                timestamp: uts,
            };
        });

        const currentTrack = parsedTracks.length > 0 ? parsedTracks[0] : null;
        const recentTracks = parsedTracks.length > 1 ? parsedTracks.slice(1) : [];
        const totalScrobbles = data?.recenttracks?.['@attr']?.total
            ? Number(data.recenttracks['@attr'].total).toLocaleString()
            : '';

        const payload = {
            currentTrack,
            recentTracks,
            totalScrobbles,
            isNowPlaying: !!currentTrack?.nowPlaying,
            updatedAt: new Date().toISOString(),
        };

        await fs.mkdir(path.dirname(outputPath), { recursive: true });
        await fs.writeFile(outputPath, JSON.stringify(payload, null, 2), 'utf-8');
        console.log(`[fetch-lastfm] Successfully generated public/lastfm.json with ${parsedTracks.length} tracks.`);
    } catch (err) {
        console.error('[fetch-lastfm] Failed to fetch Last.fm data:', err.message);
        try {
            await fs.access(outputPath);
            console.log('[fetch-lastfm] Keeping existing public/lastfm.json fallback.');
        } catch {
            const emptyPayload = {
                currentTrack: null,
                recentTracks: [],
                totalScrobbles: '',
                isNowPlaying: false,
                updatedAt: new Date().toISOString(),
            };
            await fs.writeFile(outputPath, JSON.stringify(emptyPayload, null, 2), 'utf-8');
        }
    }
}

fetchLastFm();
