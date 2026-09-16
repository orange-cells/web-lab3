import express from 'express';
import bodyParser from 'body-parser';
import { createReadStream } from 'fs';
import crypto from 'crypto';
import http from 'http';
import appSource from './app.js';

const app = appSource(express, bodyParser, createReadStream, crypto, http);

app.listen(process.env.PORT);