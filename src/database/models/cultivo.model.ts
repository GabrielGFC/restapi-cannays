import { CultivoLote } from '@/interfaces/cultivo.interfaces';
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

export type CultivoLoteCreationAttributes = Optional<
    CultivoLote,
    'id' | 'etapa' | 'observacoes'
>;

export class CultivoLoteModel
    extends Model<CultivoLote, CultivoLoteCreationAttributes>
    implements CultivoLote
{
    public id!: string;
    public especie!: string;
    public data_plantio!: string;
    public responsavel_id!: string;
    public quantidade_plantas!: number;
    public local_cultivo!: string;
    public etapa!: CultivoLote['etapa'];
    public observacoes!: string | null;
    public created_at: string | undefined;
    public updated_at: string | undefined;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof CultivoLoteModel {
    CultivoLoteModel.init(
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUIDV4,
                defaultValue: DataTypes.UUIDV4,
            },
            especie: { allowNull: false, type: DataTypes.STRING(100) },
            data_plantio: { allowNull: false, type: DataTypes.DATEONLY },
            responsavel_id: { allowNull: false, type: DataTypes.UUID },
            quantidade_plantas: { allowNull: false, type: DataTypes.INTEGER },
            local_cultivo: { allowNull: false, type: DataTypes.STRING(150) },
            etapa: {
                allowNull: false,
                type: DataTypes.ENUM(
                    'plantio',
                    'vegetativo',
                    'floracao',
                    'colheita',
                    'concluido',
                ),
                defaultValue: 'plantio',
            },
            observacoes: { allowNull: true, type: DataTypes.TEXT },
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
        },
        {
            tableName: 'cultivo_lotes',
            sequelize,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            timestamps: true,
        },
    );

    return CultivoLoteModel;
}
