import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

export interface MembroAttrs {
    id: string;
    nome: string;
    email: string;
    tipo: 'colaborador' | 'voluntario' | 'medico' | 'farmaceutico' | 'administrador';
    funcao: string;
    foto_url: string | null;
    ativo: boolean;
    created_at?: string;
    updated_at?: string;
}
export type MembroCreate = Optional<MembroAttrs, 'id' | 'tipo' | 'foto_url' | 'ativo'>;

export class MembroModel extends Model<MembroAttrs, MembroCreate> implements MembroAttrs {
    public id!: string;
    public nome!: string;
    public email!: string;
    public tipo!: MembroAttrs['tipo'];
    public funcao!: string;
    public foto_url!: string | null;
    public ativo!: boolean;
    public created_at: string | undefined;
    public updated_at: string | undefined;
}

export default function (sequelize: Sequelize) {
    MembroModel.init(
        {
            id: { primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
            nome: { allowNull: false, type: DataTypes.STRING(150) },
            email: { allowNull: false, type: DataTypes.STRING(180), unique: true },
            tipo: {
                allowNull: false,
                type: DataTypes.ENUM('colaborador', 'voluntario', 'medico', 'farmaceutico', 'administrador'),
                defaultValue: 'colaborador',
            },
            funcao: { allowNull: false, type: DataTypes.STRING(150) },
            foto_url: { allowNull: true, type: DataTypes.STRING(500) },
            ativo: { allowNull: false, type: DataTypes.BOOLEAN, defaultValue: true },
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
        },
        { tableName: 'rh_membros', sequelize, timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' },
    );
    return MembroModel;
}
