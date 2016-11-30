"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Statuses = ["Open", "Closed", "Resolved", "Reopened", "Waiting For", "Duplicate", "Need More Info"];
const SimpleUserSchema = require("./partial/simple-user-schema");
const CommentSchema = require("./partial/comment-schema");

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
    },
    description: {
        type: String,
        maxLength: 500
    },
    priority: {
        type: Number,
        required: true,
        minLength: 1,
        maxLength: 10
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: { type: Date },
    dueDate: {
        type: Date,
        required: true,
        validate: {
            validator: (v) => {
                return v > Date.now();
            },
            message: "Due date should be later than creation date!"
        }
    },
    reporterId: {
        type: SimpleUserSchema,
        ref: "User"
    },
    assigneeId: {
        type: SimpleUserSchema,
        ref: "User"
    },
    status: { type: String, required: true, enum: Statuses },
    projectId: { type: Schema.Types.ObjectId, ref: "Project" },
    comments: [CommentSchema]
});

let Task;
mongoose.model("Task", TaskSchema);
Task = mongoose.model("Task");
module.exports = Task;