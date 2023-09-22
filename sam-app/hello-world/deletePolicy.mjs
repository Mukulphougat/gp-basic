
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    DynamoDBDocumentClient,
    DeleteCommand,
    GetCommand
  } from "@aws-sdk/lib-dynamodb";
  
  
  const client = new DynamoDBClient({
    endpoint: "https://8000-mukulphougat-gpbasic-jhjmpsxpirr.ws-us104.gitpod.io"
  });  
  const dynamo = DynamoDBDocumentClient.from(client);
  const tableName="policy"
  export const deletePolicy=async(event,context)=>{
      try{
          const idToBeDeleted=parseInt(event.pathParameters.id)
          const body=JSON.parse(event.body)
          const policy=await dynamo.send(
            new DeleteCommand({
              TableName: tableName,
                Key: {
                  id: idToBeDeleted,
                },
            })
          );
          return {
              statusCode: 200,
              body: "Policy with ID: "+body.id+" is deleted."
          }
      } catch(err) {
          console.log(err);
          return {
              statusCode: 500,
              body: err
          }
      }
  }