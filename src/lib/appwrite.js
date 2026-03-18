import { Client, Account, ID } from "appwrite";

const client = new Client()
    .setProject('69bac6e9001c58a0139c').setEndpoint('https://nyc.cloud.appwrite.io/v1');

export const account = new Account(client);

