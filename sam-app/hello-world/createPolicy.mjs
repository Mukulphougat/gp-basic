import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand
} from "@aws-sdk/lib-dynamodb";
import { Logger } from '@aws-lambda-powertools/logger';
const logger = new Logger();

const client = new DynamoDBClient({
    endpoint: "https://8000-mukulphougat-gpbasic-jhjmpsxpirr.ws-us105.gitpod.io"
});
const dynamo = DynamoDBDocumentClient.from(client);
const tableName="policy"
export const createPolicy=async(event,context)=>{
    try{
        const body=JSON.parse(event.body)
        logger.info("THIS IS A SIMPLE LOG: "+JSON.stringify(body));
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
        // const getPolicy=await dynamo.send(
        //     new GetCommand({
        //         TableName: tableName,
        //         Key: {
        //             id: body.id
        //         }
        //     })
        // )
        // console.log(JSON.stringify(policy));
        // console.log(JSON.stringify(event.body));
        return {
            headers: {
                "Access-Control-Allow-Headers" : "*",
                "Access-Control-Allow-Origin": "*", // Allow from anywhere 
                "Access-Control-Allow-Methods": "POST" // Allow only GET request 
            },
            statusCode: 200,
            body: JSON.stringify(body)
        }
    } catch(err) {
        console.log(err);
        return {
            statusCode: 500,
            body: err
        }
    }
}