const amqp = require("amqplib");
const process = require("process");
const PlaylistsService = require("./PlaylistsService");
const MailSender = require("./MailSender");
const Listener = require("./Listener");

const init = async () => {
  const playlistsService = new PlaylistsService();
  const mailSender = new MailSender();
  const listener = new Listener(playlistsService, mailSender);

  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
  const channel = await connection.createChannel();

  await channel.assertQueue("export:playlists", { durable: true });
  channel.consume("export:playlists", (message) => listener.listen(message), {
    noAck: true,
  });

  console.log("Consumer berjalan...");
};

init();
