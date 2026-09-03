import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

export interface AuditLogAttrs {
    id: string;
    user_id: string | null;
    method: string;
    path: string;
    status_code: number;
    created_at?: string;
}
export type AuditLogCreate = Optional<AuditLogAttrs, 'id' | 'user_id'>;

export class AuditLogModel extends Model<AuditLogAttrs, AuditLogCreate> implements AuditLogAttrs {
    public id!: string;
    public user_id!: string | null;
    public method!: string;
    public path!: string;
    public status_code!: number;
    public created_at: string | undefined;
}

export default function (sequelize: Sequelize) {
    AuditLogModel.init(
        {
            id: { primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
            user_id: { allowNull: true, type: DataTypes.UUID },
            method: { allowNull: false, type: DataTypes.STRING(10) },
            path: { allowNull: false, type: DataTypes.STRING(300) },
            status_code: { allowNull: false, type: DataTypes.INTEGER },
            created_at: DataTypes.DATE,
        },
        { tableName: 'audit_logs', sequelize, timestamps: true, createdAt: 'created_at', updatedAt: false },
    );
    return AuditLogModel;
}
