import { Request, Response, Body, RouteParams, } from "https://deno.land/x/oak/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

interface User {
  id: string;
  name: string;
}

let users: User[] = [{
  id: v4.generate(),
  name: "Ryan Ray",
}];

/* #region  get users */
export const getUsers = ({ response }: { response: Response }) => {
  response.body = { message: "Succesfull Query", users };
};
/* #endregion */

/* #region  get a single user */
export const getUser = (
  { params, response }: {
    /*params:{id: string};*/ params: RouteParams;
    response: Response;
  },
) => {
  const userFound = users.find((user) => user.id === params.id);

  if (userFound) {
    response.status = 200;
    response.body = {
      message: "user encontred",
      userFound,
    };
  } else {
    response.status = 404,
      response.body = {
        message: "User not found",
      };
  }
};
/* #endregion */

/* #region create user*/
export const createUser = async (
  { request, response }: { request: Request; response: Response },
) => {
  const body: Body = await request.body();

  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      message: "Body is required",
    };
  } else {
    const newUser: User = body.value;
    newUser.id = v4.generate();
    users.push(newUser);
    response.status = 200;
    response.body = {
      message: `New user created ${newUser}`,
      newUser,
    };
  }
};
/* #endregion */

/* #region  delete user */
export const deleteUser = (
  { params, response }: { params: RouteParams; response: Response },
) => {
  users = users.filter((user) => user.id !== params.id);
  response.status = 200;
  response.body = {
    message: "user deleted succesfully",
    users,
  };
};
/* #endregion */

/* #region  update user */
export const updateUser = async (
  { request, response, params }: {
    request: Request;
    response: Response;
    params: RouteParams;
  },
) => {
  const userFound = users.find((user) => user.id === params.id);

  if (!userFound) {
    response.status = 404;
    response.body = {
      message: "User not found",
    };
  } else {
    const body: Body = await request.body();
    const updatedUser: User = body.value;

    users = users.map((user) =>
      user.id === params.id ? { ...user, ...updatedUser } : user
    );

    response.status = 200;
    response.body = {
      message: "User update succesful ",
      updatedUser,
    };
  }
};
/* #endregion */
