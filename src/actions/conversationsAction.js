import {conversationsCollection} from '../config/firestore';
import moment from 'moment';
import {getStore} from '../../App';
import {CONVERSATIONS} from './types';
import {getAllMatchesLists} from './matchesAction';
import {setFormatAsPerGiftedChatArray} from './generalAction';

export function createNewConversation(id, members) {
    return new Promise((resolve, reject) => {
        conversationsCollection.doc(id).set({
            matches_id: id,
            members,
            latestMessage: {
                text: ``,
                createdAt: moment().utc().unix()
            }
        }).then(() => {
            resolve(true);
        }).catch(error => {
            reject(false)
        });
    });
}

export function getAllConversationLists(uid) {
    return new Promise((resolve, reject) => {
        getAllMatchesLists(uid).then(response => {
            if (response.length > 0) {
                let getConversations = response.map(function (o) {return o.customId;});

                conversationsCollection
                    .where('matches_id', 'in', getConversations)
                    .onSnapshot(snapshot => {
                        if (Boolean(snapshot)) {
                            let docs = snapshot.docs;
                            let conversations = [];
                            for (let v in docs) {
                                let data = {
                                    ...docs[v]._data
                                };
                                let obj = response.find(o => o.customId === data.matches_id);
                                data.user = obj.user;
                                conversations.push(data);
                            }

                            getStore.dispatch({
                                type: CONVERSATIONS,
                                payload: conversations
                            });
                            resolve(conversations);
                        }
                    })
            }
        });
    });
}

export function updateLatestMessageInConversation(id, data) {
    return new Promise((resolve, reject) => {
        let parameter = {};
        let createdAt = moment().utc().unix();
        parameter[data.user._id] = createdAt;
        parameter['latestMessage'] = {
            ...data,
            createdAt,
        };
        conversationsCollection
            .doc(id)
            .set(parameter, {merge: true}).then(response => {

        })
    });
}

export function readMessageInConversation(id, uid) {
    return new Promise((resolve, reject) => {
        let parameter = {};
        parameter[uid] = moment().utc().unix();
        conversationsCollection
            .doc(id)
            .set(parameter, {merge: true}).then(response => {

        })
    });
}

export function addMessageInConversation(id, parameter) {
    return new Promise((resolve, reject) => {
        conversationsCollection
            .doc(id)
            .collection('Messages')
            .add({
                ...parameter,
                createdAt: moment().utc().unix(),
            }).then(response => {
            resolve(true)
        })
    });
}

export function getAllMessageListsFromConversation(conversationId, otherUser) {
    return new Promise((resolve, reject) => {
        conversationsCollection
            .doc(conversationId)
            .collection('Messages')
            .orderBy('createdAt', 'desc')
            .get().then((response) => {
            resolve(setFormatAsPerGiftedChatArray(response, otherUser));
        })
    });
}
