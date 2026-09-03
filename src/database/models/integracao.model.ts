import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

export interface IntegracaoAttrs {
    id: string;
    nome: string;
    tipo: 'pagamento' | 'fornecedor' | 'outro';
    chave_api: string | null;
    ativo: boolean;
    created_at?: string;
    updated_at?: string;
}
export type IntegracaoCreate = Optional<IntegracaoAttrs, 'id' | 'chave_api' | 'ativo'>;

export class IntegracaoModel extends Model<IntegracaoAttrs, IntegracaoCreate> implements IntegracaoAttrs {
    public id!: string;
    public nome!: string;
    public tipo!: IntegracaoAttrs['tipo'];
    public chave_api!: string | null;
    public ativo!: boolean;
    public created_at: string | undefined;
    public updated_at: string | undefined;
}

export default function (sequelize: Sequelize) {
    IntegracaoModel.init(
        {
            id: { primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
            nome: { allowNull: false, type: DataTypes.STRING(100) },
            tipo: { allowNull: false, type: DataTypes.ENUM('pagamento', 'fornecedor', 'outro'), defaultValue: 'outro' },
            chave_api: { allowNull: true, type: DataTypes.STRING(300) },
            ativo: { allowNull: false, type: DataTypes.BOOLEAN, defaultValue: false },
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
        },
        { tableName: 'integracoes', sequelize, timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' },
    );
    return IntegracaoModel;
}
