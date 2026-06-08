import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

export interface ProducaoAttrs {
    id: string;
    lote_id: string | null;
    metodo: 'co2' | 'etanol' | 'oleo_carreador' | 'rosin';
    data: string;
    rendimento_ml: number;
    responsavel_id: string | null;
    created_at?: string;
    updated_at?: string;
}
export type ProducaoCreate = Optional<ProducaoAttrs, 'id' | 'metodo' | 'lote_id' | 'responsavel_id' | 'rendimento_ml'>;

export class ProducaoModel extends Model<ProducaoAttrs, ProducaoCreate> implements ProducaoAttrs {
    public id!: string;
    public lote_id!: string | null;
    public metodo!: ProducaoAttrs['metodo'];
    public data!: string;
    public rendimento_ml!: number;
    public responsavel_id!: string | null;
    public created_at: string | undefined;
    public updated_at: string | undefined;
}

export default function (sequelize: Sequelize) {
    ProducaoModel.init(
        {
            id: { primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
            lote_id: { allowNull: true, type: DataTypes.UUID },
            metodo: {
                allowNull: false,
                type: DataTypes.ENUM('co2', 'etanol', 'oleo_carreador', 'rosin'),
                defaultValue: 'co2',
            },
            data: { allowNull: false, type: DataTypes.DATEONLY },
            rendimento_ml: { allowNull: false, type: DataTypes.INTEGER, defaultValue: 0 },
            responsavel_id: { allowNull: true, type: DataTypes.UUID },
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
        },
        { tableName: 'producoes', sequelize, timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' },
    );
    return ProducaoModel;
}
