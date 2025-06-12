/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import express from 'express'
import { logger } from 'firebase-functions'
import { onRequest } from 'firebase-functions/v2/https'

import { bootstrap } from './main'

const server = express()

bootstrap(server).catch((error: unknown) => logger.error(error))

export const app = onRequest(server)
