/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
  GetCommand,
} from "@aws-sdk/lib-dynamodb";
// ScanCommand,
  // PutCommand,
//   GetCommand,
//   DeleteCommand,

const client = new DynamoDBClient({
  endpoint: "https://8000-mukulphougat-gpbasic-jhjmpsxpirr.ws-us104.gitpod.io"
});

const dynamo = DynamoDBDocumentClient.from(client);
const tableName="policy"
export const lambdaHandler = async (event, context) => {
    
    try {
        // const user=await dynamo.send(
        //     new PutCommand({
        //         TableName: tableName,
        //         Item: {
        //           id: event.id,
        //           name: event.name,
        //           address: event.address,
        //           phone: event.phone,
        //           email: event.name
        //         },
        //     })
        //   );
        const user=await dynamo.send(
            new ScanCommand({
                TableName: tableName,
            })
          );
        return {
          headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "http://localhost:3000", // Allow from anywhere 
            "Access-Control-Allow-Methods": "GET" // Allow only GET request 
          },
          statusCode: 200,
          body: JSON.stringify(user.Items),
        };
      } catch (error) {
        console.error('Error scanning table:', error);
        return {
          statusCode: 500,
          body: JSON.stringify({ message: 'Internal Server Error' }),
        };
    }
};
