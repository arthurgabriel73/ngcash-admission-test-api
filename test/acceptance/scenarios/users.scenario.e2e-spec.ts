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

    afterAll(async () => {
        await cleanTool.cleanUp("User")
        await usersDSL.closeClient()
    });
});