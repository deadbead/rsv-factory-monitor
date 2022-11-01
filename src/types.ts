interface INode {
    code: string
    name: string
}

interface ISensor extends INode {
    place: string
}

interface IUnit extends INode {
    sensors: ISensor[]
}

interface ILine extends INode {
    units: IUnit[]
}

interface IFactory extends INode {
    lines: ILine[]
}

export type {IFactory, ILine, IUnit, ISensor}