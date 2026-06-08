import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

export interface ReceitaItem {
    produto: string;
    posologia: string;
    duracao_dias: number;
}

export interface ReceitaAttrs {
    id: string;
    paciente_nome: string;
    medico_nome: string;
    farmaceutico_nome: string | null;
    status: 'aguardando' | 'em_analise' | 'aprovada' | 'ajuste_solicitado' | 'rejeitada';
    itens: ReceitaItem[];
    observacoes: string | null;
    created_at?: string;
    updated_at?: string;
}
export type ReceitaCreate = Optional<ReceitaAttrs, 'id' | 'status' | 'farmaceutico_nome' | 'observacoes' | 'itens'>;

export class ReceitaModel extends Model<ReceitaAttrs, ReceitaCreate> implements ReceitaAttrs {
    public id!: string;
    public paciente_nome!: string;
    public medico_nome!: string;
    public farmaceutico_nome!: string | null;
    public status!: ReceitaAttrs['status'];
    public itens!: ReceitaItem[];
    public observacoes!: string | null;
    public created_at: string | undefined;
    public updated_at: string | undefined;
}

export default function (sequelize: Sequelize) {
    ReceitaModel.init(
        {
            id: { primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
            paciente_nome: { allowNull: false, type: DataTypes.STRING(150) },
            medico_nome: { allowNull: false, type: DataTypes.STRING(150) },
            farmaceutico_nome: { allowNull: true, type: DataTypes.STRING(150) },
            status: {
                allowNull: false,
                type: DataTypes.ENUM('aguardando', 'em_analise', 'aprovada', 'ajuste_solicitado', 'rejeitada'),
                defaultValue: 'aguardando',
            },
            itens: { allowNull: false, type: DataTypes.JSONB, defaultValue: [] },
            observacoes: { allowNull: true, type: DataTypes.TEXT },
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
        },
        { tableName: 'receitas', sequelize, timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' },
    );
    return ReceitaModel;
}
