import { CommentType } from "./Comment";

let DUMMY_COMMENTS: CommentType[] = [
    {
        username: "Fred",
        content: "This is really cool!",
        date: new Date(),
    },
    {
        username: "Fred",
        content: "This is really cool!",
        date: new Date(),
    },
    {
        username: "Fred",
        content: "This is really cool!",
        date: new Date(),
    },
    {
        username: "Fred",
        content: "This is really cool!",
        date: new Date(),
    },
];

const sleep = (timeout: number) => new Promise(resolve => setTimeout(resolve, timeout));

async function getComments() {
    await sleep(1500);
    return DUMMY_COMMENTS;
}

async function postComment(content: string) {
    await sleep(1700);
    DUMMY_COMMENTS.unshift({
        username: 'Patrick',
        content,
        date: new Date(),
    });
    return Promise.resolve(DUMMY_COMMENTS);
}

export {
    getComments,
    postComment
}