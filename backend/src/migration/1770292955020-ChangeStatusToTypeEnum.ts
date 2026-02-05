import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeStatusToTypeEnum1770292955020 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {   
        const users = await queryRunner.query(`SELECT id, status FROM users`);
       
        for (const user of users) {
            const newStatus = user.status ? "Enabled" : "Disabled";    
            await queryRunner.query(
                `UPDATE users SET status = ? WHERE id = ?`,
                [newStatus, user.id]
            );
        }
    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const users = await queryRunner.query(`SELECT id, status FROM users`);
        
        for (const user of users) {
           const isEnabled = user.status === "Enabled" ? 1 : 0;
            await queryRunner.query(
                `UPDATE users SET role = ? WHERE id = ?`,
                [isEnabled, user.id]
            );
        }
        
    }

}
