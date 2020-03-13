import express from 'express';

export const songRouter = express.Router();
//difference betweeen  express() and express.Router() 
//var app = express() is called, an app object is returned. Think of this as the main app
// In case of express.Router() -- mini app is returned. to create modular, mountable route handlers 