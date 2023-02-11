import { CommentType } from "./Comment";
import { faker } from '@faker-js/faker'

export let DUMMY_COMMENTS: CommentType[] = [
    {
        username: faker.internet.userName(),
        content: faker.lorem.paragraph(1),
        date: faker.date.recent(),
    },
    {
        username: faker.internet.userName(),
        content: faker.lorem.paragraph(1),
        date: faker.date.recent(),
    },
    {
        username: faker.internet.userName(),
        content: faker.lorem.paragraph(1),
        date: faker.date.recent(),
    },
    {
        username: faker.internet.userName(),
        content: faker.lorem.paragraph(1),
        date: faker.date.recent(),
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