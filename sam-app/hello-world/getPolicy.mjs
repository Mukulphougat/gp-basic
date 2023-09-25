import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  ScanCommand
} from "@aws-sdk/lib-dynamodb";


const client = new DynamoDBClient({
    endpoint: "https://8000-mukulphougat-gpbasic-jhjmpsxpirr.ws-us104.gitpod.io"
});
const dynamo = DynamoDBDocumentClient.from(client);
const tableName="policy"
export const getPolicy=async(event,context)=>{
    try{
        // const body=JSON.parse(event)
        // const policy=await dynamo.send(
        //     new PutCommand({
        //         TableName: tableName,
        //         Item: {
        //             id: body.id,
        //             name: body.name,
        //             address: body.address,
        //             phone: body.phone,
        //             email: body.email
        //         }
        //     })
        // )
        const keyForSearch=parseInt(event.pathParameters.policyNumber);
        const getPolicy=await dynamo.send(
            new ScanCommand({
                TableName: tableName
            })
        )
        const itemArr=getPolicy.Items;
        let result=[]
        for( let i = 0 ; i < itemArr.length ; i++ ) {
            if( itemArr[i].policyNumber === keyForSearch ) {
                result.push(itemArr[i]);
            }
        }        
        return {
            headers: {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "http://localhost:3000", // Allow from anywhere 
                "Access-Control-Allow-Methods": "GET" // Allow only GET request 
              },
            statusCode: 200,
            body: JSON.stringify(result)
        }
    } catch(err) {
        console.log(err);
        return {
            statusCode: 500,
            body: err
        }
    }
}