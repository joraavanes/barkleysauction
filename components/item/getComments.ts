import { CommentType } from "./Comment";

const DUMMY_COMMENTS: CommentType[] = [
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
    await sleep(4000);
    return DUMMY_COMMENTS;
}

export {
    getComments
}