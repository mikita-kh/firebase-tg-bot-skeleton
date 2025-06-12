/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import express from "express";

import {onRequest} from "firebase-functions/v2/https";


import { bootstrap } from "./main"

const server = express()

bootstrap(server);

export const app = onRequest(server);


