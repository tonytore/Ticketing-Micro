import { Router } from "express";
import bycrpt from "bcrypt";
import { validate } from "../middleware/validators";
import { loginSchema, signupSchema } from "./auth.schema";
import { db } from "../lib/prisma";
import { errorResponse, successResponse, } from "../utils/helper/response-helper";
import { UnauthenticatedError } from "../utils/error/custom_error_handler";
const router = Router();
router.get("/currentuser", async (req, res) => {
    const users = await db.user.findMany();
    if (!users || users.length === 0) {
        return errorResponse(req, res, "error.auth", "User not found", 404);
    }
    return successResponse(req, res, "User fetched successfully", users[0]);
});
router.post("/login", validate(loginSchema), async (req, res) => {
    const { email, password } = req.body;
    const user = await db.user.findUnique({
        where: { email },
        select: {
            password: true,
        },
    });
    if (!user) {
        throw new UnauthenticatedError("error.invalidCredentials", "AuthService");
    }
    if (!user.password) {
        throw new UnauthenticatedError("error.invalidCredentials", "AuthService");
    }
    const ok = await bycrpt.compare(password, user.password);
    if (!ok) {
        throw new UnauthenticatedError("error.invalidCredentials", "AuthService");
    }
    return successResponse(req, res, "User logged in successfully", { email });
});
router.post("/signup", validate(signupSchema), async (req, res) => {
    const { email, password } = req.body;
    const users = await db.user.findMany();
    if (users.find((user) => user.email === email)) {
        throw new UnauthenticatedError("error.auth", "User already exists");
    }
    const hashedPassword = bycrpt.hashSync(password, 10);
    try {
        await db.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });
        return successResponse(req, res, "User created successfully", { email });
    }
    catch (error) {
        return errorResponse(req, res, "error.auth", "Internal Server Error", 500);
    }
});
router.post("/signout", (req, res) => {
    const { email, password } = req.body;
    res.send({ service: "auth", status: "successfully signout" });
});
export { router as authRouter };
