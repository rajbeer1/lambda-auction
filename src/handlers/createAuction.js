const v4 =require("uuid")
const AWS = require("aws-sdk")

const dynamodb = new AWS.DynamoDB.DocumentClient();

export async function createAuction(event, context) {
  const { title } = JSON.parse(event.body);
  const now = new Date();

  const auction = {
    id: v4(),
    title,
    status: 'OPEN',
    createdAt: now.toISOString(),
  };

  await dynamodb.put({
    TableName: 'AuctionsTable',
    Item: auction,
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify(auction),
  };
}

