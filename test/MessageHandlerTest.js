import {MessageHandler} from 'util/MessageHandler';

// let topic='f4035320-be1f-4e71-8005-2363a6f074ee/in/a383490d6831193e0f691d755f990366bcda5f3ed4317d7e9343e2613a262748/user/verify';
// let msg={"securityCode":"333"}

// let topic='f4035320-be1f-4e71-8005-2363a6f074ee/in/a383490d6831193e0f691d755f990366bcda5f3ed4317d7e9343e2613a262748/user/login';
// let msg={"email":"a@b.com","pin":"1234"}

// let topic='f4035320-be1f-4e71-8005-2363a6f074ee/in/a383490d6831193e0f691d755f990366bcda5f3ed4317d7e9343e2613a262748/user/sendSecurityCode';
// let msg={"email":"a@b.com"}

let topic='f4035320-be1f-4e71-8005-2363a6f074ee/in/a383490d6831193e0f691d755f990366bcda5f3ed4317d7e9343e2613a262748/user/setPin';
let msg=
{
    "email": "a@b.com",
    "pin": "6688"
}
MessageHandler.process(topic, msg);