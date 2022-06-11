const createJsonRpcPayload = (method: string, params: { [key: string]: any }) => {
  return {
    jsonrpc: "2.0",
    method,
    params,
    id: 23,
  };
};

const { app } = require("../src");
const request = require("supertest");

describe("Issue Transaction Endpoint", () => {
  jest.setTimeout(1000 * 60);
  it("should create a new transaction", async () => {
    const res = await request(app)
      .post("/json-rpc")
      .send(
        createJsonRpcPayload("send_transaction", {
          chain: "elrond",
          receiver: "erd1pdv0h3ddqyzlraek02y5rhmjnwwapjyhqm983kfcdfzmr6axqhdsfg4akx",
          value: 0.1,
        })
      );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("result");
    expect(res.body.result).toHaveProperty("txHash");
  });

  it("should fail to create a new transaction", async () => {
    const res = await request(app)
      .post("/json-rpc")
      .send(
        createJsonRpcPayload("send_transaction", {
          chain: "elrond2",
          receiver: "erd1pdv0h3ddqyzlraek02y5rhmjnwwapjyhqm983kfcdfzmr6axqhdsfg4akx",
          value: 0.1,
        })
      );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("error");
  });
});

describe("Get Transaction Endpoint", () => {
  it("should get the transaction", async () => {
    const res = await request(app)
      .post("/json-rpc")
      .send(
        createJsonRpcPayload("get_transaction", {
          chain: "ethereum",
          txHash: "2c2f85fdf6735a8b86bbe6b00aa3db1960be1280efcf6af9bc4445245ddab99a",
        })
      );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("result");
    expect(res.body.result.chain).toBe("ethereum");
  });
});
