import {CLIENT, throwError} from "../variables";
import {IWildduckApiCreateUserRequest, IWildduckApiGetUserResponse} from "../../src";

/** Variables */
const data: IWildduckApiCreateUserRequest = {
    username: 'admin2',
    name: 'Administrator',
    password: 'test'
}

/** Test **/
describe(`Create user with name "${data.name}" and username "${data.username}"`, () => {

    // set user
    let user: IWildduckApiGetUserResponse;

    // create user
    test(`Create user "${data.username}"`, async () => {
        await CLIENT.users.createUser(data).catch(throwError);
    });

    // resolve user
    test(`Resolve user by its username "${data.username}"`, async () => {
        const response = await CLIENT.users.resolveUserId(data.username);
        user = await CLIENT.users.getUser(response.id);
    });

    // update user
    test(`Update password of user "${data.username}"`, async () => {
        await CLIENT.users.updateUser(user.id, {
            password: 'test123'
        })
    })

    // delete user
    test(`Delete user "${data.username}"`, async () => {
        await CLIENT.users.deleteUser(user.id).catch(throwError);
    })

})