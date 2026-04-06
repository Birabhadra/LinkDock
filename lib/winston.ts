import { createLogger,format,transport,transports } from "winston";
import { Logtail } from "@logtail/node";
import { LogtailTransport } from "@logtail/winston";
import "dotenv/config"