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

    describe("Login functionality", () => {
        it("should login with correct credentials", async () => {
            const response = await supertest(app)
                .post('/auth/login')
                .send({
                    email: "meruzh@gmail.com",
                    password: "Kiloyan_123"
                });

            expect(response.status).toBe(200);
            expect(response.header["content-type"]).toBe("application/json; charset=utf-8")
        })

        it("should not login with incorrect credentials", async () => {
            const response = await supertest(app)
                .post('/auth/login')
                .send({
                    email: "meruzh@gmail.com",
                    password: "Kiloyan_1234"
                });

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: 'Please, check email and password and try again' })
            expect(response.header["content-type"]).toBe("application/json; charset=utf-8")
        })
    });

    describe("Logout functionality", () => {
        it("should log out", async () => {
            const response = await supertest(app)
                .post('/auth/logout')
                .set('Authorization', token)

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: 'Logout completed!' })
            expect(response.header["content-type"]).toBe("application/json; charset=utf-8")
        })

        it("should not log out without a token", async () => {
            const response = await supertest(app)
                .post('/auth/logout')

            expect(response.status).toBe(401);
        })
    });
});