class Listener {
  constructor(playlistsService, mailSender) {
    this._playlistsServer = playlistsService;
    this._mailsender = mailSender;
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(
        message.content.toString()
      );
      const songs = await this._playlistsServer.getSongsFromPlaylist(
        playlistId
      );

      await this._mailsender.sendEmail(targetEmail, {
        playlist: { id: playlistId, songs },
      });

      console.log("Email terkirim ke:", targetEmail);
    } catch (error) {
      console.error("Gagal memproses pesan:", error);
    }
  }
}

module.exports = Listener;
