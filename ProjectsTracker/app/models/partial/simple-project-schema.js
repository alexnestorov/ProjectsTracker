/* require globals */
const Schema = require("mongoose").Schema;
const SimpleUserSchema = require("./simple-user-schema");

const ProjectSchema = new Schema({
    title: {
        type: String,
        minLength: 10,
        maxLength: 120,
        required: true
    },
    description: {
        type: String,
        //TODO: Change
        minLength: 10,
        maxLength: 100000
    },
    leadUser: {
        type: SimpleUserSchema,
        ref: "User"
        //required: true
    },
    isPrivate: {
        type: Boolean,
        required: true
    }
});

module.exports = ProjectSchema;

