import {MessageHandler} from 'util/MessageHandler';

let topic;
let msg;

// topic='in/a383490d6831193e0f691d755f990366bcda5f3ed4317d7e9343e2613a262748/user/verify';
// msg={"securityCode":"333"}

topic='in/a383490d6831193e0f691d755f990366bcda5f3ed4317d7e9343e2613a262748/user/login';
msg={"email":"a@b.com","pin":"1234"}

// topic='in/a383490d6831193e0f691d755f990366bcda5f3ed4317d7e9343e2613a262748/user/sendSecurityCode';
// msg={"email":"a@b.com"}

// topic='in/a383490d6831193e0f691d755f990366bcda5f3ed4317d7e9343e2613a262748/user/setPin/oneway';
// msg=
//     {
//         "email": "a@b.com",
//         "pin": "6688"
//     }

// topic ='in/a383490d6831193e0f691d755f990366bcda5f3ed4317d7e9343e2613a262748/member/create';
// msg={"qrPic":"21121",
//     "qrCode":"123jdsf832",
//     "dateOfBirth":"",
//     "email":"m@a.com",
//     "firstname":"mmm",
//     "lastname":"aaa",
//     "phone":"",
//     "profilePic":"1231313"};

MessageHandler.process(topic, msg);