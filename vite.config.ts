import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      {
        name: 'lastfm-dev-proxy',
        apply: 'serve', // Only active during local `npm run dev`
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url && req.url.startsWith('/lastfm.json')) {
              const apiKey = env.LASTFM_API_KEY || env.VITE_LASTFM_API_KEY;
              const username = env.LASTFM_USERNAME || env.VITE_LASTFM_USERNAME || 'jmursalim';

              if (apiKey) {
                try {
                  const lastFmRes = await fetch(
                    `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${encodeURIComponent(
                      username
                    )}&api_key=${apiKey}&format=json&limit=10`
                  );

                  if (lastFmRes.ok) {
                    const data = (await lastFmRes.json()) as any;
                    const rawTracks = data?.recenttracks?.track;
                    const trackList = Array.isArray(rawTracks)
                      ? rawTracks
                      : rawTracks
                      ? [rawTracks]
                      : [];

                    const parsedTracks = trackList.map((t: any) => {
                      const nowPlaying = t['@attr']?.nowplaying === 'true';
                      const uts = t.date?.uts ? parseInt(t.date.uts, 10) : undefined;
                      const image =
                        t.image?.find((img: any) => img.size === 'extralarge')?.['#text'] ||
                        t.image?.find((img: any) => img.size === 'large')?.['#text'] ||
                        t.image?.[3]?.['#text'] ||
                        t.image?.[2]?.['#text'] ||
                        '';

                      return {
                        name: t.name || 'Unknown Track',
                        artist: t.artist?.['#text'] || t.artist?.name || 'Unknown Artist',
                        album: t.album?.['#text'] || '',
                        image,
                        url: t.url || `https://www.last.fm/user/${username}`,
                        nowPlaying,
                        timestamp: uts,
                      };
                    });

                    const currentTrack = parsedTracks.length > 0 ? parsedTracks[0] : null;
                    const recentTracks = parsedTracks.length > 1 ? parsedTracks.slice(1) : [];
                    const totalScrobbles = data?.recenttracks?.['@attr']?.total
                      ? Number(data.recenttracks['@attr'].total).toLocaleString()
                      : '';

                    res.setHeader('Content-Type', 'application/json');
                    res.setHeader('Cache-Control', 'no-store');
                    res.end(
                      JSON.stringify({
                        currentTrack,
                        recentTracks,
                        totalScrobbles,
                        isNowPlaying: !!currentTrack?.nowPlaying,
                        updatedAt: new Date().toISOString(),
                      })
                    );
                    return;
                  }
                } catch (e) {
                  console.error('[vite] Error fetching live Last.fm data:', e);
                }
              }
            }
            next();
          });
        },
      },
    ],
  };
});
