import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand
} from "@aws-sdk/lib-dynamodb";


const client = new DynamoDBClient({
    endpoint: "https://8000-mukulphougat-gpbasic-jhjmpsxpirr.ws-us104.gitpod.io"
});
const dynamo = DynamoDBDocumentClient.from(client);
const tableName="policy"
export const createPolicy=async(event,context)=>{
    try{
        const body=JSON.parse(event.body)
        const policy=await dynamo.send(
            new PutCommand({
                TableName: tableName,
                Item: {
                    id: parseInt(body.id),
                    policyNumber: parseInt(body.policyNumber),
                    name: body.name,
                    address: body.address,
                    phone: parseInt(body.phone),
                    email: body.email
                }
            })
        )
        const getPolicy=await dynamo.send(
            new GetCommand({
                TableName: tableName,
                Key: {
                    id: body.id
                }
            })
        )
        console.log(JSON.stringify(event.body));
        return {
            // headers: {
            //     "Access-Control-Allow-Headers" : "*",
            //     "Access-Control-Allow-Origin": "*", // Allow from anywhere 
            //     "Access-Control-Allow-Methods": "POST" // Allow only GET request 
            // },
            statusCode: 200,
            body: JSON.stringify(event.body)
        }
    } catch(err) {
        console.log(err);
        return {
            statusCode: 500,
            body: err
        }
    }
}