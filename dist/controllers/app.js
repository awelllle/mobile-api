"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const utils_1 = require("../utils");
const user_1 = require("../models/user");
const stripe_1 = require("stripe");
const stripe = new stripe_1.default('sk_test_26PHem9AhJZvU623DfE1x4sd', {
    apiVersion: '2023-10-16',
});
class AppController {
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const required = [
                { name: 'name', type: 'string' },
                { name: 'username', type: 'string' },
            ];
            const { body } = req;
            const hasRequired = utils_1.default.helpers.validParam(body, required);
            if (hasRequired.success) {
                console.log(req.user.email, 'rr');
                let email = req.user.email.toLowerCase();
                user_1.User.findOne({ email }, (err, user) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        console.log(err, 'user signup error');
                        return utils_1.default.helpers.sendErrorResponse(res, {}, 'Something went wrong, please try again');
                    }
                    if (user != null) {
                        user_1.User.updateOne({ email: email }, {
                            $set: {
                                name: body.name,
                                username: body.username
                            },
                        }, (err, updated) => {
                            if (err) {
                                console.log(err);
                                return utils_1.default.helpers.errorResponse(res, [], 'Something went wrong, please try again');
                            }
                            return utils_1.default.helpers.sendSuccessResponse(res, [], 'User has been updated');
                        });
                    }
                    else {
                        return utils_1.default.helpers.errorResponse(res, [], 'User does not exists');
                    }
                }));
            }
            else {
                console.log(hasRequired.message);
                const message = hasRequired.message;
                return utils_1.default.helpers.sendErrorResponse(res, { message }, 'Missing required fields');
            }
        });
    }
    stripe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sig = req.headers['stripe-signature']; //  verify signature to prevent replay attacks
            let event;
            try {
                event = stripe.webhooks.constructEvent(req.body, sig, 'your_stripe_webhook_secret');
            }
            catch (err) {
                console.log('Webhook signature verification failed.');
                return res.sendStatus(400);
            }
            // Handle the event according to your application's logic
            switch (event.type) {
                case 'payment_intent.succeeded':
                    // Handle successful payment intent
                    console.log('Payment succeeded:', event.data.object);
                    const email = event.data.object.customer; // assuming email exists in the payload
                    user_1.User.findOne({ email }, (err, user) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            console.log(err, 'error while updating records');
                        }
                        if (user != null) {
                            user_1.User.updateOne({ email: email }, {
                                $set: {
                                    status: 'paid', //update status to paid
                                },
                            }, (err, updated) => {
                                if (err) {
                                    console.log(err);
                                }
                                console.log('User has been updated');
                            });
                        }
                        else {
                            console.log('User does not exist');
                        }
                    }));
                case 'payment_intent.payment_failed':
                    // Handle failed payment intent
                    console.log('Payment failed:', event.data.object);
                    break;
                default:
                    // Unexpected event type
                    console.log('Unhandled event type:', event.type);
                    break;
            }
            // Respond to Stripe to acknowledge receipt of the event
            res.json({ received: true });
        });
    }
}
exports.AppController = AppController;
//# sourceMappingURL=app.js.map