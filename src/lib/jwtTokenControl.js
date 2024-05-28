import { jwtVerify } from 'jose';
import jwt from 'jsonwebtoken';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function isSeller(request) {
    try {
        const authHeader = request.headers.get('Authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return false;
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return false;
        }

        const { payload } = await jwtVerify(token, JWT_SECRET);

        if (payload.role !== 'seller') {
            return false;
        }

        return payload;
    } catch (error) {
        console.error('Authentication error:', error);
        return false;
    }
}

export async function isBuyer(request) {
    try {
        const authHeader = request.headers.get('Authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return false;
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return false;
        }

        const { payload } = await jwtVerify(token, JWT_SECRET);

        if (payload.role !== 'buyer') {
            return false;
        }

        return !!payload;
    } catch (error) {
        console.error('Authentication error:', error);
        return false;
    }
}

export async function jwtSign(payload) {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}
