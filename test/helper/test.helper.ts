import {dataSource} from "../../src/database.providers";

export class CleanUpTool {
    private connection

    async asyncConstructor() {
        this.connection = await dataSource.initialize()
    }

    async cleanUp(name: string) {
        await this.connection.query(`DELETE FROM "${name}";`)
    }
}