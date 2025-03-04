const { Pool } = require("pg");

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getSongsFromPlaylist(playlistId) {
    const query = {
      text: `SELECT playlists.name, songs.id, songs.title, songs.performer 
            FROM playlists
            JOIN playlist_songs ON playlists.id = playlist_songs.playlist_id
            JOIN songs ON songs.id = playlist_songs.song_id
            WHERE playlists.id = $1`,
      values: [playlistId],
    };

    const result = await this._pool.query(query);

    return {
      name: result.rows[0].name,
      songs: result.rows.map((row) => ({
        id: row.id,
        title: row.title,
        performer: row.performer,
      })),
    };
  }
}

module.exports = PlaylistsService;
