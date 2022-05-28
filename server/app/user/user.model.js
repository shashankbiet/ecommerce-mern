const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
    {
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        roleId: {             //1-admin, 2-merchant, 3-customer
            type: Number,
            required: true,
            default: 3,

        },
        password: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        address: [{
            typeId: {             //1-home, 2-work
                type: Number,
                required: true,
                default: 1,
            },
            line1: {
                type: String,
                required: false,
            },
            line2: {
                type: String,
                required: false,
            },
            district: {
                type: String,
                required: true,
            },
            landmark: {
                type: String,
                required: true,
            },
            state: {
                type: String,
                required: true,
            },
            country: {
                type: String,
                required: true,
            },
            pincode: {
                type: String,
                required: true,
            }
        }],
        createdDate: {
            type: Date,
            required: false,
            default: Date.now
        },
        lastModifiedDate: {
            type: Date,
            required: false,
        },
        isActive: {
            type: Boolean,
            required: true,
            default: true,
        },
    },
    { versionKey: false }
);

module.exports = mongoose.model('users', userSchema);
