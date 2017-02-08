"use strict";

import {TimelineItemSchema}         from "./schemas";
import connectionProvider           from "./connectionProvider";
import {serverSettings}             from "../settings";
import Promise                      from "bluebird";

const fs = Promise.promisifyAll(require("fs"));

export const getTimelineItemModel = async function (perms) {
    try {
        const accounts = JSON.parse(await fs.readFileAsync("db.config.json", "utf-8"));
        const creds = accounts[perms];
        const conn = await connectionProvider(serverSettings.serverUrl, serverSettings.database, creds);
        return conn.model("TimelineItem", TimelineItemSchema);
    } catch (err) {
        throw err;
    }
};