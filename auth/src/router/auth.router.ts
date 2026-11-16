import { Request, Response, Router } from "express";
import bycrpt from "bcrypt";
import jwt from "jsonwebtoken";
import { validate } from "@salemticket/common";
import { loginSchema, signupSchema } from "./auth.schema";
import { errorResponse, successResponse } from "@salemticket/common";
import { UnauthenticatedError } from "@salemticket/common";
import { appConfig } from "@salemticket/common";
import { CurrentUser } from "@salemticket/common";
import { RequireAuth } from "@salemticket/common";
import { db } from "../lib/prisma";
import { User } from "../generated/prisma/client";

const router = Router();

router.get(
  "/currentuser",
  CurrentUser,
  RequireAuth,
  async (req: Request, res: Response) => {
    return successResponse(req, res, `User fetched successfully`, {
      currentUser: req.currentUser || null,
    });
  },
);

router.get("/currentuser/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const users = await db.user.findMany();
  if (!users || users.length === 0) {
    return errorResponse(req, res, "error.auth", "User not found", 404);
  }
  const user = users.find((user: User) => {
    return user.id === id;
  });
  return successResponse(req, res, "User fetched successfully", user);
});

router.post(
  "/signup",
  validate(signupSchema),
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const users = await db.user.findMany();

      if (users.find((user: User) => user.email === email)) {
        throw new UnauthenticatedError("error.auth", "User already exists");
      }

      const hashedPassword = bycrpt.hashSync(password, 10);

      const user = await db.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      const { password: _, ...rest } = user;

      const jwtData = jwt.sign(
        {
          id: rest.id,
          email: rest.email,
        },
        appConfig.JWT_SECRET!,
      );

      req.session = { jwt: jwtData };

      return successResponse(req, res, "User created successfully", { email });
    } catch (error) {
      return errorResponse(
        req,
        res,
        "error.auth",
        "Internal Server Error",
        500,
      );
    }
  },
);

router.post(
  "/login",
  validate(loginSchema),
  async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const existingUser = await db.user.findUnique({
        where: { email },
      });

      if (!existingUser) {
        throw new UnauthenticatedError("error.invalidCredentials", "AuthRoute");
      }

      const ok = await bycrpt.compare(password, existingUser.password);

      if (!ok) {
        throw new UnauthenticatedError("error.invalidCredentials", "AuthRoute");
      }
      const { password: _, ...rest } = existingUser;

      const jwtData = jwt.sign(
        {
          id: rest.id,
          email: rest.email,
        },
        appConfig.JWT_SECRET!,
      );

      req.session = { jwt: jwtData };
      return successResponse(req, res, "User logged in successfully", { rest });
    } catch (error) {
      return errorResponse(
        req,
        res,
        "error.auth",
        `Internal Server Error ${error}`,
        500,
      );
    }
  },
);

router.post("/signout", (req: Request, res: Response) => {
  req.session = undefined;
  res.send({});
});

export { router as authRouter };
