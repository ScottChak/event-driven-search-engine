let uuid = require("uuid/v1");
let moment = require("moment");
let amqp = require("amqplib");

let endpoint = {
  hostname: "localhost",
  port: 5672,
  protocol: "amqp",
  username: "user",
  password: "user"
};
let queueName = "article-summaries";
let connection = undefined;
let channel = undefined;

let articleSummaries = [
  {
    id: uuid(),
    creationUtcDate: moment.utc(),
    modificationUtcDate: moment.utc(),
    author: "Fake Author",
    title: "Fake Article",
    publicationUtcDate: moment.utc(),
    description: "Does not actually exist"
  },
  {
    id: uuid(),
    creationUtcDate: moment.utc(),
    modificationUtcDate: moment.utc(),
    author: "M.D. Boyer",
    title: "Machine learning speeds modeling of experiments aimed at capturing fusion energy on Earth",
    publicationUtcDate: moment("2019-05-17T10:00:00Z"),
    description:
      "Machine learning can help bring to Earth the clean fusion energy that lights the sun and stars. Researchers are using this form of artificial intelligence to create a model for rapid control of plasma -- the state of matter composed of free electrons and atomic nuclei, or ions -- that fuels fusion reactions."
  }
];

async function ConnectAsync() {
  connection = await amqp.connect(endpoint);
  channel = await connection.createChannel();
  await channel.assertQueue(queueName, { durable: false });
}

async function SendAsync(articleSummary) {
  try {
    await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(articleSummary)));
  } catch (err) {
    console.log(err);
  }
}

async function CloseAsync() {
  try {
    if (channel !== undefined) {
      await channel.close();
    }
  } finally {
    channel = undefined;
  }

  try {
    if (connection !== undefined) {
      await connection.close();
    }
  } finally {
    connection = undefined;
  }
}

ConnectAsync()
  .then(async function() {
    await Promise.all(
      articleSummaries.map(async function(articleSummary) {
        await SendAsync(articleSummary);
        return;
      })
    );
  })
  .finally(async function() {
    await CloseAsync();
  });
