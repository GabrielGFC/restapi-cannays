import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

export interface NotificacaoRegraAttrs {
    id: string;
    evento: string;
    canal: 'email' | 'in_app';
    ativo: boolean;
    created_at?: string;
    updated_at?: string;
}
export type NotificacaoRegraCreate = Optional<NotificacaoRegraAttrs, 'id' | 'ativo'>;

export class NotificacaoRegraModel
    extends Model<NotificacaoRegraAttrs, NotificacaoRegraCreate>
    implements NotificacaoRegraAttrs
{
    public id!: string;
    public evento!: string;
    public canal!: 'email' | 'in_app';
    public ativo!: boolean;
    public created_at: string | undefined;
    public updated_at: string | undefined;
}

export default function (sequelize: Sequelize) {
    NotificacaoRegraModel.init(
        {
            id: { primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
            evento: { allowNull: false, type: DataTypes.STRING(80) },
            canal: { allowNull: false, type: DataTypes.ENUM('email', 'in_app'), defaultValue: 'in_app' },
            ativo: { allowNull: false, type: DataTypes.BOOLEAN, defaultValue: true },
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
        },
        { tableName: 'notificacoes_regras', sequelize, timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' },
    );
    return NotificacaoRegraModel;
}
