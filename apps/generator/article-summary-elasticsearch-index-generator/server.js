const { Client } = require("@elastic/elasticsearch");

let endpoint = "http://localhost:9200";
let indexName = "article-summaries";

async function CreateAsync() {
  try {
    let client = new Client({ node: endpoint });

    await client.indices.create({
      index: indexName
    });
  } catch (err) {
    console.log(err);
  }
}

CreateAsync();
