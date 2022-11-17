import { UsersDSL } from "../dsl/users.dsl"
import { CleanUpTool } from "../../helper/test.helper";

describe('Users Scenario E2E Test', () => {
    let usersDSL = new UsersDSL()
    let cleanTool = new CleanUpTool()

    beforeAll(async () => {
        await cleanTool.asyncConstructor()
        await usersDSL.createDriver()
    })

    beforeEach(async () => {
        await cleanTool.cleanUp("User")
        await cleanTool.cleanUp("Account")
        usersDSL.resetDataCache()
    })

    it('should create an user on database', async () => {
        // Arrange
        usersDSL.generateUser()

        // Act
        await usersDSL.createUser()

        // Assert
        await usersDSL.assertResponseIsNewUser()
    });

    it('should throw conflict exception when username already exists', async () => {
        // Arrange
        usersDSL.generateUser()

        // Act
        await usersDSL.createUser()
        await usersDSL.createUser()

        // Assert
        await usersDSL.assertResponseIsConflictException()
    });

    it('should authorize an user', async () => {
        // Arrange
        usersDSL.generateUser()
        await usersDSL.createUser()

        // Act
        await usersDSL.loginAuthorization()

        // Assert
        await usersDSL.assertUserIsLogged()
    });

    it('should throw unauthorized exception when user try to use wrong login credentials', async () => {
        // Arrange & Act
        usersDSL.generateUser()
        await usersDSL.createUser()
        await usersDSL.generateWrongCredentials()

        // Assert
        await usersDSL.assertResponseIsUnauthorizedException()
    });


    afterAll(async () => {
        await cleanTool.cleanUp("User")
        await cleanTool.cleanUp("Account")
        await usersDSL.closeClient()
    });
});