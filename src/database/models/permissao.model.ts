import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

export type Perfil = 'colaborador' | 'voluntario' | 'medico' | 'farmaceutico' | 'administrador';

export interface PermissaoAttrs {
    id: string;
    perfil: Perfil;
    funcionalidade: string;
    permitido: boolean;
    created_at?: string;
    updated_at?: string;
}
export type PermissaoCreate = Optional<PermissaoAttrs, 'id' | 'permitido'>;

export class PermissaoModel extends Model<PermissaoAttrs, PermissaoCreate> implements PermissaoAttrs {
    public id!: string;
    public perfil!: Perfil;
    public funcionalidade!: string;
    public permitido!: boolean;
    public created_at: string | undefined;
    public updated_at: string | undefined;
}

export default function (sequelize: Sequelize) {
    PermissaoModel.init(
        {
            id: { primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
            perfil: {
                allowNull: false,
                type: DataTypes.ENUM('colaborador', 'voluntario', 'medico', 'farmaceutico', 'administrador'),
            },
            funcionalidade: { allowNull: false, type: DataTypes.STRING(60) },
            permitido: { allowNull: false, type: DataTypes.BOOLEAN, defaultValue: false },
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
        },
        { tableName: 'permissoes', sequelize, timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' },
    );
    return PermissaoModel;
}
