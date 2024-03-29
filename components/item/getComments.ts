import { CommentType } from "./Comment";
import { faker } from '@faker-js/faker'

export let DUMMY_COMMENTS: CommentType[] = [
    {
        _id: "1",
        username: faker.internet.userName(),
        content: faker.lorem.paragraph(1),
        user: "",
        createdAt: faker.date.recent(),
    },
    {
        _id: "2",
        username: faker.internet.userName(),
        content: faker.lorem.paragraph(1),
        user: "",
        createdAt: faker.date.recent(),
    },
    {
        _id: "3",
        username: faker.internet.userName(),
        content: faker.lorem.paragraph(1),
        user: "",
        createdAt: faker.date.recent(),
    },
    {
        _id: "4",
        username: faker.internet.userName(),
        content: faker.lorem.paragraph(1),
        user: "",
        createdAt: faker.date.recent(),
    },
];

const sleep = (timeout: number) => new Promise(resolve => setTimeout(resolve, timeout));

async function getComments() {
    await sleep(500);
    return DUMMY_COMMENTS;
}

async function postComment(content: string) {
    await sleep(500);
    DUMMY_COMMENTS.unshift({
        _id: "6",
        username: 'Patrick',
        content,
        user: "",
        createdAt: faker.date.recent(),
    });
    return Promise.resolve(DUMMY_COMMENTS);
}

export {
    getComments,
    postComment
}