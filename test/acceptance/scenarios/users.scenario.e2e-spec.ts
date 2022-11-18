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
        await cleanTool.cleanUp("Transaction")
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


    it('should show users account balance', async () => {
        // Arrange
        usersDSL.generateUser()
        await usersDSL.createUser()
        await usersDSL.loginAuthorization()

        // Act
        await usersDSL.getBalance()

        // Assert
        await usersDSL.assertResponseIsBalance()
    });

    it('should create a new transaction from current user to target user', async () => {
        // Arrange
        usersDSL.generateUser()
        await usersDSL.createUser()
        usersDSL.generateSecondUser()
        await usersDSL.createUser()
        await usersDSL.loginAuthorization()

        // Act
        await usersDSL.doCashOut()

        // Assert
        await usersDSL.assertResponseIsNewCurrentTransaction()
    });

    it('should show all transactions from current user', async () => {
        // Arrange
        usersDSL.generateUser()
        await usersDSL.createUser()
        usersDSL.generateSecondUser()
        await usersDSL.createUser()
        await usersDSL.loginAuthorization()
        await usersDSL.doCashOut()

        // Act
        await usersDSL.getSelfTransactions()

        // Assert
        await usersDSL.assertResponseIsATransactionsArray()
    });

    afterAll(async () => {
        await cleanTool.cleanUp("User")
        await cleanTool.cleanUp("Transaction")
        await cleanTool.cleanUp("Account")
        await usersDSL.closeClient()
    });
});