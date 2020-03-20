import * as log4js from "log4js";

const IS_DEV = process.env.NODE_ENV === "development";

log4js.configure({
    appenders: {
        "system_console": {
            type: "console",
            layout: {
                type: "pattern",
                pattern: "%[[%d] [%p]%] %c - %m [%f:%l:%o]"
            },
        },
        "system_file": {
            type: "file",
            filename: "logs/system/system.log",
            maxLogSize: 5 * 1024 * 1024,
            backups: 5,
            compress: true,
            layout: {
                type: "pattern",
                pattern: "[%d] [%p] %c - %m [%f:%l:%o]"
            },
        },
        "access_console": {
            type: "console",
        },
        "access_file": {
            type: "dateFile",
            filename: "logs/access/access.log",
            pattern: "yyyy-MM-dd",
            alwaysIncludePattern: true,
            keepFileExt: true,
            compress: true,
            daysToKeep: 5,
        }
    },
    categories: {
        "default": {
            appenders: ["system_console"],
            level: !IS_DEV ? "info" : "all",
            enableCallStack: true,
        },
        "system": {
            appenders: ["system_console", "system_file"],
            level: !IS_DEV ? "info" : "all",
            enableCallStack: true,
        },
        "access": {
            appenders: !IS_DEV ? ["access_file"] : ["access_console", "access_file"],
            level: !IS_DEV ? "info" : "all",
        }
    }
});

export const defaultLogger = log4js.getLogger();
export const systemLogger = log4js.getLogger("system");
export const accessLogger = log4js.getLogger("access");
export const accessLogConnector = log4js.connectLogger(accessLogger, { level: "auto" });
