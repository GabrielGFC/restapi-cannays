import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

export interface FrascoAttrs {
    id: string;
    producao_id: string | null;
    codigo: string;
    volume_ml: number;
    validade: string;
    status: 'disponivel' | 'reservado' | 'dispensado' | 'descartado';
    created_at?: string;
    updated_at?: string;
}
export type FrascoCreate = Optional<FrascoAttrs, 'id' | 'status' | 'producao_id'>;

export class FrascoModel extends Model<FrascoAttrs, FrascoCreate> implements FrascoAttrs {
    public id!: string;
    public producao_id!: string | null;
    public codigo!: string;
    public volume_ml!: number;
    public validade!: string;
    public status!: FrascoAttrs['status'];
    public created_at: string | undefined;
    public updated_at: string | undefined;
}

export default function (sequelize: Sequelize) {
    FrascoModel.init(
        {
            id: { primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
            producao_id: { allowNull: true, type: DataTypes.UUID },
            codigo: { allowNull: false, type: DataTypes.STRING(60) },
            volume_ml: { allowNull: false, type: DataTypes.INTEGER },
            validade: { allowNull: false, type: DataTypes.DATEONLY },
            status: {
                allowNull: false,
                type: DataTypes.ENUM('disponivel', 'reservado', 'dispensado', 'descartado'),
                defaultValue: 'disponivel',
            },
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
        },
        { tableName: 'frascos', sequelize, timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' },
    );
    return FrascoModel;
}
