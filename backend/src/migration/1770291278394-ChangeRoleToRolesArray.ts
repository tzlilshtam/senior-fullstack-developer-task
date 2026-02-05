import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeRoleToRolesArray1770291278394 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
           
        const users = await queryRunner.query(`SELECT id, role FROM users`);
        
        
        await queryRunner.query(`ALTER TABLE users ADD COLUMN roles TEXT`);
        
        
        for (const user of users) {
            const rolesArray = JSON.stringify([user.role]);
            await queryRunner.query(
                `UPDATE users SET roles = ? WHERE id = ?`,
                [rolesArray, user.id]
            );
        }
        
       
        await queryRunner.query(`ALTER TABLE users DROP COLUMN role`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
        const users = await queryRunner.query(`SELECT id, roles FROM users`);
        
       
        await queryRunner.query(`ALTER TABLE users ADD COLUMN role TEXT`);
        
        
        for (const user of users) {
            const firstRole = JSON.parse(user.roles)[0] || 'User';
            await queryRunner.query(
                `UPDATE users SET role = ? WHERE id = ?`,
                [firstRole, user.id]
            );
        }
        
        
        await queryRunner.query(`ALTER TABLE users DROP COLUMN roles`);
    }

}
