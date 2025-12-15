import jwt from "jsonwebtoken";

export async function POST(request) {
    try {
        const body = await request.json();

        // Prepare payload
        const payload = {
            version: "v4.3",
            merchantID: process.env.PAYMENT_MERCHANT_ID,
            invoiceNo: Date.now().toString(),
            description: "Test Item",
            amount: "10000",
            currencyCode: "SGD",
            request3DS: "Y",
            frontendReturnUrl: "http://localhost:3000/return",
            backendReturnUrl: "http://localhost:3000/api/2c2p/callback",
            customerEmail: "test@example.com",
            customerFirstName: "John",
            customerLastName: "Doe",
            paymentExpiry: "2025-12-31T23:59:59Z"
        };

        const jwtToken = jwt.sign(payload, process.env.PAYMENT_SECRET_KEY, { algorithm: "HS256" });

        const response = await fetch(process.env.PAYMENT_API_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ payload: jwtToken })
        });

        console.log(await response.text());
        const apiURL = process.env.PAYMENT_API_ENDPOINT;
        const requestBody = { payload: jwtToken };

        // Call 2C2P API
        const externalResponse = await fetch(apiURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        const text = await externalResponse.text();

        let parsedResponse;
        try {
            parsedResponse = JSON.parse(text);
        } catch {
            parsedResponse = { html: text };
        }

        return Response.json(
            {
                status: "success",
                payload: jwtToken,
                sentPayload: payload, // debug
                response: parsedResponse,
            },
            { status: 200 }
        );
    } catch (error) {
        return Response.json(
            {
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
