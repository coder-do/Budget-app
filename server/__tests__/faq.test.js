import supertest from 'supertest';
import mongoose from 'mongoose';
import { app } from '../server.js';

describe("Testing Auth API", () => {
    let token = '';

    beforeEach(async () => {
        await mongoose.disconnect();
        await mongoose.connect(process.env.MONGODB_URL_TESTS);
        await supertest(app)
            .post('/auth/login')
            .send({
                email: "meruzh@gmail.com",
                password: "Kiloyan_123"
            })
            .then((res) => {
                token = res.body.session.token;
            })
    })

    afterAll(async () => {
        await mongoose.disconnect();
    })

    describe("GET FAQ API", () => {
        it("should return all faqs", async () => {
            const response = await supertest(app)
                .get('/faq/questions')
                .set('Authorization', token)

            expect(response.status).toBe(200);
            expect(response.body.length).toBe(5);
            expect(response.header["content-type"]).toBe("application/json; charset=utf-8")
        })
    });

    describe("Update FAQ by ID", () => {
        it("should update faq", async () => {
            const response = await supertest(app)
                .put('/faq/questions/update/3')
                .set('Authorization', token)
                .send({
                    answer: "Sorry, but I don't know !!!"
                })

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: 'FAQ updated!' })
            expect(response.header["content-type"]).toBe("application/json; charset=utf-8")
        })
    });
});