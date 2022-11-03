const factoryOptions = {
    wsSource: 'wss://docker.rs-online.ru/nodered/ws/factory/rsv/',
    code: 'RSV',
    name: 'Русский Стандарт',
    lines: [
        {
            code: 'B12000',
            name: 'Линия 12000',
            units: [
                {
                    code: 'PREPARE',
                    name: 'Подготовка',
                    sensors: [
                        {
                            code: 'Dep',
                            place: 'after',
                            name: 'Депалетизировано',
                        },
                    ],
                },
                {
                    code: 'BOTTLING',
                    name: 'Розлив',
                    sensors: [
                        { code: 'Nap', place: 'after', name: 'Наполнено' },
                    ],
                },
                {
                    code: 'GLUE',
                    name: 'Оклейка',
                    sensors: [
                        { code: 'Et', place: 'after', name: 'Этикировано' },
                    ],
                },
                {
                    code: 'PACK',
                    name: 'Упаковка',
                    sensors: [
                        {
                            code: 'Got',
                            place: 'before',
                            name: 'Готовая продукция',
                        },
                    ],
                },
            ],
        },
        {
            code: 'B6000',
            name: 'Линия 6000',
            units: [
                {
                    code: 'PREPARE',
                    name: 'Подготовка',
                    sensors: [
                        {
                            code: 'Dep',
                            place: 'after',
                            name: 'Депалетизировано',
                        },
                    ],
                },
                {
                    code: 'BOTTLING',
                    name: 'Розлив',
                    sensors: [
                        { code: 'Nap', place: 'after', name: 'Наполнено' },
                    ],
                },
                {
                    code: 'GLUE',
                    name: 'Оклейка',
                    sensors: [
                        { code: 'Et', place: 'after', name: 'Этикировано' },
                    ],
                },
                {
                    code: 'PACK',
                    name: 'Упаковка',
                    sensors: [
                        {
                            code: 'Got',
                            place: 'before',
                            name: 'Готовая продукция',
                        },
                    ],
                },
            ],
        },
        {
            code: 'B4500',
            name: 'Линия 4500',
            units: [
                {
                    code: 'PREPARE',
                    name: 'Подготовка',
                    sensors: [
                        {
                            code: 'Dep',
                            place: 'after',
                            name: 'Депалетизировано',
                        },
                    ],
                },
                {
                    code: 'BOTTLING',
                    name: 'Розлив',
                    sensors: [
                        { code: 'Nap', place: 'after', name: 'Наполнено' },
                    ],
                },
                {
                    code: 'GLUE',
                    name: 'Оклейка',
                    sensors: [
                        { code: 'Et', place: 'after', name: 'Этикировано' },
                    ],
                },
                {
                    code: 'PACK',
                    name: 'Упаковка',
                    sensors: [
                        {
                            code: 'Got',
                            place: 'before',
                            name: 'Готовая продукция',
                        },
                    ],
                },
            ],
        },
        {
            code: 'B3000',
            name: 'Линия 3000',
            units: [
                {
                    code: 'PREPARE',
                    name: 'Подготовка',
                    sensors: [
                        {
                            code: 'Dep',
                            place: 'after',
                            name: 'Депалетизировано',
                        },
                    ],
                },
                {
                    code: 'BOTTLING',
                    name: 'Розлив',
                    sensors: [
                        { code: 'Nap', place: 'after', name: 'Наполнено' },
                    ],
                },
                {
                    code: 'GLUE',
                    name: 'Оклейка',
                    sensors: [
                        { code: 'Et', place: 'after', name: 'Этикировано' },
                    ],
                },
                {
                    code: 'PACK',
                    name: 'Упаковка',
                    sensors: [
                        {
                            code: 'Got',
                            place: 'before',
                            name: 'Готовая продукция',
                        },
                    ],
                },
            ],
        } /*
        {
            code: 'SOUVENIR',
            name: 'Сувенирка',
            units: [
                {
                    code: 'PACK',
                    name: 'Упакова',
                    sensors: [
                        {
                            code: 'Got',
                            place: 'before',
                            name: 'Готовая продукция',
                        },
                    ],
                },
            ],
        },
        {
            code: 'TERMO',
            name: 'Термотоннель',
            units: [
                {
                    code: 'TERMO',
                    name: 'Термотоннель',
                    sensors: [{ code: 'Out', place: 'after', name: 'Выход' }],
                },
            ],
        },*/,
    ],
}
