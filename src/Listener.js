class Listener {
  constructor(playlistsService, mailSender) {
    this._playlistsService = playlistsService;
    this._mailSender = mailSender;
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(
        message.content.toString()
      );

      const { name, songs } = await this._playlistsService.getSongsFromPlaylist(
        playlistId
      );

      const result = await this._mailSender.sendEmail(targetEmail, {
        playlist: {
          id: playlistId,
          name: name,
          songs: songs,
        },
      });

      console.log("Email terkirim ke:", targetEmail);
      console.log(result);
    } catch (error) {
      console.error("Gagal memproses pesan:", error);
    }
  }
}

module.exports = Listener;
