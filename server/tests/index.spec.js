import app from "../src/server";
import request from 'supertest'

describe("GET /products", () => {
    test("should respond with a status 200 code", async () => { 
        const response = await request(app).get("/products").send()
        expect(response.statusCode).toBe(200);
    });

    test('should respond with an array', async () => {
        const response = await request(app).get('/products').send()
        expect(response.body).toBeInstanceOf(Array)
    })
});
//
describe("GET /logout", () => {
    test("should respond with a status 200 code", async () => { 
        const response = await request(app).get("/logout").send()
        expect(response.statusCode).toBe(200);
    });
});

describe("GET /user", () => {
    test("should respond with a status 200 code", async () => { 
        const response = await request(app).get("/user").send()
        expect(response.statusCode).toBe(200);
    });
});
//
describe("GET /admin/dashboard", () => {
    test("should respond with a status 200 code", async () => { 
        const response = await request(app).get("/admin/dashboard").send()
        expect(response.statusCode).toBe(200);
    });
});

describe("GET /admin/allusers", () => {
    test("should respond with a status 200 code", async () => { 
        const response = await request(app).get("/admin/allusers").send()
        expect(response.statusCode).toBe(200);
    });
});

describe("GET /categories", () => {
    test("should respond with a status 200 code", async () => { 
        const response = await request(app).get("/categories").send()
        expect(response.statusCode).toBe(200);
    });
});

describe("GET /pedidos", () => {
    test("should respond with a status 200 code", async () => { 
        const response = await request(app).get("/pedidos").send()
        expect(response.statusCode).toBe(200);
    });
});

describe("GET /pedidos/pending", () => {
    test("should respond with a status 200 code", async () => { 
        const response = await request(app).get("/pedidos/pending").send()
        expect(response.statusCode).toBe(200);
    });
});
//
describe("POST /auth/login", () => {
    test("should respond with a status 200 code", async () => { 
        const response = await request(app).post("/auth/login").send()
        expect(response.statusCode).toBe(200);
    }); 

    test("Should have a content-type: application/json in header", async () => {
        const response = await request(app).post("/auth/login").send()
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );   
    });
});

describe("POST /auth/login", () => {
    test("should respond with a status 200 code", async () => { 
        const response = await request(app).post("/auth/login").send()
        expect(response.statusCode).toBe(200);
    }); 

    test("Should have a content-type: application/json in header", async () => {
        const response = await request(app).post("/auth/login").send()
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );   
    });
});

describe("POST /product/createproduct", () => {
    test("should respond with a status 200 code", async () => { 
        const response = await request(app).post("/product/createproduct").send()
        expect(response.statusCode).toBe(200);
    }); 

    test("Should have a content-type: application/json in header", async () => {
        const response = await request(app).post("/product/createproduct").send()
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );   
    });
});

describe("POST /categories/createcategorie", () => {
    test("should respond with a status 200 code", async () => { 
        const response = await request(app).post("/categories/createcategorie").send()
        expect(response.statusCode).toBe(200);
    }); 

    test("Should have a content-type: application/json in header", async () => {
        const response = await request(app).post("/categories/createcategorie").send()
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );   
    });
});

describe("POST /pedidos/createcheckout", () => {
    test("should respond with a status 200 code", async () => { 
        const response = await request(app).post("/pedidos/createcheckout").send()
        expect(response.statusCode).toBe(200);
    }); 
});
//