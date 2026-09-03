import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

export interface AssociacaoAttrs {
    id: string;
    nome: string;
    cnpj: string;
    endereco: string | null;
    logo_url: string | null;
    created_at?: string;
    updated_at?: string;
}
export type AssociacaoCreate = Optional<AssociacaoAttrs, 'id' | 'endereco' | 'logo_url'>;

export class AssociacaoModel extends Model<AssociacaoAttrs, AssociacaoCreate> implements AssociacaoAttrs {
    public id!: string;
    public nome!: string;
    public cnpj!: string;
    public endereco!: string | null;
    public logo_url!: string | null;
    public created_at: string | undefined;
    public updated_at: string | undefined;
}

export default function (sequelize: Sequelize) {
    AssociacaoModel.init(
        {
            id: { primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
            nome: { allowNull: false, type: DataTypes.STRING(200) },
            cnpj: { allowNull: false, type: DataTypes.STRING(20) },
            endereco: { allowNull: true, type: DataTypes.STRING(300) },
            logo_url: { allowNull: true, type: DataTypes.STRING(500) },
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
        },
        { tableName: 'associacao', sequelize, timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' },
    );
    return AssociacaoModel;
}
